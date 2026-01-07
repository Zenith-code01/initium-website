/* =========================
   Production X (Initium)
   - Fetch from Power Automate (HTTP)
   - Filter: MortgageType + ProjectStatus
   - Sort: LastUpdated / TargetReturn / FacilityAmount / LVR / Term
   ========================= */

(() => {
  // TODO: 替换成你的 Power Automate HTTP Trigger URL
  // const FLOW_URL = "https://default4b2aba66c11d4105b753877533b254.fd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/2f43d44a19a74959802f82bc3174edcc/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WxOZ3zQxzpp3CmYkZLCNnk8ram83PXUODuk_lZ0-Tp8";
  const DATA_URL = "./data/projects.json";
  const META_URL = "./data/projects-meta.json";



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

  if (!els.grid) return;

  const fmtMoney = (n) => {
    const v = Number(n);
    if (!Number.isFinite(v)) return "—";
    return v.toLocaleString(undefined, { style: "currency", currency: "AUD", maximumFractionDigits: 0 });
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
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  };

  const normalizeText = (v) => (v == null ? "" : String(v)).trim();

  function buildQuery() {
    const p = new URLSearchParams();
    if (els.mortgageType.value) p.set("mortgageType", els.mortgageType.value);
    if (els.status.value) p.set("status", els.status.value);
    p.set("sortBy", els.sortBy.value || "LastUpdated");
    p.set("sortDir", els.sortDir.value || "desc");
    p.set("top", "200");
    return p.toString();
  }

  function safeNumber(v) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  function sortItems(items, sortBy, sortDir) {
    const dir = sortDir === "asc" ? 1 : -1;

    const key = (it) => {
      switch (sortBy) {
        case "TargetReturn": return safeNumber(it.TargetReturn);
        case "FacilityAmount": return safeNumber(it.FacilityAmount);
        case "LVR": return safeNumber(it.LVR);
        case "Term": return safeNumber(it.Term);
        case "LastUpdated":
        default: {
          const d = new Date(it.LastUpdated);
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

    els.grid.innerHTML = items.map((it) => {
      const address = normalizeText(it.Address) || "Untitled Project";
      const pickText = (v) => (v && typeof v === "object" && v.Value != null) ? String(v.Value).trim() : normalizeText(v);
      const mortgageType = pickText(it.MortgageType) || "—";
      const status = pickText(it.ProjectStatus) || "—";
      const intro = normalizeText(it.ProductionIntroduction) || "";
      const img = normalizeText(it.ImageUrl);
      const lastUpdated = fmtDate(it.LastUpdated);

      const term = safeNumber(it.Term);
      const targetReturn = safeNumber(it.TargetReturn);
      const lvr = safeNumber(it.LVR);
      const facility = safeNumber(it.FacilityAmount);

      const imgTag = img
        ? `<img src="${img}" alt="${address.replace(/"/g, "&quot;")}" loading="lazy" />`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(234,243,247,0.85);font-weight:800;">
             Initium
           </div>`;

      return `
        <article class="prodx-card">
          <div class="prodx-media">
            ${imgTag}
            <div class="prodx-badges">
              <span class="prodx-badge" style="color: white">${mortgageType}</span>
              <span class="prodx-badge" style="color: white">${status}</span>
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
              ${img ? `<a class="prodx-link" href="${img}" target="_blank" rel="noreferrer noopener">Image</a>` : `<span></span>`}
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // async function load() {
  //   if (!FLOW_URL || FLOW_URL.includes("PASTE_YOUR_FLOW_HTTP_URL_HERE")) {
  //     els.state.textContent = "Please set FLOW_URL in /JS/production-x.js";
  //     return;
  //   }

  //   els.state.textContent = "Loading…";

  //   try {
  //     const qs = buildQuery();
  //     const url = FLOW_URL.includes("?") ? `${FLOW_URL}&${qs}` : `${FLOW_URL}?${qs}`;

  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({})
  //     });

  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);

  //     const data = await res.json();
  //     const items = Array.isArray(data.items) ? data.items : [];

  //     // === ✅ 兼容 SharePoint Choice: string 或 {Value: "..."} ===
  //     const pickText = (v) => {
  //       if (v == null) return "";
  //       if (typeof v === "object" && v.Value != null) return String(v.Value).trim();
  //       return String(v).trim();
  //     };

  //     // === ✅ 前端筛选（不依赖 Flow 是否过滤） ===
  //     const mt = (els.mortgageType?.value || "").trim(); // "" = All
  //     const st = (els.status?.value || "").trim();       // "" = All

  //     const filtered = items.filter((it) => {
  //       const itMt = pickText(it.MortgageType);
  //       const itSt = pickText(it.ProjectStatus);

  //       const okMt = !mt || itMt === mt;
  //       const okSt = !st || itSt === st;
  //       return okMt && okSt;
  //     });

  //     // === ✅ 前端排序（你原逻辑） ===
  //     const sorted = sortItems(filtered, els.sortBy.value, els.sortDir.value);

  //     render(sorted);

  //     els.state.textContent = "";
  //   } catch (e) {
  //     console.error(e);
  //     els.state.textContent = "Failed to load data. Check Flow URL / CORS / permissions.";
  //     els.grid.innerHTML = "";
  //     els.count.textContent = "0 items";
  //   }
  // }



  async function load() {
    els.state.textContent = "Loading…";

    try {
      // 1) 先读 meta，拿 updatedAt 做版本号，避免浏览器缓存
      const metaRes = await fetch(`${META_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!metaRes.ok) throw new Error(`META HTTP ${metaRes.status}`);
      const meta = await metaRes.json();
      const ver = encodeURIComponent(meta.updatedAt || Date.now());

      // 2) 再读 projects.json（带版本号）
      const res = await fetch(`${DATA_URL}?v=${ver}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`DATA HTTP ${res.status}`);

      const data = await res.json();

      // 3) 兼容两种结构：数组 or {items:[...]} or {projects:[...]}
      const items = Array.isArray(data)
        ? data
        : (Array.isArray(data.items) ? data.items : (Array.isArray(data.projects) ? data.projects : []));

      // === ✅ 兼容 SharePoint Choice: string 或 {Value: "..."} ===
      const pickText = (v) => {
        if (v == null) return "";
        if (typeof v === "object" && v.Value != null) return String(v.Value).trim();
        return String(v).trim();
      };

      // === ✅ 前端筛选（你原逻辑） ===
      const mt = (els.mortgageType?.value || "").trim(); // "" = All
      const st = (els.status?.value || "").trim();       // "" = All

      const filtered = items.filter((it) => {
        const itMt = pickText(it.MortgageType || it.mortgageType);
        const itSt = pickText(it.ProjectStatus || it.projectStatus);

        const okMt = !mt || itMt === mt;
        const okSt = !st || itSt === st;
        return okMt && okSt;
      });

      // === ✅ 排序：这里关键是字段名可能不同，做一下“字段映射” ===
      // 如果你的 projects.json 字段是 Address/LVR/Term/... 这套，你原 sortItems 能用；
      // 如果是 address/lvr/term/... 小写，就需要映射一下：
      const mapped = filtered.map((it) => ({
        // 保留原对象
        ...it,

        // 映射一份给你现有 render/sort 读取（尽量不改你渲染模板）
        Address: it.Address ?? it.address ?? it.projectAddress,
        MortgageType: it.MortgageType ?? it.mortgageType,
        ProjectStatus: it.ProjectStatus ?? it.projectStatus,
        ProductionIntroduction: it.ProductionIntroduction ?? it.projectIntro ?? it.description,
        ImageUrl: it.ImageUrl ?? it.imageUrl ?? it.image,

        LastUpdated: it.LastUpdated ?? it.lastUpdated ?? meta.updatedAt,
        TargetReturn: it.TargetReturn ?? it.targetReturn ?? it.returnRate,
        FacilityAmount: it.FacilityAmount ?? it.facilityAmount ?? it.facility,
        LVR: it.LVR ?? it.lvr,
        Term: it.Term ?? it.term,
      }));

      const sorted = sortItems(mapped, els.sortBy.value, els.sortDir.value);

      render(sorted);

      // 4) 显示状态
      els.state.textContent = meta.updatedAt ? `Last updated: ${fmtDate(meta.updatedAt)}` : "";
    } catch (e) {
      console.error(e);
      els.state.textContent = "Failed to load local JSON. Check Live Server path.";
      els.grid.innerHTML = "";
      els.count.textContent = "0 items";
    }
  }






  // events
  ["change"].forEach((evt) => {
    els.mortgageType.addEventListener(evt, load);
    els.status.addEventListener(evt, load);
    els.sortBy.addEventListener(evt, load);
    els.sortDir.addEventListener(evt, load);
  });
  els.refresh.addEventListener("click", load);

  // init
  load();
})();
