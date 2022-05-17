const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
function Title() {
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('MATH GAME', canvas.width / 2, canvas.height / 2 - canvas.height / 4);
}

let mode = "mainMenu";
let gameOver = false;
let score = 0;
const playfield = [];
const playfieldNum = [];
let numbers = [];
let TimesTableNum = getRandomInt(1,9);
let TimesTableNum2 = getRandomInt(1,9);

let count = 0;
const rowC = 17;
const colC = 8;
let rAF = null;
mainMenu()

function mainMenu() {
    if (gameOver) {
        reset();

    }
    //const path4 = new Path2D()
    //path4.rect(0, 0, 280, 600)


    context.clearRect(0,0,canvas.width,canvas.height);
    /*path4.closePath()
    context.fillStyle = "#FFFFFF"
    context.fillStyle = "rgba(0,0,0,1)"
    context.fill(path4)
    context.lineWidth = 2
    context.strokeStyle = "#000000"
    context.stroke(path4)*/


    const path = new Path2D()
    path.rect(85, 330, 110, 40)

    path.closePath()



    const path2 = new Path2D()
    path2.rect(85,380,110,40)
    path2.closePath()

    const path3 = new Path2D()
    path3.rect(85,430,110,40)
    path3.closePath()

    const path7 = new Path2D()
    path7.rect(85,280,110,40)
    path7.closePath()

    context.fillStyle = "rgba(0,200,255,0.65)"
    context.fill(path7)

//draw your shape data to the context
    context.fillStyle = "rgba(0,255,100,0.5)"
    context.fill(path)




    context.fillStyle = "rgba(225,0,200,0.5)"
    context.fill(path2)

    context.fillStyle = "rgba(23,32,245,0.5)"
    context.fill(path3)

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '13px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Addition', 140, 350);



    context.fillText('Multiplication', 140, 400);


    context.fillText('Algebra', 140, 450);
    //context.fillStyle = 'black';
    context.fillText('Instructions', 140, 300);
    Title();


    console.log("fehbjjw")
    document.addEventListener("click",  function button(e) {
        const XY = getXY(canvas, e)
        //use the shape data to determine if there is a collision
        if(context.isPointInPath(path, XY.x, XY.y)) {
            // Do Something with the click
            //alert("clicked in rectangle")
            //console.log("hgfed")
            mode = "addition"
            console.log("bsgf")
            populateEmptyAdd();
            gameOver = false;
            rAF = requestAnimationFrame(loop);

        }
        if(context.isPointInPath(path2, XY.x, XY.y)) {
            // Do Something with the click
            //alert("clicked in rectangle")
            mode = "multiplication"
            populateEmptyMultiple();
            gameOver = false;
            rAF = requestAnimationFrame(loop);
        }
        if(context.isPointInPath(path3, XY.x, XY.y)) {
            // Do Something with the click
            //alert("clicked in rectangle")
            mode = "algebra"
            populateEmptyAlgebra();
            gameOver = false;
            rAF = requestAnimationFrame(loop);
        }
        if (context.isPointInPath(path7, XY.x, XY.y)){
            instructions();
        }
        document.removeEventListener("click",button, false);
    }, false)




}
function instructions(){
    context.clearRect(0,0,canvas.width,canvas.height);
    /*context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '13px monospace';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText('There are three modes to this game, addition, multiplication and algebra. There are numbers along the side of each row.' +
        ' In each game mode there are falling blocks with numbers that you can move with the left and right arrow keys. To make the block fall faster press the down arrow key.' +
        ' Clear rows to gain points. ' +
        'The game ends when the stacked blocks reach the top of the screen', 30, 100);
    context.fillText('Addition: To clear rows you need to pair numbers up so that they add to make the number' +
        'on the side. The two numbers must be beside each other and in the same row to clear it.', 30, 200);
    context.fillText('Multiplication: To clear rows pair numbers up so that they multiply to make the number on the side. ' +
        'The two numbers must be beside each other and in the same row to clear it.', 30, 300);
    context.fillText('Algebra: To clear rows make both sides of the equation equal. x will equal the row number.', 30, 400);*/

    wrapText('There are three modes to this game, addition, multiplication and algebra.' +
        '                          There are numbers along the side of each row.' +
        '                                      ' +
        ' In each game mode there are falling blocks with numbers that you can move with the left and right arrow keys.' +
        '                              To make the block fall faster press the down arrow key.' +
        '                                                   Clear rows to gain points. ' +
        '                            The game ends when the stacked blocks reach the top of the screen.' +
        '                                     Click anywhere to continue.', 20, 60, 250,16, 'monospace');

    document.addEventListener('click', function a(e){
        context.clearRect(0,0,canvas.width,canvas.height);
        wrapText('Addition: To clear rows you need to pair numbers up so that they add to make the number' +
            ' on the side. ' +
            '                                     The two numbers must be beside each other and in the same row to clear it. ' +
            '                                 ' +
            'Multiplication: To clear rows pair numbers up so that they multiply to make the number on the side.' +
            '                                      The two numbers must be beside each other and in the same row to clear it.' +
            '                                    ' +
            'Algebra: To clear rows make both sides of the equation equal. x will equal the row number.     ' +
            '                                              Click anywhere to continue.', 20, 60, 260, 16, 'monospace')
        document.removeEventListener('click',a,false)
        document.addEventListener('click', function a(e){
            mainMenu()
            document.removeEventListener('click',a,false)
        }, false)
    }, false)





}

