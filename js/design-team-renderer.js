function renderDesignTeam(data){


    if(!data.designTeam){
        return;
    }



    const architect =
    document.getElementById("team-architect");


    const interiors =
    document.getElementById("team-interiors");


    const landscape =
    document.getElementById("team-landscape");



    if(architect){

        architect.textContent =
        data.designTeam.architect ||
        "Coming Soon";

    }



    if(interiors){

        interiors.textContent =
        data.designTeam.interiors ||
        "Coming Soon";

    }



    if(landscape){

        landscape.textContent =
        data.designTeam.landscape ||
        "Coming Soon";

    }


}
