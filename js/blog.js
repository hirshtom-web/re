/* =================================================
   BLOG PLATFORM JAVASCRIPT
================================================= */


/* =================================================
   SCROLL REVEAL
================================================= */


const revealItems =
document.querySelectorAll(
    ".reveal, .article-card, .category-card, .featured-card"
);



const revealObserver =
new IntersectionObserver(

(entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.classList.add(
                "visible"
            );


            revealObserver.unobserve(
                entry.target
            );


        }


    });


},

{
    threshold:.15
}

);



revealItems.forEach(item=>{

    item.classList.add("reveal");

    revealObserver.observe(item);

});





/* =================================================
   CATEGORY FILTER
================================================= */


const categoryButtons =
document.querySelectorAll(
    "[data-category]"
);



const articles =
document.querySelectorAll(
    ".article-card"
);



categoryButtons.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


            const category =
            button.dataset.category;



            categoryButtons.forEach(btn=>{

                btn.classList.remove(
                    "active"
                );

            });



            button.classList.add(
                "active"
            );



            articles.forEach(article=>{


                const articleCategory =
                article.dataset.category;



                if(
                    category==="all" ||
                    articleCategory===category
                ){

                    article.style.display="block";


                    setTimeout(()=>{

                        article.style.opacity="1";

                    },50);


                }

                else{


                    article.style.opacity="0";


                    setTimeout(()=>{

                        article.style.display="none";

                    },250);


                }


            });


        }

    );


});





/* =================================================
   ARTICLE SEARCH
================================================= */


const searchInput =
document.querySelector(
    ".blog-search"
);



if(searchInput){


searchInput.addEventListener(
"input",
()=>{


    const value =
    searchInput.value
    .toLowerCase();



    articles.forEach(article=>{


        const text =
        article.innerText
        .toLowerCase();



        if(text.includes(value)){


            article.style.display="block";


        }

        else{


            article.style.display="none";


        }


    });


});


}





/* =================================================
   AI INSIGHT ROTATION
================================================= */


const aiMessages=[

"AI market analysis updated today",

"42,000+ property signals analyzed",

"Luxury demand increasing in Miami",

"Investment opportunities detected",

"Market trends optimized"

];



const aiText =
document.querySelector(
".ai-message"
);



let aiIndex=0;



if(aiText){


setInterval(()=>{


    aiIndex++;


    if(aiIndex>=aiMessages.length){

        aiIndex=0;

    }



    aiText.style.opacity=0;



    setTimeout(()=>{


        aiText.textContent =
        aiMessages[aiIndex];


        aiText.style.opacity=1;


    },300);



},4000);


}





/* =================================================
   READING PROGRESS BAR
================================================= */


const progress =
document.querySelector(
".reading-progress"
);



window.addEventListener(
"scroll",
()=>{


    if(!progress)
    return;



    const height =
    document.documentElement
    .scrollHeight -
    window.innerHeight;



    const scrolled =
    window.scrollY;



    const percent =
    (scrolled / height) * 100;



    progress.style.width =
    percent + "%";



});





/* =================================================
   SMOOTH ANCHOR LINKS
================================================= */


document.querySelectorAll(
'a[href^="#"]'
)
.forEach(link=>{


    link.addEventListener(
        "click",
        e=>{


            const target =
            document.querySelector(
                link.getAttribute("href")
            );


            if(target){


                e.preventDefault();


                target.scrollIntoView({

                    behavior:"smooth"

                });


            }


        }
    );


});





/* =================================================
   FOOTER YEAR
================================================= */


const year =
document.querySelector(
".current-year"
);



if(year){

    year.textContent =
    new Date().getFullYear();

}





/* =================================================
   CARD TILT MICRO EFFECT
   (APPLE STYLE)
================================================= */


document.querySelectorAll(
".featured-card, .category-card"
)
.forEach(card=>{


card.addEventListener(
"mousemove",
e=>{


    const rect =
    card.getBoundingClientRect();



    const x =
    e.clientX - rect.left;



    const y =
    e.clientY - rect.top;



    const rotateY =
    ((x / rect.width)-.5)*6;



    const rotateX =
    ((y / rect.height)-.5)*-6;



    card.style.transform =
    `
    perspective(900px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-6px)
    `;


});


card.addEventListener(
"mouseleave",
()=>{


    card.style.transform="";


});


});





/* =================================================
   INITIALIZE
================================================= */


console.log(
"Blog experience initialized"
);


/* =================================================
   CONTINUE READING SLIDER
================================================= */


const slider = document.getElementById('continue-slider');
const container = document.getElementById('continue-slider-container');
const prevBtn = document.getElementById('continue-prev');
const nextBtn = document.getElementById('continue-next');


let currentIndex = 0;



function updateSlider(){


    if(!slider)
    return;


    const card =
    slider.querySelector('.continue-card');


    if(!card)
    return;



    const gap = 28;


    const cardWidth =
    card.offsetWidth + gap;



    slider.style.transform =
    `translateX(${-currentIndex * cardWidth}px)`;

}




if(slider && prevBtn && nextBtn){



    prevBtn.addEventListener(
        "click",
        ()=>{


            if(currentIndex > 0){

                currentIndex--;

            }


            updateSlider();


        }
    );





    nextBtn.addEventListener(
        "click",
        ()=>{


            const card =
            slider.querySelector('.continue-card');


            const visibleCards =
            Math.floor(
                slider.parentElement.offsetWidth /
                card.offsetWidth
            );



            const maxIndex =
            slider.children.length -
            visibleCards;



            if(currentIndex < maxIndex){

                currentIndex++;

            }


            updateSlider();


        }
    );





    /* TOUCH SWIPE */


    let startX = 0;


    let dragging = false;



    container.addEventListener(
        "touchstart",
        e=>{


            dragging=true;


            startX =
            e.touches[0].clientX;


            slider.style.transition="none";


        }
    );




    container.addEventListener(
        "touchmove",
        e=>{


            if(!dragging)
            return;



            const moveX =
            e.touches[0].clientX -
            startX;



            const card =
            slider.querySelector('.continue-card');


            const cardWidth =
            card.offsetWidth + 28;



            slider.style.transform =
            `translateX(${
                -currentIndex * cardWidth + moveX
            }px)`;


        }
    );





    container.addEventListener(
        "touchend",
        e=>{


            dragging=false;



            const endX =
            e.changedTouches[0].clientX;



            const diff =
            endX - startX;



            if(diff < -50){

                nextBtn.click();

            }


            else if(diff > 50){

                prevBtn.click();

            }



            slider.style.transition =
            "transform .4s ease";


            updateSlider();


        }
    );



    window.addEventListener(
        "resize",
        updateSlider
    );



    updateSlider();


}
