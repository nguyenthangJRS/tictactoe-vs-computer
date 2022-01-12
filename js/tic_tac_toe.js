"use strict";
// flagがTRUEの時penguinsのターン、FALSEの時bearのターン
let flag = false;

let counter = 9;
// class square 
const squares = document.querySelectorAll('.square');

const squaresArray = Array.prototype.slice.call(squares);

const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

// new game 
const newgamebtn_display = document.getElementById('newgame-btn');
const newgamebtn = document.getElementById('btn90');

// check win or lose 
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

const msgtxt1 = '<p class = "image"><img src = "img/penguins.jpg" width = 61px height = 61px></p><p>Penguins Attack!(Your turn)</p>';
const msgtxt2 = '<p class = "image"><img src = "img/whitebear.jpg" width = 61px height = 61px></p><p>White bear Attack! (Computer turn)</p>';
const msgtxt3 = '<p class = "image"><img src = "img/penguins.jpg" width = 61px height = 61px></p><p class = "text animate__animated animate__lightSpeedInRight">Penguins Win !!</p>'
const msgtxt4 = '<p class = "image"><img src = "img/whitebear.jpg" width = 61px height = 61px></p><p class = "text animate__animated animate__lightSpeedInLeft">WhiteBear Win !!</p>'
const msgtxt5 = '<p class = "image"><img src = "img/penguins.jpg" width = 61px height = 61px><img src = "img/whitebear.jpg" width = 61px height = 61px></p><p class = "text animate__bounceIn">Draw !!</p>'

// sound 
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"]

window.addEventListener("DOMContentLoaded", function() {
    setMessage("pen-turn");
    // click square 
    squaresArray.forEach(square => {
        square.classList.add("js-clickable");
    })
}, false);

// click function 
squaresArray.forEach(square => {
        square.addEventListener('click', () => {
            let gameOverFlg = isSelect(square);
            // check game over 
            if (gameOverFlg === "0") {
                const squaresBox = document.getElementById('squaresBox');
                squaresBox.classList.add("js-unclickable");
                setTimeout(() => {
                    bearTurn();
                }, 2000)
            }
        })
    })
    // JudgLine function 
function JudgLine(targetArray, idArray) {
    return targetArray.filter(e => {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    })
}
// select function 
const isSelect = (selectSquare) => {
    let gameOverFlg = "0";
    if (flag === false) {
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add('js-pen-checked');
        selectSquare.classList.add('js-unclickable');
        selectSquare.classList.remove("js-clickable");

        // penguins win 
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return gameOverFlg = "1";
        }

        setMessage("bear-turn");
        flag = true;
    } else {
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add('js-bear-checked');
        selectSquare.classList.add('js-unclickable');
        selectSquare.classList.remove("js-clickable");

        // whiteBear win 
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }

        setMessage("pen-turn");
        flag = false;
    }

    counter--;
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }

    return gameOverFlg = "0";
}

// isWinner function 
function isWinner(symbol) {
    const result = lineArray.some(line => {
        const subResult = line.every(square => {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            } else
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) { winningLine = line }
        return subResult;
    });
    return result;
}

// message function 
const setMessage = (id) => {
    const show_message = document.getElementById('msgtext');
    switch (id) {
        case "pen-turn":
            {
                show_message.innerHTML = msgtxt1;
                break;
            }
        case "bear-turn":
            {
                show_message.innerHTML = msgtxt2;
                break;
            }
        case "pen-win":
            {
                show_message.innerHTML = msgtxt3;
                break;
            }
        case "bear-win":
            {
                show_message.innerHTML = msgtxt4;
                break;
            }
        case "draw":
            {
                show_message.innerHTML = msgtxt5;
                break;
            }
        default:
            show_message.innerHTML = msgtxt1;
    }
}

// game over function 
function gameOver(status) {
    let w_sound;
    switch (status) {
        case "penguins":
            {
                w_sound = gameSound[2];
                break;
            }
        case "bear":
            {
                w_sound = gameSound[3];
                break;
            }
        case "draw":
            {
                w_sound = gameSound[4];
                break;
            }
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();

    squaresBox.classList.add("js-unclickable");

    // display new game btn 
    newgamebtn_display.classList.remove("js-hidden");

    if (status === "penguins") {
        if (winningLine) {
            winningLine.forEach(square => {
                square.classList.add("js-pen_highLight");
            })
        }
        // penguins win  snow color 
        $(document).snowfall({
            flakeColor: "rgb(255, 192, 72)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        })
    } else if (status === "bear") {
        if (winningLine) {
            winningLine.forEach(square => {
                square.classList.add("js-bear_highLight");
            })
        }
        // bear win  snow color 
        $(document).snowfall({
            flakeColor: "rgb(255, 255, 255)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        })
    }
}

newgamebtn.addEventListener('click', () => {
    flag = false;
    counter = 9;
    winningLine = null;
    squaresArray.forEach(square => {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");
    });
    squaresBox.classList.remove("js-unclickable");
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");

    $(document).snowfall("clear");
});

function bearTurn() {
    let bearTurnEnd = "0";
    let gameOverFlg = "0";
    let bearSquare = [];


    while (bearTurnEnd === "0") {
        bearTurnEnd = isReach("bear");
        if (bearTurnEnd === "1") {
            gameOverFlg = "1";
            break;
        }

        bearTurnEnd = isReach("penguins");
        if (bearTurnEnd === "1") {
            break;
        }
        squaresArray.filter(square => {
            if (square.classList.contains("js-clickable")) {
                bearSquare.push(square);
            }
            return bearSquare;
        });
        let n = Math.floor(Math.random() * bearSquare.length);
        gameOverFlg = isSelect(bearSquare[n]);

        break; // while break
    }

    if (gameOverFlg === "0") {
        squaresBox.classList.remove("js-unclickable");
    }
}

function isReach(status) {
    let bearTurnEnd = "0";
    lineArray.some(line => {

        let bearCheckCnt = 0;
        let penCheckCnt = 0;

        line.forEach(square => {
            if (square.classList.contains("js-bear-checked")) {
                bearCheckCnt++;
            }
            if (square.classList.contains("js-pen-checked")) {
                penCheckCnt++;
            }
        });

        if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
            bearTurnEnd = "1";
        }
        if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            bearTurnEnd = "1";
        }

        if (bearTurnEnd === "1") {
            line.some(square => {
                if (square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }
    })
    return bearTurnEnd;
}