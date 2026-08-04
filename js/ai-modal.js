// ======================================
// AI MODAL
// ======================================

async function loadAIModal(){

    const container =
        document.getElementById("ai-modal-container");

    if(!container){
        return;
    }

    try{

        const response =
            await fetch("../tools/ai-modal.html");

        if(!response.ok){
            throw new Error("AI modal missing");
        }

        container.innerHTML =
            await response.text();

        initAIModal();

    }catch(error){

        console.error("AI Modal:", error);

    }

}


function initAIModal(){

    const aiButton =
        document.querySelector(".ai-rating");

    const aiModal =
        document.getElementById("aiModal");

    const close =
        document.getElementById("closeAiModal");

    if(!aiButton || !aiModal){
        return;
    }

    aiButton.addEventListener("click",()=>{

        aiModal.classList.add("active");

    });

    if(close){

        close.addEventListener("click",()=>{

            aiModal.classList.remove("active");

        });

    }

    aiModal.addEventListener("click",(e)=>{

        if(e.target === aiModal){

            aiModal.classList.remove("active");

        }

    });

}






