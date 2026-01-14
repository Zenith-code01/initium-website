/* =========================
   Production X (Initium)
   - Data source: GitHub raw products.json (/data/products.json)
   - JSON shape: { "products": [ ... ] }
   - Filter: MortgageType + ProjectStatus
   - Sort: LastUpdate / TargetReturn / FacilityAmount / LVR / Term
   - Render into #prodGrid
   ========================= */

(() => {
  const DATA_URL =
    "https://raw.githubusercontent.com/Zenith-code01/initium-website/main/data/products.json";

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

  // ---------- helpers ----------
  const normalizeText = (v) => (v == null ? "" : String(v)).trim();

  const pickText = (v) => {
    if (v == null) return "";
    if (typeof v === "object" && v.Value != null) return String(v.Value).trim();
    return String(v).trim();
  };

  function safeNumber(v) {
    // support "$1,200,000" style strings
    if (typeof v === "string") {
      const cleaned = v.replace(/[^0-9.-]/g, "");
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : null;
    }
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

  // ---------- normalize ----------
  function normalizeItem(it) {
    return {
      title: normalizeText(it.title ?? it.Title),
      address: normalizeText(it.address ?? it.Address),

      mortgageType: pickText(it.mortgageType ?? it.MortgageType),
      projectStatus: pickText(it.projectStatus ?? it.ProjectStatus),

      productionIntroduction: normalizeText(
        it.productionIntroduction ?? it.ProductionIntroduction
      ),
      imageUrl: normalizeText(it.imageUrl ?? it.ImageUrl),

      // ✅ your JSON field is LastUpdate
      lastUpdate: normalizeText(
        it.lastUpdate ?? it.LastUpdate ?? it.lastUpdated ?? it.LastUpdated
      ),

      targetReturn: safeNumber(it.targetReturn ?? it.TargetReturn),
      facilityAmount: safeNumber(it.facilityAmount ?? it.FacilityAmount),
      lvr: safeNumber(it.lvr ?? it.LVR),
      term: safeNumber(it.term ?? it.Term),
    };
  }

  // ---------- sort ----------
  function sortItems(items, sortBy, sortDir) {
    const dir = sortDir === "asc" ? 1 : -1;

    const key = (it) => {
      switch (sortBy) {
        case "TargetReturn":
          return it.targetReturn;
        case "FacilityAmount":
          return it.facilityAmount;
        case "LVR":
          return it.lvr;
        case "Term":
          return it.term;
        case "LastUpdate":
        default: {
          const d = new Date(it.lastUpdate);
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

  // ---------- render ----------
  function render(items) {
    if (els.count) els.count.textContent = `${items.length} items`;

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
        const title = it.title || it.address || "Untitled Project";
        const mortgageType = normalizeText(it.mortgageType) || "—";
        const status = normalizeText(it.projectStatus) || "—";
        const intro = normalizeText(it.productionIntroduction) || "";
        const img = normalizeText(it.imageUrl);
        const lastUpdate = fmtDate(it.lastUpdate);

        const term = it.term;
        const targetReturn = it.targetReturn;
        const lvr = it.lvr;
        const facility = it.facilityAmount;

        const safeTitle = title.replace(/"/g, "&quot;");

        const imgTag = img
          ? `<img src="${img}" alt="${safeTitle}" loading="lazy" />`
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
              <h3 class="prodx-address">${title}</h3>
              ${intro ? `<p class="prodx-intro">${intro}</p>` : ""}

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
                <span>Last updated: ${lastUpdate}</span>
                ${
                  img
                    ? `<a class="prodx-link prodx-image-btn" href="javascript:void(0)" data-image="${img}">Image</a>`
                    : `<span></span>`
                }
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // ---------- load ----------
  async function load() {
    if (els.state) els.state.textContent = "Loading…";

    try {
      const res = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`DATA HTTP ${res.status}`);
      const data = await res.json();

      // ✅ your file shape: { products: [...] }
      const rawItems = Array.isArray(data?.products) ? data.products : [];
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
      const sortBy = els.sortBy?.value || "LastUpdate";
      const sortDir = els.sortDir?.value || "desc";
      const sorted = sortItems(filtered, sortBy, sortDir);

      render(sorted);

      // Status (use first item's LastUpdate)
      if (els.state) {
        const top = items[0]?.lastUpdate || "";
        els.state.textContent = top ? `Last updated: ${fmtDate(top)}` : "";
      }
    } catch (e) {
      console.error(e);
      if (els.state) els.state.textContent = "Failed to load products.json (check URL / path).";
      els.grid.innerHTML = "";
      if (els.count) els.count.textContent = "0 items";
    }
  }

  // ---------- events ----------
  ["change"].forEach((evt) => {
    els.mortgageType?.addEventListener(evt, load);
    els.status?.addEventListener(evt, load);
    els.sortBy?.addEventListener(evt, load);
    els.sortDir?.addEventListener(evt, load);
  });
  els.refresh?.addEventListener("click", load);

  // =========================
  // Image Modal (Event Delegation)
  // =========================
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalImg");

  function openImgModal(src, altText) {
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modalImg.alt = altText || "Preview";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  }

  function closeImgModal() {
    if (!modal || !modalImg) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    modalImg.alt = "";
    document.documentElement.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    // open
    const btn = e.target.closest(".prodx-image-btn");
    if (btn) {
      e.preventDefault();
      const src = btn.getAttribute("data-image");
      const card = btn.closest(".prodx-card");
      const title =
        card?.querySelector(".prodx-address")?.textContent?.trim() || "Preview";
      if (src) openImgModal(src, title);
      return;
    }

    // close (click backdrop or close button)
    if (e.target.matches('[data-close="1"]')) {
      closeImgModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) {
      closeImgModal();
    }
  });

  // ---------- init ----------
  load();
})();
