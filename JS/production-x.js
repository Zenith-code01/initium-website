/* =========================
   Production X (Initium)
   - Data source: GitHub raw projects.json
   - Filter: Mortgage Type + Project Status
   - Sort: LastUpdated / TargetReturn / FacilityAmount / LVR / Term
   - Render into #prodGrid
   ========================= */

(() => {
  // ✅ 1) 改成你自己的 raw 链接（你现在这一行看起来是对的）
  const DATA_URL =
    "https://raw.githubusercontent.com/Zenith-code01/initium-website/main/data/projects.json";

  // 2) DOM
  const els = {
    mortgageType: document.getElementById("prodMortgageType"),
    status: document.getElementById("prodProjectStatus"),
    sortBy: document.getElementById("prodSortBy"),
    sortDir: document.getElementById("prodSortDir"),
    refresh: document.getElementById("prodRefresh"),
    grid: document.getElementById("prodGrid"),
    count: document.getElementById("prodCount"),
    state: document.getElementById("prodState"),
  };

  // 如果页面没有这个模块，直接退出（避免其他页面报错）
  if (!els.grid) return;

  // 3) helpers
  const normalizeText = (v) => (v == null ? "" : String(v)).trim();

  const pickText = (v) => {
    if (v == null) return "";
    if (typeof v === "object" && v.Value != null) return String(v.Value).trim();
    return String(v).trim();
  };

  function safeNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  const fmtMoney = (n) => {
    const v = Number(n);
    if (!Number.isFinite(v)) return "—";
    return v.toLocaleString(undefined, {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    });
  };

  const fmtPct = (n) => {
    const v = Number(n);
    if (!Number.isFinite(v)) return "—";
    return `${v}%`;
  };

  const fmtDate = (s) => {
    if (!s) return "—";
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // ✅ 统一字段（兼容大写/小写）
  function normalizeItem(it) {
    return {
      address: normalizeText(it.address ?? it.Address),
      mortgageType: pickText(it.mortgageType ?? it.MortgageType),
      projectStatus: pickText(it.projectStatus ?? it.ProjectStatus),
      productionIntroduction: normalizeText(it.productionIntroduction ?? it.ProductionIntroduction),
      imageUrl: normalizeText(it.imageUrl ?? it.ImageUrl),

      lastUpdated: normalizeText(it.lastUpdated ?? it.LastUpdated),
      targetReturn: it.targetReturn ?? it.TargetReturn,
      facilityAmount: it.facilityAmount ?? it.FacilityAmount,
      lvr: it.lvr ?? it.LVR,
      term: it.term ?? it.Term,

      title: it.title ?? it.Title ?? null,
    };
  }

  function sortItemsLowercase(items, sortBy, sortDir) {
    const dir = sortDir === "asc" ? 1 : -1;

    const key = (it) => {
      switch (sortBy) {
        case "TargetReturn":
          return safeNumber(it.targetReturn);
        case "FacilityAmount":
          return safeNumber(it.facilityAmount);
        case "LVR":
          return safeNumber(it.lvr);
        case "Term":
          return safeNumber(it.term);
        case "LastUpdated":
        default: {
          const d = new Date(it.lastUpdated);
          return Number.isNaN(d.getTime()) ? null : d.getTime();
        }
      }
    };

    return [...items].sort((a, b) => {
      const ka = key(a);
      const kb = key(b);
      if (ka == null && kb == null) return 0;
      if (ka == null) return 1;
      if (kb == null) return -1;
      return (ka - kb) * dir;
    });
  }

  function render(items) {
    els.count.textContent = `${items.length} items`;

    if (!items.length) {
      els.grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 18px; border-radius: 14px; background: rgba(0,51,69,0.04); border: 1px solid rgba(0,51,69,0.12);">
          No results. Try changing filters.
        </div>
      `;
      return;
    }

    els.grid.innerHTML = items
      .map((it) => {
        const address = normalizeText(it.address) || "Untitled Project";
        const mortgageType = normalizeText(it.mortgageType) || "—";
        const status = normalizeText(it.projectStatus) || "—";
        const intro = normalizeText(it.productionIntroduction) || "";
        const img = normalizeText(it.imageUrl);
        const lastUpdated = fmtDate(it.lastUpdated);

        const term = safeNumber(it.term);
        const targetReturn = safeNumber(it.targetReturn);
        const lvr = safeNumber(it.lvr);
        const facility = safeNumber(it.facilityAmount);

        const imgTag = img
          ? `<img src="${img}" alt="${address.replace(/"/g, "&quot;")}" loading="lazy" />`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(234,243,247,0.85);font-weight:800;">IM Capital</div>`;

        return `
          <article class="prodx-card">
            <div class="prodx-media">
              ${imgTag}
              <div class="prodx-badges">
                <span class="prodx-badge" style="color:white">${mortgageType}</span>
                <span class="prodx-badge" style="color:white">${status}</span>
              </div>
            </div>

            <div class="prodx-body">
              <h3 class="prodx-address">${address}</h3>
              <p class="prodx-intro">${intro}</p>

              <div class="prodx-kpis">
                <div class="prodx-kpi">
                  <p class="t">Target Return</p>
                  <p class="v">${targetReturn == null ? "—" : fmtPct(targetReturn)}</p>
                </div>
                <div class="prodx-kpi">
                  <p class="t">LVR</p>
                  <p class="v">${lvr == null ? "—" : fmtPct(lvr)}</p>
                </div>
                <div class="prodx-kpi">
                  <p class="t">Facility Amount</p>
                  <p class="v">${facility == null ? "—" : fmtMoney(facility)}</p>
                </div>
                <div class="prodx-kpi">
                  <p class="t">Term</p>
                  <p class="v">${term == null ? "—" : `${term} months`}</p>
                </div>
              </div>

              <div class="prodx-foot">
                <span>Last updated: ${lastUpdated}</span>
                ${
                  img
                    ? `<a class="prodx-link" href="${img}" target="_blank" rel="noreferrer noopener">Image</a>`
                    : `<span></span>`
                }
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  async function load() {
    els.state.textContent = "Loading…";

    try {
      const res = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`DATA HTTP ${res.status}`);
      const data = await res.json();

      // ✅ 兼容多种结构
      const rawItems =
        Array.isArray(data?.projects?.body)
          ? data.projects.body
          : Array.isArray(data?.projects)
          ? data.projects
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
          ? data
          : [];

      const items = rawItems.map(normalizeItem);

      // Filter
      const mt = (els.mortgageType?.value || "").trim();
      const st = (els.status?.value || "").trim();

      const filtered = items.filter((it) => {
        const okMt = !mt || it.mortgageType === mt;
        const okSt = !st || it.projectStatus === st;
        return okMt && okSt;
      });

      // Sort
      const sorted = sortItemsLowercase(filtered, els.sortBy.value, els.sortDir.value);

      // Render
      render(sorted);

      // Status
      els.state.textContent = data.updatedAt ? `Last updated: ${fmtDate(data.updatedAt)}` : "";
    } catch (e) {
      console.error(e);
      els.state.textContent = "Failed to load projects.json (check URL / path).";
      els.grid.innerHTML = "";
      els.count.textContent = "0 items";
    }
  }

  // events
  ["change"].forEach((evt) => {
    els.mortgageType?.addEventListener(evt, load);
    els.status?.addEventListener(evt, load);
    els.sortBy?.addEventListener(evt, load);
    els.sortDir?.addEventListener(evt, load);
  });
  els.refresh?.addEventListener("click", load);

  // init
  load();
})();
