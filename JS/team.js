/* ================= OUR TEAM ================= */

// ✅ 确保路径正确（你的 employees.json 在 /data）
const DATA_URL = "https://raw.githubusercontent.com/Zenith-code01/initium-website/main/data/employees.json";

// Utils
const escapeHtml = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const parseOrder = (v) => {
  if (v == null) return Infinity;
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : Infinity;
};

// ✅ 统一字段（匹配你新的 JSON）
const getTitle = (e) => (e.title ?? "").trim();     // ✅ title
const getName = (e) => (e.name ?? "").trim();
const getPhoto = (e) => (e.photo ?? "").trim();     // ✅ photo (本地路径)
const getBio = (e) => (e.bio ?? "").trim();         // ✅ bio
const getEmail = (e) => (e.email ?? "").trim();
const getLinkedIn = (e) => (e.linkedin ?? "").trim(); // ✅ linkedin

// DOM
const teamGrid = document.getElementById("teamGrid");
const teamSub = document.getElementById("teamSub");

const modal = document.getElementById("teamModal");
const modalPhoto = document.getElementById("modalPhoto");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole"); // 你页面里这个位置我们用来显示 title
const modalJob = document.getElementById("modalJob");   // 如果你不需要第二行，就隐藏
const modalBio = document.getElementById("modalBio");
const modalEmail = document.getElementById("modalEmail");
const modalLinkedIn = document.getElementById("modalLinkedIn");

// Bubble-in observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.18 }
);

let employees = [];

// Render
function render() {
  teamGrid.innerHTML = employees
    .map((e, i) => {
      const name = getName(e);
      const title = getTitle(e);
      const photo = getPhoto(e);

      return `
        <article class="card" data-i="${i}" style="transition-delay:${i * 140}ms">
          <img class="avatar" src="${escapeHtml(photo)}" alt="${escapeHtml(name)}" />
          <h4 class="name">${escapeHtml(name)}</h4>
          <div class="role">${escapeHtml(title)}</div>
          <div class="hint">VIEW PROFILE →</div>
        </article>
      `;
    })
    .join("");

  // attach interactions
  teamGrid.querySelectorAll(".card").forEach((card) => {
    observer.observe(card);
    card.onclick = () => {
      const emp = employees[Number(card.dataset.i)];
      openModal(emp);
    };
  });
}

// Modal
function openModal(e) {
  modal.classList.add("is-open");

  const name = getName(e);
  const title = getTitle(e);
  const photo = getPhoto(e);
  const bio = getBio(e);
  const email = getEmail(e);
  const linkedin = getLinkedIn(e);

  modalPhoto.src = photo || "";
  modalPhoto.alt = name || "";
  modalName.textContent = name || "";

  // ✅ 用 modalRole 显示 title
  modalRole.textContent = title || "";
  modalRole.style.display = title ? "" : "none";

  // ✅ 你现在没有 job/department，这一行直接隐藏（避免空白/重复）
  if (modalJob) {
    modalJob.textContent = "";
    modalJob.style.display = "none";
  }

  modalBio.textContent = bio || "";

  // Links
  if (modalEmail) {
    modalEmail.hidden = !email;
    if (email) modalEmail.href = `mailto:${email}`;
  }

  if (modalLinkedIn) {
    modalLinkedIn.hidden = !linkedin;
    if (linkedin) modalLinkedIn.href = linkedin;
  }

  document.documentElement.style.overflow = "hidden";
}

// Close modal (click backdrop / close btn with data-close)
modal.onclick = (ev) => {
  if (ev.target.dataset.close) {
    modal.classList.remove("is-open");
    document.documentElement.style.overflow = "";
  }
};

// Fetch
(async () => {
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    const data = await res.json();

    employees = (data.employees || [])
      .map((e) => ({ ...e, order: parseOrder(e.order) }))
      .sort((a, b) => a.order - b.order);

    render();
  } catch (err) {
    console.error(err);
    if (teamSub) teamSub.textContent = "Failed to load team data.";
  }
})();
