async function loadHeader() {
    const response = await fetch("/components/header.html");
    const html = await response.text();

    document.body.insertAdjacentHTML("afterbegin", html);

    initHeader();
}


function initHeader() {

    const desktopBtn = document.querySelector(".desktop-toggle");
    const mobileBtn = document.querySelector(".mobile-toggle");

    const mobileMenu = document.querySelector(".mobile-menu");
    const desktopMenu = document.querySelector(".desktop-menu");


    console.log("Mobile button:", mobileBtn);
    console.log("Mobile menu:", mobileMenu);


    // Mobile menu toggle
    if (mobileBtn && mobileMenu) {

        mobileBtn.addEventListener("click", function(e) {

            e.preventDefault();
            e.stopPropagation();

            mobileMenu.classList.toggle("active");

            console.log("Mobile menu opened");

        });

    }


    // Desktop menu toggle
    if (desktopBtn && desktopMenu) {

        desktopBtn.addEventListener("click", function(e) {

            e.preventDefault();
            e.stopPropagation();

            desktopMenu.classList.toggle("active");

        });

    }


    // Close mobile menu when clicking outside
    document.addEventListener("click", function(){

        mobileMenu?.classList.remove("active");

    });


    // Prevent closing when clicking inside menu
    mobileMenu?.addEventListener("click", function(e){

        e.stopPropagation();

    });

}


loadHeader();
