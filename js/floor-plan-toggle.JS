document.addEventListener("DOMContentLoaded",()=>{


    const table =
    document.querySelector(".units-table");


    const toggle =
    document.querySelector(".table-toggle");



    if(!toggle || !table){
        return;
    }



    toggle.addEventListener("click",()=>{


        table.classList.toggle("expanded");



        toggle.textContent =
        table.classList.contains("expanded")
        ?
        "Show Less"
        :
        "View All Floor Plans";


    });


});
