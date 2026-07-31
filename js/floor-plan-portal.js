document.addEventListener("click",(e)=>{

    const plan =
        e.target.closest(".plan-link");

    if(!plan){
        return;
    }

    openMediaLibrary(
        plan.dataset.plan,
        plan.dataset.title,
        "floorplans"
    );

});
