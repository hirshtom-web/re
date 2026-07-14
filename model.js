function openDeal(page){

document.getElementById("dealFrame").src = page;

document.getElementById("dealModal")
.classList.add("active");

document.body.style.overflow="hidden";

}



function closeDeal(){

document.getElementById("dealModal")
.classList.remove("active");

document.getElementById("dealFrame").src="";

document.body.style.overflow="auto";

}
