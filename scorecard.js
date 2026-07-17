document.addEventListener("DOMContentLoaded", function(){


    const body = document.body;


    const score = Number(body.dataset.score || 0);


    const cashflow =
        body.dataset.cashflow || "-";


    const risk =
        body.dataset.risk || "-";


    const growth =
        body.dataset.growth || "-";


    const liquidity =
        body.dataset.liquidity || "-";



    // TEXT VALUES


    document.getElementById("scoreValue").innerText = score;


    document.getElementById("cashflow").innerText = cashflow;


    document.getElementById("risk").innerText = risk;


    document.getElementById("growth").innerText = growth;


    document.getElementById("liquidity").innerText = liquidity;



    // SCORE LABEL


    let label;


    if(score >= 90){

        label="Excellent";

    }

    else if(score >= 80){

        label="Strong";

    }

    else if(score >= 70){

        label="Good";

    }

    else{

        label="Moderate";

    }


    document.getElementById("scoreLabel").innerText = label;



    // GAUGE ANIMATION


    const circle =
        document.querySelector(".gauge-progress");


    const circumference = 314;


    const offset =
        circumference - 
        (score / 100) * circumference;



    setTimeout(()=>{


        circle.style.strokeDashoffset = offset;


    },300);



    // COLOR


    if(score >= 90){

        circle.style.stroke="#0b3d2e";

    }

    else if(score >= 75){

        circle.style.stroke="#8a6d1d";

    }

    else{

        circle.style.stroke="#b33a3a";

    }



});
