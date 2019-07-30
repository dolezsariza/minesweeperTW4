function main() {
    let board = Array(12).fill().map(() => Array(12).fill(0));
    placeMines(25, board);
    showCellContent(board)
    setCellNumbers(board);
    let count = 0;

    for(let i = 0; i < board.length; ++i) {
        for (let j = 0; j < board[0].length; j++) {

            if (board[i][j] == -1)
                count++;
        }
    }
    console.log(board);
    console.log(count);
    placeFlag();
}

function placeMines(mineNumber, board){
    let i = 0;
    while(i !== mineNumber){
        let row = Math.floor(Math.random() * board.length);
        let col = Math.floor(Math.random() * board[0].length);
        if(board[row][col]!==-1){
            board[row][col]=-1;
            i++;
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
            if (cell.classList.contains("known")) {
                console.log("Cell already shown");
            } else {
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
            }
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
            /*if (gameCell.classList.contains("flag")) {
                console.log("it's a flag");
            } else {*/
                if (board[row][col] === -1) {
                    gameCell.innerHTML = "<i class=\"fas fa-bomb\"></i>";
                } else {
                    gameCell.textContent = board[row][col];
                }
            //}
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


main();