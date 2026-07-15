function openDeal(page){
    let modal=document.getElementById("dealModal");
    let frame=document.getElementById("dealFrame");
    frame.src=page;
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    modal.classList.add("active");
    let dealName=page.replace(".html","");
    history.pushState(null,"","?deal="+dealName);
}
function closeDeal(){
    let modal=document.getElementById("dealModal");
    let frame=document.getElementById("dealFrame");
    modal.classList.remove("active");
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
    frame.src="";
    history.pushState(null,"",window.location.pathname);
}
window.addEventListener("load",function(){
    let params=new URLSearchParams(window.location.search);
    let deal=params.get("deal");
    if(deal){
        openDeal(deal+".html");
    }
});
