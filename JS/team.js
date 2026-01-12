/* ================= OUR TEAM ================= */

// 👉 确保路径正确
const DATA_URL = "./data/employees.json";

// Utils
const escapeHtml = s =>
  String(s).replace(/[&<>"']/g, c =>
    ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])
  );

const parseOrder = v => {
  if (v == null) return Infinity;
  const n = Number(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : Infinity;
};

// ✅ 统一字段：卡片/Modal 用同一套逻辑，避免重复
const getDept = e => (e.job ?? "").trim();                  // 你现在的 job = IT（部门/岗位）
const getRole = e => (e.role ?? "").trim();                 // 如果未来有 role（title），就用它
const getPrimaryLine = e => getRole(e) || getDept(e) || ""; // 卡片第二行只显示一个

// DOM
const teamGrid = document.getElementById("teamGrid");
const teamSub = document.getElementById("teamSub");

const modal = document.getElementById("teamModal");
const modalPhoto = document.getElementById("modalPhoto");
const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalJob = document.getElementById("modalJob");
const modalBio = document.getElementById("modalBio");
const modalEmail = document.getElementById("modalEmail");
const modalLinkedIn = document.getElementById("modalLinkedIn");

// Bubble-in observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.18 });

let employees = [];

// Render
function render() {
  teamGrid.innerHTML = employees.map((e, i) => {
    const line = getPrimaryLine(e); // ✅ 只显示一个（不会出现两个 IT）
    return `
      <article class="card" data-i="${i}" style="transition-delay:${i * 140}ms">
        <img class="avatar" src="${e.photoUrl}" alt="${escapeHtml(e.name || "")}" />
        <h4 class="name">${escapeHtml(e.name || "")}</h4>
        <div class="role">${escapeHtml(line)}</div>
        <div class="hint">VIEW PROFILE →</div>
      </article>
    `;
  }).join("");

  teamGrid.querySelectorAll(".card").forEach(card => {
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
  modalPhoto.src = e.photoUrl || "";
  modalPhoto.alt = e.name || "";
  modalName.textContent = e.name || "";

  const role = getRole(e);
  const dept = getDept(e);

  // ✅ 不再把 job 填两次
  modalRole.textContent = role;
  modalRole.style.display = role ? "" : "none"; // 没有 role 就隐藏这一行

  modalJob.textContent = dept;
  modalJob.style.display = dept ? "" : "none";

  modalBio.textContent = e.information || "";

  modalEmail.hidden = !e.email;
  modalLinkedIn.hidden = !e.linkedInUrl;

  if (e.email) modalEmail.href = `mailto:${e.email}`;
  if (e.linkedInUrl) modalLinkedIn.href = e.linkedInUrl;

  document.documentElement.style.overflow = "hidden";
}

modal.onclick = ev => {
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
      .map(e => ({ ...e, order: parseOrder(e.order) }))
      .sort((a, b) => a.order - b.order);

    
    render();
  } catch (err) {
    console.error(err);
    teamSub.textContent = "Failed to load team data.";
  }
})();
