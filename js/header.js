async function loadHeader(centerFile = "") {

    const header = await fetch("/components/header.html")
        .then(r => r.text());

    document.body.insertAdjacentHTML("afterbegin", header);

    if (!centerFile) return;

    const center = document.getElementById("site-header-center");

    if (!center) return;

    const html = await fetch(`/components/centers/${centerFile}`)
        .then(r => r.text());

    center.innerHTML = html;
}