function wrapText(text, x, y, maxWidth, fontSize, fontFace){
    let firstY=y;
    let words = text.split(' ');
    let line = '';
    let lineHeight=fontSize*1.286; // a good approx for 10-18px sizes

    context.font=fontSize+"px "+fontFace;
    context.textAlign = 'left';
    context.textBaseline='top';

    for(let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = context.measureText(testLine);
        let testWidth = metrics.width;
        if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            if(n<words.length-1){
                line = words[n] + ' ';
                y += lineHeight;
            }
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}



function reset() {
    score = 0;

}

//create your shape data in a Path2D object
function getXY(canvas, event){ //adjust mouse click to canvas coordinates
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    const x = event.clientX - rect.left
    return {x:x, y:y}
}





// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a new tetromino sequence
// @see https://tetris.fandom.com/wiki/Random_Generator
function generateSequence() {
    const sequence = [ 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (sequence.length) {
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        tetrominoSequence.push(name);
    }
}

function getNextTetromino() {

    switch (mode){
        case "addition" :
            return getNextTetroAdd();

        case "multiplication":
            return getNextTetroMultiple();

        case "algebra":
            return getNextTetroAlgebra();

    }
}

function getNextTetroAdd() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }


    const name = tetrominoSequence.pop();
    //const matrix = tetrominos[name];

    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2  ;



    // I starts on row 21 (-1), all others start on row 22 (-2)
    const row = 3;

    const num = getRandomInt(0, 9);

    return {
        name: name,      // name of the piece (L, O, etc.)
        //matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col,         // current col
        num: num
    };
}

function getNextTetroMultiple() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }

    const name = tetrominoSequence.pop();
    //const matrix = tetrominos[name];

    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2  ;

    // I starts on row 21 (-1), all others start on row 22 (-2)
    const row = 3;
    let num;
    if (getRandomInt(0,2)===1) {
        if (getRandomInt(0,1)===1){
            num = TimesTableNum;
        } else {
            num = TimesTableNum2;
        }
    } else {

        num = getRandomInt(0, 9);

    }


    return {
        name: name,      // name of the piece (L, O, etc.)
        //matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col,         // current col
        num: num
    };
}

function getNextTetroAlgebra() {
    if (tetrominoSequence.length === 0) {
        generateSequence();
    }

    const name = tetrominoSequence.pop();
    //const matrix = tetrominos[name];


    // I and O start centered, all others start in left-middle
    const col = playfield[0].length / 2 -1 ;

    // I starts on row 21 (-1), all others start on row 22 (-2)
    const row = 3;

    let num;
    let rand = getRandomInt(0,2);
    if (rand === 2){
        num = 'x'
    } /*else if (rand === 1){

            if (getRandomInt(0,1) === 1){
                num = '+';
            } else {
                num = '-';
            }
        }*/ else {
        num = getRandomInt(0, 9);
    }


    return {
        name: name,      // name of the piece (L, O, etc.)
        //matrix: matrix,  // the current rotation matrix
        row: row,        // current row (starts offscreen)
        col: col,         // current col
        num: num
    };
}

