async function loadRilityHeader() {

    try {

        const response = await fetch("../components/rility-header.html");

        if (!response.ok) {

            throw new Error(
                `Header failed to load: ${response.status}`
            );

        }

        const html = await response.text();

        document.body.insertAdjacentHTML(
            "afterbegin",
            html
        );

        initRilityHeader();

    } catch (error) {

        console.error(
            "Rility header error:",
            error
        );

    }

}


function initRilityHeader() {

    const header =
        document.querySelector(".rility-header");

    const toggle =
        document.querySelector(".rility-header__mobile-toggle");

    const mobileMenu =
        document.querySelector(".rility-header__mobile-menu");


    if (!header) return;


    /* ==========================================
       MOBILE MENU
    ========================================== */

    if (toggle && mobileMenu) {

        toggle.addEventListener("click", function(e) {

            e.stopPropagation();

            const isOpen =
                mobileMenu.classList.toggle("is-open");

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        mobileMenu.addEventListener(
            "click",
            function(e) {

                e.stopPropagation();

            }
        );


        document.addEventListener(
            "click",
            function() {

                mobileMenu.classList.remove("is-open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(function(link) {

                link.addEventListener(
                    "click",
                    function() {

                        mobileMenu.classList.remove(
                            "is-open"
                        );

                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* ==========================================
       SCROLL EFFECT
    ========================================== */

    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("is-scrolled");

        } else {

            header.classList.remove("is-scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

}


loadRilityHeader();
