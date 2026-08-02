async function loadHeader(centerContent=""){

    const header =
    await fetch("/components/header.html")
    .then(res=>res.text());


    document.body.insertAdjacentHTML(
        "afterbegin",
        header
    );


    const center =
    document.getElementById(
        "site-header-center"
    );


    if(center){
        center.innerHTML = centerContent;
    }

}
