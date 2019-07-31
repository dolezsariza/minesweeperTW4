function main() {
    let board = Array(12).fill().map(() => Array(12).fill(0));
    //Set modals
    for (let refresh of document.querySelectorAll(".refresh")){
        refresh.addEventListener('click', function(){window.location.reload();})
    }
    for (let home of document.querySelectorAll(".home")){
        home.addEventListener('click', function(){window.location.href = "/";});
    }

    /*
    difficulty = document.getElementById("difficulty").value;

    if (difficulty === "easy") {
        let mineNumber = 7;
        let arrayLength = 5;
    } else if (difficulty === "medium") {
        let mineNumber = 20;
        let arrayLength = 12;
    } else {
        let mineNumber = 60;
        let arrayLength = 20;
    }*/

    let bombs = placeBombs(5, board);
    showCellContent(board);
    setCellNumbers(board);
    let flags = [];
    placeFlag(flags, bombs);
    counter();
}


function placeBombs(bombNumber, board){
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
    for (let cell of cells) {

        cell.addEventListener('contextmenu', function () {
            let flagPosition = [parseInt(cell.dataset.row),parseInt(cell.dataset.col)]
            if (cell.classList.contains("known")) {
                return;
            }
            if (cell.classList.contains("flag")) {
                for(let i = 0; i < flags.length; i++){
                    if (arrayEquals2D(flags[i],flagPosition)) {
                        flags.splice(i, 1);
                    }
                }
                cell.innerHTML = " ";
            } else {
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
                gameCell.innerHTML = "<i class=\"fas fa-bomb\"></i>";
            } else {
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
                        if(board[i+offset[0]][j+offset[1]] !== -1){
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
}


function isGameWon(flags, bombs){

    console.log(flags, bombs);
    if(arrayEquals2D(flags, bombs)){
        let modalTitle = document.querySelector(".modal-title");
        let modalBody = document.querySelector(".modal-body");
        console.log("game won");
        modalBody.textContent = "You won! Would you like to play again?";
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
    let totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
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


main();