async function loadHeader(centerFile = "") {

    const header = await fetch("/components/header.html")
        .then(r => r.text());


    document.body.insertAdjacentHTML(
        "afterbegin",
        header
    );


    if(centerFile){

        const centerHTML = await fetch(
            `/components/centers/${centerFile}`
        )
        .then(r => r.text());


        const center =
            document.getElementById("site-header-center");


        if(center){
            center.innerHTML = centerHTML;
        }

    }


    initHeaderMenu();

}





function initHeaderMenu(){


    const desktopBtn =
        document.querySelector(".header-menu-btn");


    const mobileBtn =
        document.querySelector(".mobile-menu-btn");


    const dropdown =
        document.querySelector(".header-dropdown");



    if(!dropdown) return;



    function toggleMenu(){

        dropdown.classList.toggle("active");

    }



    if(desktopBtn){

        desktopBtn.addEventListener(
            "click",
            toggleMenu
        );

    }



    if(mobileBtn){

        mobileBtn.addEventListener(
            "click",
            toggleMenu
        );

    }



    // close when clicking outside

    document.addEventListener("click", (e)=>{


        const clickedButton =
            e.target.closest(
                ".header-menu-btn, .mobile-menu-btn"
            );


        const clickedMenu =
            e.target.closest(
                ".header-dropdown"
            );


        if(!clickedButton && !clickedMenu){

            dropdown.classList.remove("active");

        }


    });



}
