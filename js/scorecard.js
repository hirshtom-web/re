document.addEventListener("DOMContentLoaded", function(){


    const propertyID =
    window.location.hash.replace("#", "") ||
    Object.keys(window.properties)[0];

const property =
    window.properties[propertyID];


    if(!property){
        console.error("No score data found");
        return;
    }



    const score = Number(property.score.value || 0);



    document.getElementById("scoreValue").innerText =
        score;


    document.getElementById("scoreLabel").innerText =
        property.score.label



    document.getElementById("score-summary").innerText =
        property.score.summary



    // SCORE CARDS

    const cards =
    property.score.cards;


    const grid =
        document.getElementById("score-grid");


    if(grid && cards){


        grid.innerHTML="";


        cards.forEach(card=>{


            grid.innerHTML += `

<div class="score-card">

    <label>${card.label}</label>

    <strong>${card.value}</strong>

    <small>${card.description}</small>

</div>

`;


        });


    }



    // GAUGE

    const circle =
        document.querySelector(".gauge-progress");


    if(circle){


        const circumference = 314;


        const offset =
            circumference -
            (score / 100) * circumference;



        setTimeout(()=>{

            circle.style.strokeDashoffset =
                offset;

        },300);



        if(score >= 90){

            circle.style.stroke="#0b3d2e";

        }
        else if(score >=75){

            circle.style.stroke="#8a6d1d";

        }
        else{

            circle.style.stroke="#b33a3a";

        }


    }


});
