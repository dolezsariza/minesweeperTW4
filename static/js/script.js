let countTime;



function main() {
    setBoardWidth();
    addEventListener('click', init);

}


function init(event) {
    let row =  event.target.dataset.row;
    let col = event.target.dataset.col;

    let lengthOfArray = getArraySize();
    let board = Array(lengthOfArray).fill().map(() => Array(lengthOfArray).fill(0));
    let numberOfBombs = getNumberOfBombs();
    let bombs = placeBombs(numberOfBombs, board, row, col);

    console.log("Number of bombs : ",bombs.length);
    console.log(row, col);
    //set Bombs
    document.getElementById("bombs_left").textContent = numberOfBombs;
    //Set modals
    for (let refresh of document.querySelectorAll(".refresh")){
        refresh.addEventListener('click', function(){window.location.reload();})
    }
    for (let home of document.querySelectorAll(".home")){
        home.addEventListener('click', function(){window.location.href = "/";});
    }

    showCellContent(board);
    setCellNumbers(board);
    printBoard(board);
    let flags = [];
    placeFlag(flags, bombs);

    counter();

    removeEventListener('click', init);
    document.getElementById(`cell-${row}-${col}`).click();
}



function placeBombs(bombNumber, board, row, col){

    let bombs = [];
    let i = 0;
    while(i !== bombNumber){
        let row = Math.floor(Math.random() * board.length);
        let col = Math.floor(Math.random() * board[0].length);
        if(board[row][col]!==-1){
            bombs.push([row,col]);
            board[row][col]=-1;
            i++;
        }
    }
    return bombs;
}

window.oncontextmenu = function (){
    //disable right click in browser
    return false;
};


function placeFlag(flags, bombs) {
    let cells = document.querySelectorAll('.cell');
    let bombsLeft = document.getElementById("bombs_left")
    for (let cell of cells) {

        cell.addEventListener('contextmenu', function () {
            let flagPosition = [parseInt(cell.dataset.row),parseInt(cell.dataset.col)]
            if (cell.classList.contains("known")) {
                return;
            }
            if (cell.classList.contains("flag")) {
                bombsLeft.textContent = (parseInt(bombsLeft.textContent))+1;
                for(let i = 0; i < flags.length; i++){
                    if (arrayEquals2D(flags[i],flagPosition)) {
                        flags.splice(i, 1);
                    }
                }
                cell.innerHTML = " ";
            } else {
                bombsLeft.textContent = (parseInt(bombsLeft.textContent))-1;
                flags.push(flagPosition);
                cell.innerHTML = '<i class="fas fa-flag flag"></i>';
            }
            cell.classList.toggle('flag');
            isGameWon(flags, bombs);

        }, false);
    }
}


function showCellContent(board) {
    let gameCells = document.querySelectorAll(".unknown");
    for (let i = 0; i < gameCells.length; i++) {
        let gameCell = gameCells[i];
        let row = gameCells[i].dataset.row;
        let col = gameCells[i].dataset.col;

        gameCell.addEventListener('click', function() {

            if (gameCell.classList.contains("flag")) {
                return;}
            gameCell.classList.add("known");
            gameCell.classList.remove("unknown");
            if (board[row][col] === -1) {
                gameOver();
                gameCell.innerHTML = '<i class="fas fa-bomb"></i>';

            } else if (board[row][col] === 0){
                bubbling(board,row,col,gameCell);
            }else{
                gameCell.textContent = board[row][col];
            }
        });
    }

}


function setCellNumbers(board){
    let offsets = [
        [-1,-1],
        [-1, 0],
        [-1, 1],
        [ 0,-1],
        [ 0, 1],
        [ 1,-1],
        [ 1, 0],
        [ 1, 1]
    ];
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if (board[i][j] === -1){
                for(let offset of offsets) {
                    try{
                        if(board[i+offset[0]][j+offset[1]] !== -1 && board[i+offset[0]][j+offset[1]] !=null){
                            board[i+offset[0]][j+offset[1]] ++;
                        }
                    }
                    catch (e) {
                        //at edge
                    }

                }
            }
        }
    }
}

