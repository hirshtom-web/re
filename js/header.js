async function loadHeader(){

    const response = await fetch("/components/header.html");

    const html = await response.text();

    document.body.insertAdjacentHTML(
        "afterbegin",
        html
    );


    initHeader();

}



function initHeader(){

    const desktopBtn =
    document.querySelector(".desktop-toggle");


    const mobileBtn =
    document.querySelector(".mobile-toggle");


    if(desktopBtn){

        desktopBtn.addEventListener("click",()=>{

            console.log("Desktop menu clicked");

        });

    }


    if(mobileBtn){

        mobileBtn.addEventListener("click",()=>{

            console.log("Mobile menu clicked");

        });

    }

}



document.addEventListener(
    "DOMContentLoaded",
    loadHeader
);
