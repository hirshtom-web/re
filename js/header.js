async function loadHeader(centerFile = "") {

    const header = await fetch("/components/header.html")
        .then(r => r.text());


    document.body.insertAdjacentHTML(
        "afterbegin",
        header
    );


    if (!centerFile) return;


    const centerHTML = await fetch(
        `/components/centers/${centerFile}`
    )
    .then(r => r.text());


    const center =
        document.getElementById("site-header-center");


    if(center){
        center.innerHTML = centerHTML;
    }

}
