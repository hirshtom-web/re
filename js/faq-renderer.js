/* =========================
   FAQ RENDERER
========================= */


function renderFAQ(data){


    const faqList =
    document.getElementById("faq-list");


    console.log(
        "FAQ LIST:",
        faqList
    );


    if(
        !faqList ||
        !data?.faq
    ){

        console.log(
            "FAQ DATA NOT FOUND"
        );

        return;

    }



    faqList.innerHTML = "";



    data.faq.forEach(item=>{


        const faq =
        document.createElement("div");


        faq.className =
        "faq-item";



        faq.innerHTML = `

            <button class="faq-question">

                ${item.question}

                <span>+</span>

            </button>


            <div class="faq-answer">

                <p>
                    ${item.answer}
                </p>

            </div>

        `;


        faqList.appendChild(faq);


    });



    initFAQAccordion();
    initFAQToggle();


}





/* =========================
   FAQ ACCORDION
========================= */


function initFAQAccordion(){


    document
    .querySelectorAll(".faq-question")
    .forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const item =
                button.parentElement;



                document
                .querySelectorAll(".faq-item")
                .forEach(other=>{


                    if(other !== item){

                        other.classList.remove(
                            "active"
                        );

                    }


                });



                item.classList.toggle(
                    "active"
                );


            }
        );


    });


}






/* =========================
   FAQ SHOW MORE
========================= */


function initFAQToggle(){


    const faqToggle =
    document.querySelector(
        ".faq-toggle"
    );


    const faqWrapper =
    document.querySelector(
        ".faq-wrapper"
    );



    if(
        !faqToggle ||
        !faqWrapper
    ){

        return;

    }



    faqToggle.addEventListener(
        "click",
        ()=>{


            faqWrapper.classList.toggle(
                "expanded"
            );



            faqToggle.textContent =
            faqWrapper.classList.contains(
                "expanded"
            )
            ?
            "Show Less"
            :
            "Show More";


        }
    );


}
