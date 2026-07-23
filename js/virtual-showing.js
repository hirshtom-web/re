document.addEventListener("DOMContentLoaded", function(){


const scheduleButton =
document.querySelector(".schedule-button");



document.querySelectorAll(".date-card")
.forEach(card => {

    card.addEventListener("click", function(){

        document
        .querySelectorAll(".date-card")
        .forEach(c => c.classList.remove("active"));

        this.classList.add("active");

        checkShowingSelection();

    });

});



document.querySelectorAll(".time-slots button:not(.unavailable)")
.forEach(button => {

    button.addEventListener("click", function(){

        document
        .querySelectorAll(".time-slots button")
        .forEach(b => b.classList.remove("selected"));

        this.classList.add("selected");

        checkShowingSelection();

    });

});



function checkShowingSelection(){

    const dateSelected =
    document.querySelector(".date-card.active");


    const timeSelected =
    document.querySelector(".time-slots button.selected");


    if(dateSelected && timeSelected){

        scheduleButton.disabled = false;

        scheduleButton.classList.add("ready");

    }
    else{

        scheduleButton.disabled = true;

        scheduleButton.classList.remove("ready");

    }

}


});