function gameOver(){
    let smiley = document.querySelector('.fa-smile');
    smiley.classList.add('fa-dizzy');
    smiley.classList.remove('fa-smile');
    //show bombs, then continue
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");
    modalBody.textContent = "Would you like to retry?";
    modalTitle.textContent = "Game over!";
    $('#myModal').modal('show');
    clearInterval(countTime);
}


function isGameWon(flags, bombs){
    if(arrayEquals2D(flags, bombs)){
        let modalTitle = document.querySelector(".modal-title");
        let modalBody = document.querySelector(".modal-body");
        clearInterval(countTime);
        countScore();
        console.log("game won");
        modalBody.textContent = `You won! Would you like to play again? Your score: ${countScore()}`;
        modalTitle.textContent = "Congratulations!";
        $('#myModal').modal('show');
        //game won

    }
}


function arrayEquals2D(a, b){
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    a.sort();
    b.sort();
    for (let i = 0; i < a.length; ++i) {
        if(typeof a[i] == "object"){if (!arrayEquals2D(a[i], b[i])) return false;}
        else{
            if (a[i]!=b[i])return false;
        }
    }
    return true;


}

function counter(){
    let minutesLabel = document.getElementById("minutes");
    let secondsLabel = document.getElementById("seconds");
    let totalTime = document.getElementById("total_time");
    let totalSeconds = 0;
    countTime = setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        totalTime.innerHTML = totalSeconds;

    }

    function pad(val) {
        let valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
}

function getArraySize() {
    let row_num = parseInt(document.getElementById("row_num").textContent);
    return row_num
}

function getNumberOfBombs() {
    let difficulty = document.getElementById("difficulty").textContent;
    let numberOfBombs;
    if (difficulty === "easy") {
        numberOfBombs = 4;
    } else if (difficulty === "medium") {
        numberOfBombs = 40;
    } else {
        numberOfBombs = 99;
    }
    return numberOfBombs
}

function countScore() {
    let amountOfFlippedCells = document.querySelectorAll(".known").length;
    let totalTime = document.getElementById("total_time").textContent;
    let scoreByTime;
    if (totalTime < 300) {
        scoreByTime = 1200 - (totalTime * 4)
    } else {
        scoreByTime = 0
    }
    let scoreByCell = amountOfFlippedCells * 100;
    let totalScore = scoreByCell + scoreByTime;

    return totalScore;

}



function setBoardWidth(){
    let difficulty = document.getElementById("difficulty").textContent;
    let rows = document.querySelectorAll(".row");
    let board = document.querySelector(".board");
    if (difficulty === "medium")return;
    let width = difficulty === "easy" ? "305px" : "2000px";
    board.style.maxWidth = width;
    for(let row of rows) {
        row.style.maxWidth = width;
    }
    if (difficulty==="hard"){
        let cells = document.querySelectorAll(".cell");
        for (let cell of cells){
            cell.style.height = "55.3px";
        }
    }
}


function bubbling(board,positionRow,positionCol,gameCell) {


    let offsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];

    if (board[positionRow][positionCol] == 0) {
        gameCell.classList.add("known");
        gameCell.classList.remove("unknown");

        for (let offset of offsets) {
            try {
                let currentRow = parseInt(positionRow) + offset[0];
                let currentCol = parseInt(positionCol) + offset[1];
                let cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
                if (board[currentRow][currentCol] == 0) {
                    if(cell.classList.contains('unknown')) {
                        bubbling(board, currentRow, currentCol, cell);
                    }
                } else {
                    cell.classList.add("known");
                    cell.classList.remove("unknown");
                    cell.textContent = board[currentRow][currentCol];
                }
            } catch (e) {
                //at edge
            }

        }
    }
}

function printBoard(board){
    let boardString ="";
    for (let row of board){
        for(let item of row){
            if (item >= 0 && item < 10){
                boardString += " ";
            }
            boardString += item;

            boardString += "|";
        }
        boardString += "\n";
    }
    console.log(boardString);
}

main();