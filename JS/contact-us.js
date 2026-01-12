/* =========================
   Contact Us JS (Submit to SharePoint via Power Automate)
   - Works with your current HTML fields:
     name (cuName), email (cuEmail), subject (cuSubject), message (cuMessage), consent (cuConsent)
   - Sends JSON to a Power Automate FLOW with "When an HTTP request is received"
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("cuToast");
  const submitBtn = document.getElementById("cuSubmit");

  if (!form) return;

  // ✅ IMPORTANT: Use the URL from "When an HTTP request is received"
  const FLOW_URL = "https://default4b2aba66c11d4105b753877533b254.fd.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ca6b74fd9b774484ba662a2805535c53/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kPLHo-ZPWMp48vUGbJ-BE_6-4Pu8tXZltXgTWPiYSL0"

  const nameEl = document.getElementById("cuName");
  const emailEl = document.getElementById("cuEmail");
  const phoneEl = document.getElementById("cuPhone");
  const subjectEl = document.getElementById("cuSubject");
  const msgEl = document.getElementById("cuMessage");
  const consentEl = document.getElementById("cuConsent");

  const emailOk = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

  const phoneOk = (phone) => {
    const p = String(phone || "").trim();
    if (!p) return true; // optional
    const digits = p.replace(/\D/g, "");
    return digits.length >= 6 && digits.length <= 18;
  };


  const setFieldError = (el, on) => {
    const wrap = el?.closest?.(".field");
    if (wrap) wrap.classList.toggle("field--error", !!on);
  };

  const setConsentError = (on) => {
    if (!consentEl) return;
    consentEl.style.outline = on ? "2px solid rgba(255,80,80,0.85)" : "none";
    consentEl.style.outlineOffset = "2px";
  };

  const validate = () => {
    let ok = true;

    const name = String(nameEl?.value || "").trim();
    const email = String(emailEl?.value || "").trim();
    const phone = String(phoneEl?.value || "").trim();
    const subject = String(subjectEl?.value || "").trim();
    const msg = String(msgEl?.value || "").trim();
    const consent = !!consentEl?.checked;

    // Required: email + message + consent
    setFieldError(emailEl, !emailOk(email));
    if (!emailOk(email)) ok = false;

    setFieldError(msgEl, msg.length < 10);
    if (msg.length < 10) ok = false;

    setConsentError(!consent);
    if (!consent) ok = false;

    // ✅ Phone (optional, but if filled must be valid)
    setFieldError(phoneEl, !phoneOk(phone));
    if (!phoneOk(phone)) ok = false;

    // Soft checks (not required)
    setFieldError(nameEl, name.length > 0 && name.length < 2);
    setFieldError(subjectEl, subject.length > 0 && subject.length < 3);

    return ok;
  };

  const showToast = (text) => {
    if (!toast) return;
    const span = toast.querySelector("span");
    if (span && text) span.textContent = text;

    toast.hidden = false;
    toast.style.opacity = "1";

    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      toast.style.opacity = "0.0";
      setTimeout(() => (toast.hidden = true), 250);
    }, 2600);
  };

  const disableSubmit = (on) => {
    if (!submitBtn) return;
    submitBtn.disabled = !!on;
    submitBtn.style.opacity = on ? "0.7" : "";
    submitBtn.style.cursor = on ? "not-allowed" : "";
  };

  const buildUtm = () => {
    const qs = new URLSearchParams(location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];
    const parts = keys
      .map((k) => (qs.get(k) ? `${k}=${encodeURIComponent(qs.get(k))}` : ""))
      .filter(Boolean);
    return parts.join("&");
  };

  // Debug helper: read error body if server returns JSON/text
  const readErrorBody = async (res) => {
    try {
      const txt = await res.text();
      return txt ? txt.slice(0, 500) : "";
    } catch {
      return "";
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ok = validate();
    if (!ok) {
      const firstErr = form.querySelector(
        ".field--error input, .field--error textarea"
      );
      if (firstErr) firstErr.focus();
      if (consentEl && !consentEl.checked) consentEl.focus();
      return;
    }

    const fullName = String(nameEl?.value || "").trim();
    const email = String(emailEl?.value || "").trim();
    const phone = String(phoneEl?.value || "").trim();
    const subject = String(subjectEl?.value || "").trim();
    const message = String(msgEl?.value || "").trim();
    const consent = !!consentEl?.checked;

    const payload = {
      // Match your Flow schema (recommended)
      fullName,
      email,
      phone,
      company: "",
      role: subject || "", // use subject as role/type if you don't have separate fields
      ticketSize: "",
      message,
      consent,
      language: localStorage.getItem("lang") || "en",
      pageUrl: location.href,
      utm: buildUtm(),
    };

    disableSubmit(true);
    showToast("Submitting...");

    try {
      const res = await fetch(FLOW_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await readErrorBody(res);
        console.error("Submit failed:", res.status, body);
        throw new Error(`HTTP ${res.status}`);
      }

      showToast("Submitted — thank you. We’ll respond within 1–2 business days.");
      form.reset();
      setConsentError(false);
    } catch (err) {
      console.error(err);
      showToast("Submission failed. Please try again or email us directly.");
    } finally {
      disableSubmit(false);
    }
  });

  // Clear errors on input
  [nameEl, emailEl, phoneEl, subjectEl, msgEl].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", () => setFieldError(el, false));
  });
  if (consentEl) {
    consentEl.addEventListener("change", () => setConsentError(false));
  }
});



