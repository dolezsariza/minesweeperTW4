function main() {
    let board = Array(12).fill().map(() => Array(12).fill(0));
    placeMines(10, board);
    showCellContent(board)





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
    console.log(board);
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

main();