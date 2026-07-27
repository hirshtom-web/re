const searchBox =
document.getElementById("ai-search-trigger");


const input =
document.getElementById("ai-search-input");


searchBox.addEventListener("click",()=>{


    searchBox.classList.add("active");


    input.style.display="block";


    input.focus();


});

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        const query=input.value;

        openAIConcierge(query);

    }

});
