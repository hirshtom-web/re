let savedScrollPosition=0;
function openDeal(page){
    let modal=document.getElementById("dealModal");
    let frame=document.getElementById("dealFrame");
    savedScrollPosition=window.scrollY;
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
    setTimeout(function(){
        window.scrollTo(0,savedScrollPosition);
    },50);
}
window.addEventListener("load",function(){
    let params=new URLSearchParams(window.location.search);
    let deal=params.get("deal");
    if(deal){
        savedScrollPosition=window.scrollY;
        openDeal(deal+".html");
    }
});
