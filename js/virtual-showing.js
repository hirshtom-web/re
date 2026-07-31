/* =========================
   VIRTUAL SHOWING
========================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


const scheduleButton =
document.querySelector(".schedule-button");


if(!scheduleButton){
    return;
}




document
.querySelectorAll(".date-card")
.forEach(card=>{


    card.addEventListener(
    "click",
    ()=>{


        document
        .querySelectorAll(".date-card")
        .forEach(c=>{

            c.classList.remove("active");

        });



        card.classList.add("active");


        checkShowingSelection();


    });


});






document
.querySelectorAll(".time-slots button:not(.unavailable)")
.forEach(button=>{


    button.addEventListener(
    "click",
    ()=>{


        document
        .querySelectorAll(".time-slots button")
        .forEach(b=>{

            b.classList.remove("selected");

        });



        button.classList.add("selected");


        checkShowingSelection();


    });


});






function checkShowingSelection(){


    const dateSelected =
    document.querySelector(
        ".date-card.active"
    );


    const timeSelected =
    document.querySelector(
        ".time-slots button.selected"
    );



    if(
        dateSelected &&
        timeSelected
    ){

        scheduleButton.disabled = false;


        scheduleButton.classList.add(
            "ready"
        );


        scheduleButton.textContent =
        "Request Showing →";


    }
    else{


        scheduleButton.disabled = true;


        scheduleButton.classList.remove(
            "ready"
        );


        scheduleButton.textContent =
        "Request Showing";


    }


}



});
