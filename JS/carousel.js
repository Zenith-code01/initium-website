const track = document.getElementById("carouselTrack");
const dotsBox = document.getElementById("carouselDots");
const progressBar = document.getElementById("carouselProgress");
const textLayer = document.getElementById("heroTextLayer");

if (track && dotsBox && progressBar && textLayer) {
  const duration = 4500; // 4.5 秒
  let timer = null;

  // ✅ 左侧文字 slides
  const textSlides = Array.from(textLayer.querySelectorAll(".text-slide"));

  // ✅ 右侧真实 slides（clone 前）
  const realSlides = Array.from(track.children);
  const realCount = realSlides.length;

  // ✅ clone 首尾：实现无缝
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[realCount - 1].cloneNode(true);
  firstClone.dataset.clone = "first";
  lastClone.dataset.clone = "last";
  track.insertBefore(lastClone, realSlides[0]);
  track.appendChild(firstClone);

  // clone 后的总 slides
  const slides = Array.from(track.children);

  // ✅ index 从 1 开始（0 是 lastClone）
  let index = 1;

  // 用于文字退场
  let prevRealIndex = 0;

  // =========================
  // dots：按真实 slides 生成
  // =========================
  dotsBox.innerHTML = "";
  for (let i = 0; i < realCount; i++) {
    const btn = document.createElement("button");
    btn.className = "carousel-dot";
    btn.type = "button";
    btn.setAttribute("aria-label", `Go to slide ${i + 1}`);

    btn.addEventListener("click", () => {
      index = i + 1;
      goToIndex(index, true); // 正常点击：带动画 + 重置进度条
      restartAutoPlay();
    });

    dotsBox.appendChild(btn);
  }
  const dots = Array.from(dotsBox.children);

  function getRealIndex() {
    let r = index - 1;
    if (r < 0) r = realCount - 1;
    if (r >= realCount) r = 0;
    return r;
  }

  function syncProgressWidth() {
    const w = dotsBox.offsetWidth;
    if (progressBar.parentElement) {
      progressBar.parentElement.style.width = w + "px";
    }
  }

  // ✅ 更稳的进度条重置：切回标签页时也能重新跑起来
  function resetProgressReliable() {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    progressBar.offsetWidth; // reflow
    requestAnimationFrame(() => {
      progressBar.style.transition = `width ${duration}ms linear`;
      progressBar.style.width = "100%";
    });
  }

  // ✅ 更新 dots
  function updateDots() {
    const realIndex = getRealIndex();
    dots.forEach((d, i) => d.classList.toggle("is-active", i === realIndex));
  }

  // ✅ 更新右图 active（触发慢放大）
  function updateImageActive() {
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
  }

  // ✅ 强制重触发右侧图片“慢放大”（只用于切回页面恢复）
  function retriggerImageZoom() {
    slides.forEach((s) => s.classList.remove("is-active"));
    track.offsetWidth; // reflow
    if (slides[index]) slides[index].classList.add("is-active");
  }

  // ✅ 更新左文案：左进右出
  function updateTextActive() {
    const realIndex = getRealIndex();

    textSlides.forEach((t, i) => {
      t.classList.toggle("is-active", i === realIndex);
      if (i !== realIndex) t.classList.remove("is-active");
    });

    const prev = textSlides[prevRealIndex];
    if (prev && prevRealIndex !== realIndex) {
      prev.classList.remove("is-active");
      prev.classList.add("is-exit");
      setTimeout(() => prev.classList.remove("is-exit"), 900);
    }

    prevRealIndex = realIndex;
  }

  // ✅ 统一跳转
  // opts.skipProgress = true：用于 clone 瞬移回跳，避免第一张“快速刷新一次”
  function goToIndex(i, withAnim, opts = {}) {
    const { skipProgress = false } = opts;

    track.style.transition = withAnim ? "transform .55s ease" : "none";
    track.style.transform = `translateX(-${i * 100}%)`;

    updateDots();
    updateImageActive();
    updateTextActive();

    syncProgressWidth();

    // ✅ 关键：无缝瞬移回跳时不要 reset 进度条，否则视觉上像刷新一下
    if (!skipProgress) {
      resetProgressReliable();
    }
  }

  function nextSlide() {
    index += 1;
    goToIndex(index, true);
  }

  // =========================
  // ✅ Autoplay
  // =========================
  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startAutoPlay() {
    if (timer) return;
    timer = setInterval(nextSlide, duration);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // ✅ 防止从 bfcache 恢复后卡在 clone / 越界导致停住
  function normalizeIndex() {
    if (index < 0) index = 1;
    if (index >= slides.length) index = realCount;
    if (slides[index]?.dataset.clone === "first") index = 1;
    if (slides[index]?.dataset.clone === "last") index = realCount;
  }

  // ✅ 切回页面时：统一“恢复”逻辑（解决：卡死 + 进度条不动 + 第一张不放大）
  function recoverCarousel() {
    stopAutoPlay();
    normalizeIndex();

    // 对齐一次（会正常重置进度条）
    goToIndex(index, false);

    // ✅ 只有恢复场景才强制触发缩放（避免无缝回跳时闪）
    retriggerImageZoom();

    startAutoPlay();
  }

  // ✅ 页面不可见/可见时，暂停/恢复
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      recoverCarousel();
    }
  });

  // ✅ 额外保险：窗口失焦/聚焦
  window.addEventListener("blur", stopAutoPlay);
  window.addEventListener("focus", recoverCarousel);

  // ✅ bfcache 专用：从别的网站“返回”时最关键
  window.addEventListener("pagehide", () => {
    stopAutoPlay();
  });

  window.addEventListener("pageshow", () => {
    recoverCarousel();
  });

  // ✅ 无缝：遇到 clone -> 瞬移回真实 slide
  track.addEventListener("transitionend", () => {
    const cur = slides[index];
    if (!cur) return;

    // 从最后一张 -> firstClone 后，瞬移回真实第一张（不重置进度条，不 retrigger，避免闪）
    if (cur.dataset.clone === "first") {
      index = 1;
      goToIndex(index, false, { skipProgress: true });
    }

    // 从第一张 -> lastClone 后，瞬移回真实最后一张（同理）
    if (cur.dataset.clone === "last") {
      index = realCount;
      goToIndex(index, false, { skipProgress: true });
    }
  });

  // 初始化
  goToIndex(index, false);
  startAutoPlay();
  window.addEventListener("resize", syncProgressWidth);
}
