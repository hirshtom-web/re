function calculateMortgage(){

    const price = Number(
        document.getElementById("home-price").value.replace(/,/g,"")
    );

    const down = Number(
        document.getElementById("down-payment").value.replace(/,/g,"")
    );

    const rate = Number(
        document.getElementById("interest-rate").value
    ) / 100 / 12;

    const years = Number(
        document.getElementById("loan-years").value
    );


    const loan = price - down;

    const payments = years * 12;


    const mortgage =
    loan *
    (rate * Math.pow(1 + rate, payments)) /
    (Math.pow(1 + rate, payments)-1);



    const hoa =
    Number(
        document.getElementById("hoa").value.replace(/,/g,"")
    );


    const total = mortgage + hoa;



    document.getElementById("monthly-payment").innerHTML =
    "$" + Math.round(total).toLocaleString();


    document.getElementById("principal-interest").innerHTML =
    "$" + Math.round(mortgage).toLocaleString();


    document.getElementById("hoa-result").innerHTML =
    "$" + hoa.toLocaleString();

}



document.querySelectorAll(".mortgage-field input")
.forEach(input=>{

    input.addEventListener(
        "input",
        calculateMortgage
    );

});


calculateMortgage();
