
var step = 0;
var filledCells = 0;
var winTable = [0, 0];
function resetGame() {
    document.getElementById('rate').innerHTML = "SCORE(X,Y) = " + winTable[0] + " - " + winTable[1];
    document.getElementById('pole').innerHTML = "";
    step = 0;
    filledCells = 0;
    for (var i = 0; i < 9; i++) {
        document.getElementById('pole').innerHTML += '<div id="' + i + '" class="block"></div>';
    }
}

window.onload = function () {
    resetGame();
    document.getElementById('pole').onclick = function (event) {
        console.log(event);
        if (event.target.className == 'block') {
            if (event.target.innerHTML == "") {
                filledCells++;
                event.target.innerHTML = (step++ % 2 == 0) ? 'x' : 'o';
                checkWin(step % 2, event.target);
            }
        }
    }
}

function checkWin(playerId, sector) {

    var player = playerId == 1 ? "X" : "O";
    var winMap = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    var allblock = document.getElementsByClassName('block');
    var isWin = false;

	//checking all grid to match winMap
    for (var i = 0; i < winMap.length; i++) {
        for (var j = 0; j < 3; j++) {
            if (allblock[winMap[i][j]].innerText == player) {
                isWin = true;
            } else {
                isWin = false;
                break;
            }
        }
        if (isWin)
            break;
    }
	
	//if win exist, restarting game
    if (isWin) {
        winTable[playerId]++;
        alert(player + " WIN the game!");
        resetGame();
    } else if (filledCells == 9) {
        alert("Draw");
        resetGame();
    }
}
