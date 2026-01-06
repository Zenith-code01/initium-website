// ===============================
// Company Snapshot interactions
// - Accordion open/close
// - Copy APIR codes
// ===============================

(function () {
  function getLang() {
    return localStorage.getItem("lang") || "en";
  }

  function getText(key, fallback) {
    try {
      const lang = getLang();
      const dict = window.translations?.[lang];
      const en = window.translations?.en;
      return (dict && dict[key]) || (en && en[key]) || fallback;
    } catch {
      return fallback;
    }
  }

  function toggleAccordion(accBtn) {
    const name = accBtn.getAttribute("data-acc");
    if (!name) return;

    const panel = document.getElementById(`csAcc-${name}`);
    if (!panel) return;

    const expanded = accBtn.getAttribute("aria-expanded") === "true";
    accBtn.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;

    const icon = accBtn.querySelector(".cs-acc-icon");
    if (icon) icon.textContent = expanded ? "+" : "−";
  }

  async function doCopy(copyBtn) {
    const selector = copyBtn.getAttribute("data-copy");
    const target = selector ? document.querySelector(selector) : null;
    const text = (target?.textContent || "").trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    const copiedText = getText("cs_copied_btn", "Copied");
    const copyText = getText("cs_copy_btn", "Copy");

    copyBtn.classList.add("is-copied");
    copyBtn.textContent = copiedText;

    window.setTimeout(() => {
      copyBtn.classList.remove("is-copied");
      copyBtn.textContent = copyText;
    }, 1100);
  }

  // ✅ 用 capture 模式：避免被其它脚本 stopPropagation 影响
  document.addEventListener(
    "click",
    (e) => {
      const accBtn = e.target.closest(".cs-acc");
      if (accBtn) {
        e.preventDefault();
        toggleAccordion(accBtn);
        return;
      }

      const copyBtn = e.target.closest(".cs-copy");
      if (copyBtn) {
        e.preventDefault();
        doCopy(copyBtn);
        return;
      }
    },
    true
  );
})();








