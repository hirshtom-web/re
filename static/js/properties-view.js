const gridBtn =
document.getElementById("grid-view-btn");


const mapBtn =
document.getElementById("map-view-btn");


const layout =
document.querySelector(".properties-layout");



if(gridBtn && mapBtn && layout){


    gridBtn.onclick=()=>{

        layout.classList.remove("map-only");

        gridBtn.classList.add("active");

        mapBtn.classList.remove("active");

    };



    mapBtn.onclick=()=>{

        layout.classList.add("map-only");

        mapBtn.classList.add("active");

        gridBtn.classList.remove("active");

    };


}
