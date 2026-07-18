let savedScrollPosition = 0;


function openDeal(page){

    let modal = document.getElementById("dealModal");
    let frame = document.getElementById("dealFrame");

    savedScrollPosition = window.scrollY;

    frame.src = page;

    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");

    modal.classList.add("active");

}



function closeDeal(){

    let modal = document.getElementById("dealModal");
    let frame = document.getElementById("dealFrame");

    modal.classList.remove("active");

    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");

    frame.src = "";

    history.pushState(null, "", window.location.pathname);

    setTimeout(function(){

        window.scrollTo(0, savedScrollPosition);

    }, 50);

}



window.addEventListener("load", function(){

    let id = window.location.hash.substring(1);

    console.log("PROPERTY ID:", id);


    if(id){

        let property = window.properties[id];

        console.log("PROPERTY DATA:", property);


        if(property){


            savedScrollPosition = window.scrollY;


            let frame = document.getElementById("dealFrame");


            console.log("FRAME PAGE:", property.page);


            frame.src = property.page;


            document.documentElement.classList.add("modal-open");

            document.body.classList.add("modal-open");


            document.getElementById("dealModal")
            .classList.add("active");


        } else {


            console.log("Property not found:", id);


        }

    }

});
