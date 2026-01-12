(() => {
  const root = document.getElementById("saCarousel");
  const dotsBox = document.getElementById("saDots");
  if (!root || !dotsBox) return;

  const leftBtn = root.querySelector(".sa-slide--left");
  const centerBox = root.querySelector(".sa-slide--center");
  const rightBtn = root.querySelector(".sa-slide--right");

  const leftImg = leftBtn.querySelector("img");
  const centerImg = centerBox.querySelector("img");
  const rightImg = rightBtn.querySelector("img");

  // ✅ 新增：外侧箭头按钮（就是你 HTML 里 id="saPrev" 和 id="saNext"）
  const prevArrow = document.getElementById("saPrev");
  const nextArrow = document.getElementById("saNext");

  // ✅ 5 张图（自己换路径）
  const images = [
    "./Images/slide-1.jpg",
    "./Images/slide-2.jpg",
    "./Images/slide-3.jpg",
    "./Images/slide-4.jpg",
    "./Images/slide-5.jpg",
  ];

  let current = 2;

  // dots
  dotsBox.innerHTML = "";
  const dots = images.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "sa-dot";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => {
      current = i;
      render();
    });
    dotsBox.appendChild(b);
    return b;
  });

  function render() {
    const prev = (current - 1 + images.length) % images.length;
    const next = (current + 1) % images.length;

    leftImg.src = images[prev];
    centerImg.src = images[current];
    rightImg.src = images[next];

    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  }

  // ✅ 你原来的：点左侧图=上一张
  leftBtn.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    render();
  });

  // ✅ 你原来的：点右侧图=下一张
  rightBtn.addEventListener("click", () => {
    current = (current + 1) % images.length;
    render();
  });

  // ✅ 新增：点左箭头=上一张（和左侧图一样）
  prevArrow?.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    render();
  });

  // ✅ 新增：点右箭头=下一张（和右侧图一样）
  nextArrow?.addEventListener("click", () => {
    current = (current + 1) % images.length;
    render();
  });

  render();
})();
