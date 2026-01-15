/* =========================
   Investor Quick Request -> Power Automate (HTTP) -> SharePoint
   - Missing fields => send "" (empty string) or false
   - Toast feedback: success / failure with reason
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  // ✅ 1) 替换成你的 Flow HTTP POST URL
  const FLOW_URL = "https://default4b2aba66c11d4105b753877533b254.fd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/d6f0f01c6dcb41df961b5211aed3c1cb/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=4zhJDxPnL73mudgZMETDxMkN4_QRErET6GxU0juZhog";

  const els = {
    fullName: document.getElementById("invfullname"),
    email: document.getElementById("invemail"),
    phone: document.getElementById("invphone"),
    submit: document.getElementById("invsubmit"),
    toast: document.getElementById("invToast"),
  };

  if (!els.submit) return;

  const safeStr = (v) => (v == null ? "" : String(v).trim());
  const getLang = () => {
    // 你有 i18n 的话可以换成你的语言变量
    // 这里做一个通用兜底：html lang 或 localStorage
    return (
      document.documentElement.getAttribute("lang") ||
      localStorage.getItem("lang") ||
      "en"
    );
  };

  const getUTM = () => {
    // 把当前 URL 的 querystring 全部保存（你也可以只挑 utm_ 开头）
    return window.location.search ? window.location.search.slice(1) : "";
  };

  const showToast = (type, msg, detail) => {
    if (!els.toast) return;

    els.toast.classList.remove("is-ok", "is-bad");
    els.toast.classList.add(type === "ok" ? "is-ok" : "is-bad");
    els.toast.style.display = "block";

    const detailHtml = detail
      ? `<br/><code>${escapeHtml(detail)}</code>`
      : "";

    els.toast.innerHTML = `${escapeHtml(msg)}${detailHtml}`;
  };

  const clearToast = () => {
    if (!els.toast) return;
    els.toast.style.display = "none";
    els.toast.textContent = "";
    els.toast.classList.remove("is-ok", "is-bad");
  };

  const setLoading = (loading) => {
    els.submit.disabled = loading;
    els.submit.style.opacity = loading ? "0.75" : "1";
    els.submit.textContent = loading ? "Submitting..." : "Submit";
  };

  const escapeHtml = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  // ✅ 你可以按需加强校验：比如 email 必填
  const validate = () => {
    const fullName = safeStr(els.fullName?.value);
    const email = safeStr(els.email?.value);

    if (!fullName) return "Please enter your full name.";
    if (!email) return "Please enter your email.";

    // 简单 email 格式检查
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!okEmail) return "Please enter a valid email address.";

    return "";
  };

  els.submit.addEventListener("click", async () => {
    clearToast();

    const err = validate();
    if (err) {
      showToast("bad", err);
      return;
    }

    const payload = {
      fullName: safeStr(els.fullName?.value),
      email: safeStr(els.email?.value),
      phone: safeStr(els.phone?.value),

      // 你这个 quick request 没有的字段，照样发空值（SharePoint 里就存空）
      company: "",
      role: "",
      ticketSize: "",
      message: "",

      consent: true, // quick request 默认视为 consent，你也可以改成 false 或绑定 checkbox
      language: getLang(),
      pageUrl: window.location.href,
      utm: getUTM(),
      source: "investor_quick_request",
    };

    setLoading(true);

    try {
      const res = await fetch(FLOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Power Automate 的 Response 我们用 JSON
      let data = null;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await res.json().catch(() => null);
      } else {
        const text = await res.text().catch(() => "");
        data = text ? { ok: res.ok, message: text } : null;
      }

      if (res.ok && data?.ok !== false) {
        showToast("ok", data?.message || "Submitted successfully.");
        // 清空输入
        if (els.fullName) els.fullName.value = "";
        if (els.email) els.email.value = "";
        if (els.phone) els.phone.value = "";
      } else {
        // 尽量把原因展示出来
        const msg = data?.message || `Submission failed (HTTP ${res.status}).`;
        const detail = data?.detail || "";
        showToast("bad", msg, detail);
      }
    } catch (e) {
      showToast("bad", "Network error. Please try again.", e?.message || "");
    } finally {
      setLoading(false);
    }
  });
});
