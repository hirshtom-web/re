
document.addEventListener("DOMContentLoaded", () => {

  const countrySelector = document.getElementById("countrySelector");
  const countryPopup = document.getElementById("countryPopup");
  const privacyTrigger = document.getElementById("privacyTrigger");
  const privacyPopup = document.getElementById("privacyPopup");

  // =================== COUNTRY SELECTOR POPUP ===================
  if (countrySelector && countryPopup) {
    countrySelector.addEventListener("click", e => {
      e.stopPropagation();
      countryPopup.classList.toggle("open");
    });

    document.querySelectorAll(".country-option").forEach(opt => {
      opt.addEventListener("click", () => {
        countrySelector.querySelector("img").src = opt.querySelector("img").src;
        countrySelector.querySelector(".country-link").textContent = opt.textContent.trim();
        countryPopup.classList.remove("open");
      });
    });
  }

  // =================== PRIVACY POPUP ===================
  if (privacyTrigger && privacyPopup) {
    privacyTrigger.addEventListener("click", e => {
      e.stopPropagation();
      privacyPopup.classList.toggle("open");
    });

    document.getElementById("savePrivacy").addEventListener("click", () => {
      const selected = document.querySelector('input[name="privacy"]:checked');
      console.log("Saved privacy:", selected?.value);
      privacyPopup.classList.remove("open");
    });
  }

  // =================== OUTSIDE CLICK ===================
  document.addEventListener("click", e => {
    if (countryPopup && !countryPopup.contains(e.target) && !countrySelector.contains(e.target)) {
      countryPopup.classList.remove("open");
    }
    if (privacyPopup && !privacyPopup.contains(e.target) && !privacyTrigger.contains(e.target)) {
      privacyPopup.classList.remove("open");
    }
  });

  // =================== ESCAPE CLOSE ===================
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (countryPopup) countryPopup.classList.remove("open");
      if (privacyPopup) privacyPopup.classList.remove("open");
    }
  });

  // ======================= MOBILE ACCORDION =======================
  document.querySelectorAll(".footer-column h4").forEach(header => {
    header.addEventListener("click", () => {
      // Only for mobile
      if (window.innerWidth > 600) return;

      const column = header.parentElement;

      // Close all others
      document.querySelectorAll(".footer-column").forEach(c => {
        if (c !== column) c.classList.remove("active");
      });

      // Toggle this one
      column.classList.toggle("active");
    });
  });

});
