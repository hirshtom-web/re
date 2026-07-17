document.addEventListener("DOMContentLoaded", function(){


    const dealId = document.body.dataset.deal;


    const property =
        window.properties[dealId];


    if(!property){
        console.error("No score data found");
        return;
    }



    const score = Number(property.score || 0);



    document.getElementById("scoreValue").innerText =
        score;


    document.getElementById("scoreLabel").innerText =
        property.scoreLabel;



    document.getElementById("score-summary").innerText =
        property.scoreSummary;



    // SCORE CARDS

    const cards =
        property.scoreCards;


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
