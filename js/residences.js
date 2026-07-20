document.addEventListener("DOMContentLoaded",()=>{


console.log("Residence page loaded");



const buttons=document.querySelectorAll("button");


buttons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        alert(
        "Thank you. Our team will contact you with availability."
        );

    });

});


});
