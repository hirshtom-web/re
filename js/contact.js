const CONTACT={
    company:"Keller Williams",
    phone:"+16463936664",
    email:"tomh@kw.com",
    website:"https://kw.com"
};

function toggleMenu(){
    document.getElementById("moreMenu").classList.toggle("active");
}

document.addEventListener("click",function(e){
    const menu=document.getElementById("moreMenu");
    const wrapper=document.querySelector(".menu-wrapper");
    if(menu&&wrapper&&!wrapper.contains(e.target)){
        menu.classList.remove("active");
    }
});

function downloadPDF(){
    const frame=document.getElementById("dealFrame");
    if(frame&&frame.contentWindow){
        frame.contentWindow.focus();
        frame.contentWindow.print();
    }else{
        window.print();
    }
}

function shareDeal(){
    const url=window.location.href;
    if(navigator.share){
        navigator.share({
            title:document.title,
            url:url
        });
    }else{
        copyLink();
    }
}

function copyLink(){
    navigator.clipboard.writeText(window.location.href).then(()=>{
        alert("Link copied.");
    });
}

function callBroker(){
    window.location.href="tel:"+CONTACT.phone;
}

function emailBroker(){
    window.location.href="mailto:"+CONTACT.email;
}

function whatsappBroker(){
    const message=encodeURIComponent("Hi, I'm interested in this property.");
    window.open("https://wa.me/"+CONTACT.phone.replace(/\D/g,"")+"?text="+message,"_blank");
}

function visitWebsite(){
    window.open(CONTACT.website,"_blank");
}