function isValidMove(cellRow, cellCol) {

   /*if (mode === "algebra") {
       if (cellCol ===4){

       }
       return !(cellCol < 1 ||
           cellCol >= playfield[0].length ||
           cellRow >= playfield.length ||
           // collides with another piece
           playfield[cellRow][cellCol] ||
           cellCol === 4);
   } else {*/
       return !(cellCol < 1 ||
           cellCol >= playfield[0].length ||
           cellRow >= playfield.length ||
           // collides with another piece
           playfield[cellRow][cellCol]);





}
function placeTetromino() {
    switch (mode){
        case "addition" :
            placeTetroAdd();
            break;
        case "multiplication":
            placeTetroMultiple();
            break;
        case "algebra":
            placeTetroAlgebra();
            break;
    }
}

// place the tetromino on the playfield
function placeTetroAdd() {

    // game over if piece has any part offscreen
    if (tetromino.row< 4) {
        return showGameOver();
    }

    playfield[tetromino.row][tetromino.col] = tetromino.name;
    playfieldNum[tetromino.row][tetromino.col] = tetromino.num;

    let thingy = 0;
    // check for line clears starting from the bottom and working our way up
    for (let row = 0; row < rowC; row++) {

        for (let col = 0; col < colC; col++) {
            if (playfieldNum[row][col] + playfieldNum[row][col+1] === numbers[row]) {

                score++;

                for (let r = row; r >= 0; r--) {
                    for (let c = 0; c < playfield[r].length; c++) {
                        playfield[r][c] = playfield[r-1][c];
                        playfieldNum[r][c] = playfieldNum[r-1][c];
                        numbers[r] = numbers[r-1]
                    }
                }
                numbers[-1] = getRandomInt(2,18);
            }
            if (playfield[row][col]){
                thingy++;

            }
            if (thingy === 6) {
                for (let c = 0; c < colC; c++) {
                    playfield[row][c] = 'd';
                }
            }
        }
        thingy = 0;
    }

    tetromino = tetrominoNext;
    tetrominoNext = getNextTetromino();
}
// place the tetromino on the playfield
function placeTetroMultiple() {

    // game over if piece has any part offscreen
    if (tetromino.row< 4) {
        return showGameOver();
    }

    playfield[tetromino.row][tetromino.col] = tetromino.name;
    playfieldNum[tetromino.row][tetromino.col] = tetromino.num;
    let thingy = 0;

    // check for line clears starting from the bottom and working our way up
    for (let row = 0; row < rowC; row++) {

        for (let col = 0; col < colC; col++) {
            if (playfieldNum[row][col] * playfieldNum[row][col+1] === numbers[row]) {

                score++;
                console.log(score);

                for (let r = row; r >= 0; r--) {
                    for (let c = 0; c < playfield[r].length; c++) {
                        playfield[r][c] = playfield[r-1][c];
                        playfieldNum[r][c] = playfieldNum[r-1][c];
                        numbers[r] = numbers[r-1]
                    }
                }
                if (getRandomInt(0,1)===1){
                    numbers[-1] = TimesTableNum*getRandomInt(0,9);
                } else {
                    numbers[-1] = TimesTableNum2*getRandomInt(0,9);
                }
            }
            if (playfield[row][col]){
                thingy++;

            }
            if (thingy === 6) {
                for (let c = 0; c < colC; c++) {
                    console.log("thgihsduoi");
                    playfield[row][c] = 'd';
                }
            }

        }
        thingy = 0;
    }
    tetromino = tetrominoNext;

    tetrominoNext = getNextTetromino();
}

function placeTetroAlgebra() {

    // game over if piece has any part offscreen
    if (tetromino.row< 4) {
        return showGameOver();
    }

    playfield[tetromino.row][tetromino.col] = tetromino.name;
    playfieldNum[tetromino.row][tetromino.col] = tetromino.num;

    let thingy = 0;

    let sum1 = 0;
    let sum2 = 0;
    // check for line clears starting from the bottom and working our way up
    for (let row = 0; row < rowC; row++) {
        let sum1 = parseEquation(row,3,1,0);
        let sum2 = parseEquation2(row,7,1,0);

        if ((sum1 === sum2) && (findSquares(row)===true)){

            score++;

            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r-1][c];
                    playfieldNum[r][c] = playfieldNum[r-1][c];
                    numbers[r] = numbers[r-1]
                }
            }
            numbers[-1] = getRandomInt(2,18);
        }
        for (let col = 0; col< colC; col++){
            if (playfield[row][col]){
                thingy++;

            }
        }




        console.log("sum1="+sum1);
        console.log("sum2="+sum2);




        thingy = 0;
    }

    tetromino = tetrominoNext;
    tetrominoNext = getNextTetromino();
}

