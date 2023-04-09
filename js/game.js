// TIMER START

const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
let totalSeconds = 20;
const gameTimer = document.getElementsByClassName("game__timer");

let timerInterval = setInterval(() => {
  if (totalSeconds <= 0) {
    showModal();
  }
  let secondsLeft = totalSeconds % 60;

  seconds.textContent = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

  if (secondsLeft <= 0) {
    clearInterval(timerInterval);
    showModal();
  } else if (secondsLeft <= 5) {
    gameTimer[0].style.color = "red";
  } else if (secondsLeft <= 12) {
    gameTimer[0].style.color = "#E08B01";
  }

  totalSeconds--;
}, 1000);

// TIMER END
// MODAL START

const userScore = document.getElementById("user-score");
const userScoreText = document.getElementById("user-score-text");

let matchedButtons = [];
var container = document.getElementById("buttons-container");
const startBtn = document.getElementById("start-btn");

function restartTimer() {
  totalSeconds = 20;
  setInterval(timerInterval);
  minutes.textContent = "00";
  seconds.textContent = "20";
  modal.style.display = "none";
}

function showModal() {
  modal.style.display = "flex";
  userScore.textContent = `${
    matchedButtons.length ? matchedButtons.length : 0
  }/${20}`;
  userScoreText.textContent = `${
    matchedButtons.length ? matchedButtons.length : 0
  } out of ${20}`;
}

startBtn.addEventListener("click", function (event) {
  {
    restartTimer();
    clickedButton = null;
    matchedButtons = [];
    container.innerHTML = "";
    var positions = generateButtonPositions(20);
    createButtons(positions);
  }
});

// GENERATE BUTTONS AT DIFFERENT POSITIONS AND ROTATIONS START

var clickedButton = null;

function generateButtonPositions(numButtons) {
  var positions = [];

  for (var i = 0; i < numButtons; i++) {
    var position = {
      x: Math.random() * (1000 - 100) + 50,
      y: Math.random() * (550 - 50) + 25,
      r: Math.floor(Math.random() * 60) - 30,
    };
    var overlapping = false;

    for (var j = 0; j < positions.length; j++) {
      var dx = position.x - positions[j].x;
      var dy = position.y - positions[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      positions.push(position);
    } else {
      i--;
    }
  }

  return positions;
}

function createButtons(positions) {
  var words = [
    "apple",
    "banana",
    "cherry",
    "grapes",
    "door",
    "fig",
    "car",
    "honeydew",
    "pen",
    "pencil",
  ];
  var translations = [
    "olma",
    "banan",
    "gilos",
    "uzum",
    "eshik",
    "anjir",
    "moshina",
    "obinavot",
    "ruchka",
    "qalam",
  ];

  for (var i = 0; i < positions.length; i++) {
    var button = document.createElement("button");
    button.className = "button";
    button.style.left = positions[i].x + "px";
    button.style.top = positions[i].y + "px";
    button.style.transform = "rotate(" + positions[i].r + "deg)";

    if (i % 2 === 0) {
      button.innerHTML = words[i / 2];
      button.setAttribute(
        "data-translation",
        translations[i / 2] + words[Math.floor(i / 2)] + "-1"
      );
    } else {
      button.innerHTML = translations[Math.floor(i / 2)];
      button.setAttribute(
        "data-translation",
        translations[Math.floor(i / 2)] + words[Math.floor(i / 2)] + "-2"
      );
    }

    button.addEventListener("click", function (event) {
      if (clickedButton === null) {
        clickedButton = event.target;
        clickedButton.classList.add("clicked");
      } else {
        var translation1 = clickedButton.getAttribute("data-translation");
        var translation2 = event.target.getAttribute("data-translation");

        if (translation1.split("-")[0] === translation2.split("-")[0]) {
          if (translation1.split("-")[1] !== translation2.split("-")[1]) {
            clickedButton.classList.add("matched");
            event.target.classList.add("matched");
            matchedButtons.push(clickedButton);
            matchedButtons.push(event.target);
          } else {
            clickedButton.classList.remove("clicked");
          }
        } else {
          clickedButton.classList.remove("clicked");
        }
        clickedButton = null;
      }

      for (var i = 0; i < matchedButtons.length; i++) {
        matchedButtons[i].disabled = true;
      }
    });

    container.appendChild(button);
  }
}

var positions = generateButtonPositions(20);
createButtons(positions);

// GENERATE BUTTONS AT DIFFERENT POSITIONS AND ROTATIONS END
// RESHUFFLE START

var reshuffleButton = document.getElementById("reshuffle-button");
reshuffleButton.addEventListener("click", function () {
  var positions = generateButtonPositions(20);
  reshuffleButtons(positions);
});

function reshuffleButtons(positions) {
  var buttons = document.getElementsByClassName("button");

  for (var i = 0; i < buttons.length; i++) {
    var positionIndex = Math.floor(Math.random() * positions.length);
    var rotation = Math.floor(Math.random() * 60) - 30;

    buttons[i].style.left = positions[positionIndex].x + "px";
    buttons[i].style.top = positions[positionIndex].y + "px";
    buttons[i].style.transform = "rotate(" + rotation + "deg)";

    positions.splice(positionIndex, 1);
  }
}

// RESHUFFLE END
