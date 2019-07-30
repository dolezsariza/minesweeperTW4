function main() {
    let board = Array(12).fill().map(() => Array(12).fill(0));
    placeMines(20, board);
    showCellContent(board)
    setCellNumbers(board);
    console.log(board);
    placeFlag();
}

function placeMines(mineNumber, board){
    for(let i=0;i< mineNumber;i++){
        let row = Math.floor(Math.random() * board.length);
        let col = Math.floor(Math.random() * board[0].length);
        if(board[row][col]!==-1){
            board[row][col]=-1;
        }else{
            i-=1;
        }
    }
}

window.oncontextmenu = function (){
    //disable right click in browser
    return false;
};


function placeFlag() {
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.addEventListener('contextmenu', function () {
            let includes = false;
            for (let cls of cell.classList) {
                if (cls === 'flag') includes = true;
            }
            if (includes) {
                cell.innerHTML = "0";
            } else {
                cell.innerHTML = '<i class="fas fa-flag flag"></i>';
            }
            cell.classList.toggle('flag');

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
            gameCell.classList.add("known");
            gameCell.classList.remove("unknown");
            if (board[row][col] === -1) {
                gameCell.innerHTML = "<i class=\"fas fa-bomb\"></i>";
            } else {
                gameCell.textContent = board[row][col];
            }
        });
    }
}


function setCellNumbers(board){

    for(let i = 1; i < board.length -1; i++){
        for(let j = 1; j < board[0].length -1; j++){
            console.log(board[i][j]);

            if(board[i][j] === -1){

                board[i-1][j-1] += 1;
                board[i-1][j] += 1;
                board[i-1][j+1] += 1;

                board[i][j-1] += 1;
                board[i][j+1] += 1;

                board[i+1][j-1] += 1;
                board[i+1][j] += 1;
                board[i+1][j+1] += 1;
            }
        }
    }
}


main();