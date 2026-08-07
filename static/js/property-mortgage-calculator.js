// ======================================
// PROPERTY MORTGAGE CALCULATOR
// ======================================

function loadPropertyMortgageCalculator(data){

    if(!data?.mortgage){
        return;
    }


    const propertyData =
        document.querySelector(".property-data");


    if(propertyData){

        propertyData.dataset.price =
            data.mortgage.price;

        propertyData.dataset.downPayment =
            data.mortgage.downPayment;

        propertyData.dataset.taxRate =
            data.mortgage.taxRate;

        propertyData.dataset.insuranceRate =
            data.mortgage.insuranceRate;

        propertyData.dataset.hoaSqft =
            data.mortgage.hoaSqft;

        propertyData.dataset.unitSize =
            data.mortgage.size;

        propertyData.dataset.interestRate =
            data.mortgage.interestRate;

    }


    const homePrice =
        document.getElementById("home-price");

    const downPayment =
        document.getElementById("down-payment");

    const interestRate =
        document.getElementById("interest-rate");

    const loanYears =
        document.getElementById("loan-years");


    if(homePrice){

        homePrice.value =
            data.mortgage.price;

    }


    if(downPayment){

        downPayment.value =
            data.mortgage.downPayment;

    }


    if(interestRate){

        interestRate.value =
            data.mortgage.interestRate;

    }


    if(loanYears){

        loanYears.value =
            data.mortgage.loanYears || 30;

    }


    // refresh calculator

    if(typeof window.calculate === "function"){
    window.calculate();
}

}



// ======================================
// PRINT MORTGAGE SUMMARY
// ======================================

document.addEventListener("DOMContentLoaded",()=>{

    const printButton =
        document.querySelector(".mortgage-print");


    if(!printButton){
        return;
    }


    printButton.addEventListener("click",()=>{


        const calculator =
            document.querySelector(".mortgage-section");


        if(!calculator){
            return;
        }


        calculator.classList.add(
            "print-only"
        );


        setTimeout(()=>{

            window.print();

        },100);


    });



    window.addEventListener("afterprint",()=>{


        document
        .querySelectorAll(".print-only")
        .forEach(section=>{

            section.classList.remove(
                "print-only"
            );

        });


    });


});