function parseEquation (r, c, defaultNum, total){
    if (c>0){
        switch (playfieldNum[r][c]) {
            case "+"  :
                total = parseEquation(r,c-1,0, total) + total;
                return total;
            case "-" :
                total = parseEquation(r,c-1,0, total) - total;
                return total;
            case "x" :
                total = parseEquation(r,c-1,1 ,total)* numbers[r];
                return total;
            default :
                total = parseEquation(r, c-1,1 , total)* playfieldNum[r][c];
                return total;
        }


    } else {
        console.log("hgjbfejw");
        return defaultNum;
    }



}
function parseEquation2 (r, c, defaultNum, total){
    if (c>4){
        switch (playfieldNum[r][c]) {
            case "+"  :
                total = parseEquation2(r,c-1,0, total) + total;
                return total;
            case "-" :
                total = parseEquation2(r,c-1,0, total) - total;
                return total;
            case "x" :
                total = parseEquation2(r,c-1,1 ,total)* numbers[r];
                return total;
            default :
                total = parseEquation2(r, c-1,1 , total)* playfieldNum[r][c];
                return total;
        }


    } else {
        console.log("hgjbfejw");
        return defaultNum;
    }



}

function findSquares(r) {

    for (let col = 0; col<colC; col++){
        console.log(playfield[r][col]);
        if (playfield[r][col]) {
            return true;
        }
    }

    return false;
}

function showGameOver() {

    //cancelAnimationFrame(rAF);
    console.log("ghjohsd")
    gameOver = true;
    count = 0;
    context.fillStyle = 'black';
    context.globalAlpha = 0.75;
    context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '36px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);

    const path5 = new Path2D()
    path5.rect(canvas.width /2-100, canvas.height-100, 200, 50)
    path5.closePath()
    context.fillStyle = "#FFFFFF"
    context.fillStyle = "rgba(3,45,150,1)"
    context.fill(path5)

    context.globalAlpha = 1;
    context.fillStyle = 'white';
    context.font = '26px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('PLAY AGAIN', canvas.width / 2, canvas.height -75);

    document.addEventListener("click",  function button2(e) {
        document.removeEventListener("click", button2, false);
        const XY = getXY(canvas, e)
        //use the shape data to determine if there is a collision
        if (context.isPointInPath(path5, XY.x, XY.y)) {
            mainMenu();
        }


    }, false)

}


const grid = 35;
const tetrominoSequence = [];



// keep track of what is in every cell of the game using a 2d array
// tetris playfield is 10x20, with a few rows offscreen




// populate the empty state
function populateEmptyAdd () {
    for (let row = -2; row < rowC; row++) {
        playfield[row] = [];
        playfieldNum[row] = [];
        for (let col = 1; col < colC; col++) {
            playfield[row][col] = 0;
            playfieldNum[row][col] = -1000;
        }
    }



    for (let row = -2; row < rowC; row++) {
        //let col = 0;

        numbers[row] = getRandomInt(2,18);


    }
    tetrominoNext = getNextTetromino();
    tetromino = tetrominoNext;
    tetrominoNext = getNextTetromino();

}
function populateEmptyMultiple() {
    for (let row = -2; row < rowC; row++) {
        playfield[row] = [];
        playfieldNum[row] = [];
        for (let col = 1; col < colC; col++) {
            playfield[row][col] = 0;
            playfieldNum[row][col] = -1000;
        }
    }




    for (let row = -2; row < rowC; row++) {
        //let col = 0;
        if (getRandomInt(0,1)===1){
            numbers[row] = TimesTableNum*getRandomInt(0,9);
        } else {
            numbers[row] = TimesTableNum2*getRandomInt(0,9);
        }



    }
    tetrominoNext = getNextTetromino();
    tetromino = tetrominoNext;
    tetrominoNext = getNextTetromino();
}

function populateEmptyAlgebra() {
    for (let row = -2; row < rowC; row++) {
        playfield[row] = [];
        playfieldNum[row] = [];
        for (let col = 1; col < colC; col++) {
            playfield[row][col] = 0;
            playfieldNum[row][col] = 1;
        }
    }


    for (let row = -2; row < rowC; row++) {
        //let col = 0;

        numbers[row] = getRandomInt(2,18);


    }
    tetrominoNext = getNextTetromino();
    tetromino = tetrominoNext;
    tetrominoNext = getNextTetromino();
}
const colors = {
    //'I': 'cyan',
    'O': 'purple',
    'T': 'purple',
    'S': 'green',
    'Z': 'green',
    'J': 'blue',
    'L': 'blue'
};


