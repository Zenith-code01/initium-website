const track = document.getElementById("carouselTrack");
const dotsBox = document.getElementById("carouselDots");
const progressBar = document.getElementById("carouselProgress");
const textLayer = document.getElementById("heroTextLayer");

if (track && dotsBox && progressBar && textLayer) {
  const duration = 4500; // 4.5 秒
  let timer = null;

  // ✅ 左侧文字 slides（真实数量 = 3）
  const textSlides = Array.from(textLayer.querySelectorAll(".text-slide"));

  // ✅ 右侧真实 slides
  const realSlides = Array.from(track.children);
  const realCount = realSlides.length;

  // ✅ clone 首尾：实现无缝
  const firstClone = realSlides[0].cloneNode(true);
  const lastClone = realSlides[realCount - 1].cloneNode(true);
  firstClone.dataset.clone = "first";
  lastClone.dataset.clone = "last";
  track.insertBefore(lastClone, realSlides[0]);
  track.appendChild(firstClone);

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
      goToIndex(index, true);
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
    progressBar.parentElement.style.width = w + "px";
  }

  function resetProgress() {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    progressBar.offsetWidth; // reflow
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = "100%";
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

  // ✅ 更新左文案：左进右出
  function updateTextActive() {
    const realIndex = getRealIndex();

    // 当前 active
    textSlides.forEach((t, i) => {
      t.classList.toggle("is-active", i === realIndex);
      // 清理残留
      if (i !== realIndex) t.classList.remove("is-active");
    });

    // 上一个做 exit（从中到右消失）
    const prev = textSlides[prevRealIndex];
    if (prev && prevRealIndex !== realIndex) {
      prev.classList.remove("is-active");
      prev.classList.add("is-exit");
      // 动画结束后清理 exit
      setTimeout(() => prev.classList.remove("is-exit"), 900);
    }

    prevRealIndex = realIndex;
  }

  // ✅ 统一跳转
  function goToIndex(i, withAnim) {
    track.style.transition = withAnim ? "transform .55s ease" : "none";
    track.style.transform = `translateX(-${i * 100}%)`;

    updateDots();
    updateImageActive();
    updateTextActive();

    syncProgressWidth();
    resetProgress();
  }

  function nextSlide() {
    index += 1;
    goToIndex(index, true);
  }

  function startAutoPlay() {
    timer = setInterval(nextSlide, duration);
  }

  function restartAutoPlay() {
    clearInterval(timer);
    startAutoPlay();
  }

  // ✅ 无缝：遇到 clone -> 瞬移回真实 slide
  track.addEventListener("transitionend", () => {
    if (slides[index] && slides[index].dataset.clone === "first") {
      index = 1;
      goToIndex(index, false);
    }
    if (slides[index] && slides[index].dataset.clone === "last") {
      index = realCount;
      goToIndex(index, false);
    }
  });

  // 初始化
  goToIndex(index, false);
  startAutoPlay();
  window.addEventListener("resize", syncProgressWidth);
}
