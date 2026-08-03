const hero = document.querySelector(".ai-search-hero");

const firstInput = document.getElementById("aiInput");
const firstButton = document.getElementById("aiSend");

const chat = document.getElementById("ai-chat");
const messages = document.getElementById("ai-messages");

const chatInput = document.getElementById("chatInput");
const chatButton = document.getElementById("chatSend");


function sendMessage(text){

    if(!text.trim()) return;


    messages.innerHTML += `
        <div class="message user-message">
            ${text}
        </div>
    `;


    setTimeout(()=>{

        messages.innerHTML += `
            <div class="message ai-message">
                Searching Florida properties matching your request...
            </div>
        `;

    },700);

}



firstButton.addEventListener("click",()=>{

    const text = firstInput.value;

    if(!text) return;


    hero.classList.add("chat-mode");

    chat.classList.add("active");

    sendMessage(text);

    chatInput.focus();

});



chatButton.addEventListener("click",()=>{

    sendMessage(chatInput.value);

    chatInput.value="";

});


chatInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage(chatInput.value);

        chatInput.value="";

    }

});