let tetrominoNext = getNextTetromino();
let tetromino = tetrominoNext;
tetrominoNext = getNextTetromino();
  // keep track of the animation frame so we can cancel it


function loop() {
    if (!gameOver) {
        rAF = requestAnimationFrame(loop);
        context.clearRect(0,0,canvas.width,canvas.height);
        switch (mode){
            case "addition":
                const backgroundA = new Path2D()
                backgroundA.rect(0,0,canvas.width,canvas.height)
                context.fillStyle = "rgba(90,235,3,0.15)"
                context.fill(backgroundA)
                break;
            case "multiplication":
                const backgroundM = new Path2D()
                backgroundM.rect(0,0,canvas.width,canvas.height)
                context.fillStyle = "rgba(225,0,200,0.15)"
                context.fill(backgroundM)
                break;
            case "algebra":
                const backgroundAL = new Path2D()
                backgroundAL.rect(0,0,canvas.width,canvas.height)
                context.fillStyle = "rgba(23,32,245,0.15)"
                context.fill(backgroundAL)
                break;
        }



        // draw the playfield
        for (let row = 3; row < rowC; row++) {
            for (let col = 1; col < colC; col++) {
                if (playfield[row][col]) {
                    const name = playfield[row][col];
                    const num  = playfieldNum[row][col];
                    context.fillStyle = colors[name];

                    // drawing 1 px smaller than the grid creates a grid effect
                    context.fillRect(col * grid, row * grid, grid-1, grid-1);
                    context.fillStyle = 'white';
                    context.font = '36px monospace';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillText(num, col * grid + (grid/2), row * grid + (grid/2));



                }

            }
        }

        context.fillStyle = 'white';
        context.font = '30px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Score: '+score, 3*grid + (grid/2), (grid/2));

        for (let row = 3; row < rowC; row++) {
            let col = 0;


            context.fillStyle = 'white';
            context.font = '36px monospace';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(numbers[row], col * grid + (grid/2), row * grid + (grid/2));

        }
        if (mode === "algebra"){
            for (let row = 3; row < 17; row++) {
                let col = 4;


                context.fillStyle = 'white';
                context.font = '26px monospace';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText('=', col * grid + (grid/2), row * grid + (grid/2));

            }
        }

        if (tetrominoNext){

            context.fillStyle = colors[tetrominoNext.name];


            context.fillRect( 3 * grid,  grid, grid-1, grid-1);
            context.fillStyle = 'white';
            context.font = '36px monospace';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(tetrominoNext.num, 3 * grid + (grid/2), grid + (grid/2));
        }


        // draw the active tetromino
        if (tetromino) {
            // tetromino falls every 45 frames
            if (++count > 45) {
                tetromino.row++;
                count = 0;

                // place piece if it runs into anything
                if (!isValidMove(tetromino.row, tetromino.col)) {
                    tetromino.row--;
                    placeTetromino();
                }
            }

            context.fillStyle = colors[tetromino.name];


            context.fillRect( tetromino.col * grid,  tetromino.row * grid, grid-1, grid-1);
            context.fillStyle = 'white';
            context.font = '36px monospace';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(tetromino.num, tetromino.col * grid + (grid/2), tetromino.row * grid + (grid/2));


        }
    }


}


document.addEventListener('keydown', function(e) {
    if (gameOver) return;

    // left and right arrow keys (move)
    if (e.which === 37 || e.which === 39) {
        let col = e.which === 37
            ? tetromino.col - 1
            : tetromino.col + 1;

        if (isValidMove( tetromino.row, col)) {
            if (mode === "algebra" && col === 4) {
                col = e.which === 37
                    ? tetromino.col - 2
                    : tetromino.col + 2;
            }
            tetromino.col = col;
        }
    }

    // up arrow key (rotate)
    /*if (e.which === 38) {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove( tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }*/

    // down arrow key (drop)
    if(e.which === 40) {
        const row = tetromino.row + 1;

        if (!isValidMove( row, tetromino.col)) {
            tetromino.row = row - 1;

            placeTetromino();
            return;
        }

        tetromino.row = row;
    }
});

// start the game
//rAF = requestAnimationFrame(loop);