function main() {
    let board = Array(12).fill().map(() => Array(12).fill(0));
    placeMines(10, board);






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


main();