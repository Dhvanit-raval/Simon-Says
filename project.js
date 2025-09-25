let gameseq = []; //Game Sequence
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");//h2 Accessed
let highscore = 0;
let highscoreboard = document.getElementById("highscore");

//When Key is pressed game starts
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("started");
        started = true;

        levelup();
    }
});

//Flash the button
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    let ranidx = Math.floor(Math.random() * 4);
    let randcolor = btns[ranidx];
    let randbtn = document.querySelector(`.${randcolor}`);

    // console.log(randbtn); 
    // console.log(ranidx);
    // console.log(randcolor);

    gameseq.push(randcolor);
    console.log(gameseq);

    btnflash(randbtn);
}


function btnflash(btn) {

    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

//User clicks the button
function userflash(btn) {

    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

//Check Answer
function checkans(index) {
    // console.log("Curr level :",level);
    // let index = level - 1;
    if (userseq[index] === gameseq[index]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
        // console.log("Same Value");
    }
    else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br>Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor = "red";
        // console.log("Not Same Value");
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);

        if (level > highscore) {
            highscore = level;
            highscoreboard.innerText = highscore;
        }

        reset();
    }

}

//button pressing
function btnpress() {

    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    // console.log(usercolor);
    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress)
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}