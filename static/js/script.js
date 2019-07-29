function main() {
    let board = Array(12).fill().map(() => Array(12).fill(0));
    placeMines(10, board);
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells){
        cell.addEventListener('contextmenu',function(){
            let includes = false;
            for (let cls of cell.classList){
                if (cls === 'flag')includes = true;
            }
            if(includes){
                cell.innerHTML = "0";
            }else{
                cell.innerHTML = '<i class="fas fa-flag flag"></i>';
            }
            cell.classList.toggle('flag');

        }, false);
    }


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
}


main();