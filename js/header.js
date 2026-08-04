async function loadHeader() {
    const response = await fetch("/components/header.html");
    const html = await response.text();

    document.body.insertAdjacentHTML("afterbegin", html);

    initHeader();
}

function initHeader() {

    const desktopBtn = document.querySelector(".desktop-toggle");
    const mobileBtn = document.querySelector(".mobile-toggle");

    const desktopMenu = document.querySelector(".desktop-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    // Desktop menu
    if (desktopBtn && desktopMenu) {
        desktopBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            desktopMenu.classList.toggle("active");
        });
    }

    // Mobile menu
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("active");
        });
    }

    // Close menus when clicking outside
    document.addEventListener("click", () => {
        desktopMenu?.classList.remove("active");
        mobileMenu?.classList.remove("active");
    });

    // Prevent closing when clicking inside the menu
    desktopMenu?.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    mobileMenu?.addEventListener("click", (e) => {
        e.stopPropagation();
    });

}

loadHeader();
