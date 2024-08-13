let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

function startGame() {
  if (!started) {
    document.querySelector("body").style.backgroundColor = "#2c3e50";
    started = true;
    levelUp();
  }
}

// Handle keypress and touchstart for starting the game
document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame, { once: true });

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4); // corrected index range
  let randColor = btns[randomIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key or tap the screen to start again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "#2c3e50";
    }, 150);
    reset();
  }
}

function btnPress(event) {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Add event listeners for button presses
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress, { passive: true });
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
