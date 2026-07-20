*{
    box-sizing:border-box;
}

body{

    margin:0;

    font-family:"Inter",sans-serif;

    background:#0b0b12;

    color:white;

}


.residence-page{

    overflow:hidden;

}



/* HERO */

.residence-hero{

    height:90vh;

    min-height:700px;

    position:relative;

    display:flex;

    align-items:flex-end;

}


.hero-image{

    position:absolute;

    inset:0;

    width:100%;

    height:100%;

    object-fit:cover;

}


.hero-overlay{

    position:absolute;

    inset:0;

    background:
    linear-gradient(
        180deg,
        rgba(0,0,0,.15),
        rgba(0,0,0,.8)
    );

}



.hero-content{

    position:relative;

    z-index:2;

    max-width:1200px;

    width:90%;

    margin:auto;

    padding-bottom:100px;

}



.eyebrow{

    font-size:12px;

    letter-spacing:3px;

    color:#ddd;

}



.hero-content h1{

    font-size:clamp(42px,6vw,75px);

    line-height:1.05;

    max-width:800px;

    margin:25px 0;


}



.hero-content h1 span{

    display:block;

    color:#f59e0b;

}



.hero-content p{

    max-width:600px;

    font-size:20px;

    line-height:1.6;

    color:#ddd;

}



button{

    margin-top:30px;

    padding:18px 35px;

    border-radius:999px;

    border:0;

    background:white;

    color:#111;

    font-size:16px;

    cursor:pointer;

}






/* STATS */


.residence-stats{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    max-width:1200px;

    margin:-50px auto 80px;

    position:relative;

    z-index:5;

}


.residence-stats div{

    background:
    rgba(255,255,255,.08);

    backdrop-filter:blur(20px);

    padding:35px;

    border:1px solid rgba(255,255,255,.15);

}


.residence-stats span{

    display:block;

    color:#aaa;

    font-size:13px;

    margin-bottom:10px;

}


.residence-stats strong{

    font-size:20px;

}





/* SECTIONS */


.section{

    width:min(1200px,90%);

    margin:100px auto;

}



h2{

    font-size:42px;

    margin-bottom:50px;

}





.feature-grid{

    display:grid;

    grid-template-columns:repeat(3,1fr);

    gap:25px;

}



.feature-card{

    background:#15151d;

    padding:35px;

    border-radius:28px;

}



.feature-card p{

    color:#bbb;

    line-height:1.6;

}







/* SPLIT */


.split-section{

    width:min(1200px,90%);

    margin:120px auto;

    display:grid;

    grid-template-columns:1fr 1fr;

    gap:60px;

    align-items:center;

}



.split-section img{

    width:100%;

    border-radius:35px;

}



.split-section li{

    margin:18px 0;

    color:#ccc;

}








.amenity-grid{

    display:grid;

    grid-template-columns:repeat(3,1fr);

    gap:20px;

}



.amenity-grid div{

    padding:30px;

    border-radius:25px;

    background:#15151d;

}








.investment-box{

    width:min(1200px,90%);

    margin:100px auto;

    padding:50px;

    border-radius:40px;

    background:
    linear-gradient(
        135deg,
        #111827,
        #1e293b
    );

}



.investment-grid{

    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:25px;

}


.investment-grid div{

    padding:25px;

    background:rgba(255,255,255,.08);

    border-radius:20px;

}


.investment-grid span{

    display:block;

    color:#aaa;

    font-size:13px;

}






.location{

    width:min(900px,90%);

    margin:100px auto;

    text-align:center;

}



.location p{

    color:#bbb;

    font-size:20px;

}







.residence-cta{

    text-align:center;

    padding:100px 20px;

    background:
    linear-gradient(
        90deg,
        #2563eb,
        #22c55e
    );

}




footer{

    padding:40px;

    text-align:center;

    color:#999;

}






@media(max-width:900px){


.residence-stats{

    grid-template-columns:1fr;

    margin:0 20px 60px;

}



.feature-grid,
.amenity-grid,
.investment-grid,
.split-section{

    grid-template-columns:1fr;

}



.hero-content{

    padding-bottom:60px;

}


}
