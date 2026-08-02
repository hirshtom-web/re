<script>
  
  document.addEventListener("DOMContentLoaded", () => {


    /* =====================
    LOADING SCREEN
    ===================== */

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 900);





    /* =====================
    MOBILE MENU
    ===================== */

    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector(".nav-links");

    toggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        toggle.classList.toggle("open");

    });



    // Close menu after clicking a link

    document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            toggle.classList.remove("open");

        });

    });







    /* =====================
    SCROLL REVEAL
    ===================== */

    const reveals = document.querySelectorAll(".reveal");


    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {


                if(entry.isIntersecting){

                    entry.target.classList.add("active");

                    revealObserver.unobserve(entry.target);

                }


            });


        },

        {
            threshold:0.15
        }

    );


    reveals.forEach(item => {

        revealObserver.observe(item);

    });







    /* =====================
    NAVBAR EFFECT
    ===================== */

const header = document.querySelector(".header");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;


    // Shrink header
    if(currentScroll > 40){

        header.style.padding = "12px 0";

    } else {

        header.style.padding = "25px 0";

    }


    // Hide when scrolling down
    if(currentScroll > lastScroll && currentScroll > 100){

        header.classList.add("header-hidden");

    }

    // Show when scrolling up
    else {

        header.classList.remove("header-hidden");

    }


    lastScroll = currentScroll;

});







    /* =====================
    MOUSE PARALLAX BLOBS
    ===================== */


    const blobs = document.querySelectorAll(".blob");


  document.addEventListener("mousemove", (e)=>{

    // Show header when mouse reaches the top (desktop only)
    if (window.innerWidth >= 1024 && e.clientY < 80) {
        header.classList.remove("header-hidden");
    }

    const x =
    (e.clientX / window.innerWidth - .5) * 30;

    const y =
    (e.clientY / window.innerHeight - .5) * 30;

    blobs.forEach((blob,index)=>{

        const speed =
        (index + 1) * .5;

        blob.style.transform =
        `translate(${x * speed}px, ${y * speed}px)`;

    });

});






    /* =====================
    BUTTON MAGNET EFFECT
    ===================== */


    const buttons =
    document.querySelectorAll(".button");


    buttons.forEach(button=>{


        button.addEventListener("mousemove",(e)=>{


            const rect =
            button.getBoundingClientRect();


            const x =
            e.clientX - rect.left - rect.width/2;


            const y =
            e.clientY - rect.top - rect.height/2;



            button.style.transform =
            `translate(${x*.08}px, ${y*.08}px)`;


        });



        button.addEventListener("mouseleave",()=>{


            button.style.transform="";


        });


    });







    /* =====================
    ACTIVE NAV LINK
    ===================== */


    const sections =
    document.querySelectorAll("section");


    const navLinks =
    document.querySelectorAll(".nav-links a");


    window.addEventListener("scroll",()=>{


        let current="";


        sections.forEach(section=>{


            const sectionTop =
            section.offsetTop - 150;


            if(window.scrollY >= sectionTop){

                current = section.getAttribute("id");

            }


        });



        navLinks.forEach(link=>{


            link.classList.remove("active");


            if(link.getAttribute("href") === "#" + current){

                link.classList.add("active");

            }


        });


    });




});

document.addEventListener("DOMContentLoaded", () => {

    const stats = document.querySelector(".tm-heal100__stats");

    if (!stats) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            document.querySelectorAll(".tm-heal100__number").forEach(counter => {

                const target = Number(counter.dataset.count);
                const duration = 1800;
                const start = performance.now();

                function animate(now){

                    const progress = Math.min((now - start) / duration, 1);

                    const value = Math.floor(progress * target);

                    counter.textContent = value.toLocaleString();

                    if(progress < 1){

                        requestAnimationFrame(animate);

                    }else{

                        counter.textContent = target.toLocaleString() + "+";

                    }

                }

                requestAnimationFrame(animate);

            });

            observer.disconnect();

        });

    }, {
        threshold: 0.4
    });

    observer.observe(stats);

});

