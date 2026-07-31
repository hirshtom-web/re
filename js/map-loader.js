window.hideMapLoading = function(){

    setTimeout(() => {

        const loader =
        document.querySelector(".map-loading");


        if(loader){

            loader.style.opacity = "0";


            setTimeout(()=>{

                loader.style.display = "none";

            },800);

        }


    },1500);

};