// =====================
// WIZARD
// =====================


const wizard = document.getElementById("wizard");

const openBtn = document.getElementById("openWizard");

const closeBtn = document.querySelector(".wizard-close");


const steps = document.querySelectorAll(".wizard-step");

const answerButtons = document.querySelectorAll(".answers button");


const progressFill = document.getElementById("wizardProgressFill");

const currentStepText = document.getElementById("wizardCurrentStep");


let currentStep = 0;





function showStep(index){


    steps.forEach(step=>{

        step.classList.remove("active");

    });



    steps[index].classList.add("active");



    let progress = ((index + 1) / steps.length) * 100;



    if(progressFill){

        progressFill.style.width = progress + "%";

    }



    if(currentStepText){

        currentStepText.textContent = index + 1;

    }



    currentStep = index;


}







// OPEN


openBtn.addEventListener("click", function(e){


    e.preventDefault();


    wizard.classList.add("active");


    showStep(0);


});







// CLOSE


closeBtn.addEventListener("click", function(){


    wizard.classList.remove("active");


});






// CLICK OUTSIDE TO CLOSE


wizard.addEventListener("click",function(e){


    if(e.target === wizard){

        wizard.classList.remove("active");

    }


});







// ANSWERS AUTO NEXT


answerButtons.forEach(button=>{


    button.addEventListener("click",function(){


        const question =
        steps[currentStep]
        .querySelector("h3")
        .textContent;



        const answer = this.textContent;



        console.log({

            question:question,

            answer:answer

        });




        // small selected effect


        this.classList.add("selected");




        setTimeout(()=>{


            if(currentStep < steps.length - 1){


                showStep(currentStep + 1);


            }


        },250);



    });


});


const track = document.querySelector(".tm-founders__grid");
const cards = document.querySelectorAll(".tm-founder-card");

const next = document.querySelector(".tm-next");
const prev = document.querySelector(".tm-prev");

const counter = document.querySelector(".tm-slider-count");

let current = 0;

function updateSlider(){

    const gap = 30;

    const cardWidth = cards[0].offsetWidth + gap;

    track.style.transform =
        `translateX(-${current * cardWidth}px)`;

    counter.textContent =
        `${current + 1} / ${cards.length}`;

}

next.addEventListener("click",()=>{

    current++;

    if(current >= cards.length){
        current = 0;
    }

    updateSlider();

});

prev.addEventListener("click",()=>{

    current--;

    if(current < 0){
        current = cards.length - 1;
    }

    updateSlider();

});

window.addEventListener("resize",updateSlider);

updateSlider();



document.addEventListener("DOMContentLoaded", function(){


    const workflow = document.querySelector(".tm-workflow");


    if(!workflow) return;



    const observer = new IntersectionObserver(

        function(entries){

            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    workflow.classList.add("is-visible");


                    observer.unobserve(workflow);


                }


            });


        },

        {
            threshold:0.25
        }


    );



    observer.observe(workflow);



});

    const phrases = [
    "Location",
    "Property Type",
    "3 BR Miami Condo",
    "House with a Pool",
    "Luxury Penthouse",
    "Beachfront Villa",
    "Pet Friendly Apartment",
    "Downtown Loft"
];

const element = document.getElementById("typing-search");

if(element){

    let phraseIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function type(){

        const current = phrases[phraseIndex];

        if(!deleting){

            element.textContent = current.substring(0, letterIndex++);

            if(letterIndex > current.length){

                deleting = true;

                setTimeout(type,2000);

                return;
            }

        }else{

            element.textContent = current.substring(0, letterIndex--);

            if(letterIndex < 0){

                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;

            }

        }

        setTimeout(type, deleting ? 35 : 70);

    }

    type();

}

    
        
  </script>
