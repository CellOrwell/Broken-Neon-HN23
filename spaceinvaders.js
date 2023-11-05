let menuBox = `
'-------------------------------'
|  Space Invaders - Main Menu   |
| '---------------------------' |
| |                           | |
| |      SPACE INVASION       | |
| |                           | |
| |        [ 1 PLAY ]         | |
| |                           | |
| |                           | |
| |                           | |
| |       ©2023 Nabla         | |
| '---------------------------' |
|                               |
'-------------------------------' `;

let mainBox = [`
'-------------------------------'
|  Space Invaders - Play Menu   |
| '---------------------------' |
| |`                        ,`| |
| |`                        ,`| |
| |`                        ,`| |
| |`                        ,`| |
| |`                        ,`| |
| |`                        ,`| |
| |`                        ,`| |
| |`                        ,`| |
| '---------------------------' |
|                               |
'-------------------------------' `];

let startArray = [
   ` `,` `,` `,` `,` `,`A`,` `,` `,` `,`A`,` `,` `,` `,`A`,` `,` `,` `,`A`,` `,` `,` `,`A`,` `,` `,` `,` `,` `,
   ` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,
   ` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,
   ` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,
   ` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,
   ` `,` `,` `,` `,`-`,`-`,`-`,`-`,`-`,` `,` `,` `,` `,` `,` `,` `,` `,` `,`-`,`-`,`-`,`-`,`-`,` `,` `,` `,` `,
   ` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,
   ` `,` `,` `,` `,`Y`,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,` `,
];


const x = 27, y=8;
let playerX = 4, playerY = 7, alienY = 0;

function moveAllA() {
    if([alienY, 0] == "A" || startArray[alienY, x-1] == "A") {
        return 0;
    }
}

// Move Verifications

function canMoveLeft(posX) {
    if (posX == 0) {
        return false;
    }
    return true;
}

function canMoveRight(posX) {
    if (posX == x - 1) {
        return false;
    }
    return true;
}

function canMoveUp(posY) {
    if (posY == 0) {
        return false;
    }
    return true;
}

function canMoveDown(posY) {
    if (posY == y - 1) {
        return false;
    }
    return true;
}

// Move Commands

function moveLeft(letter, posX, posY) {
    try{
        if(startArray[posY, posX-1] == " ") {
            startArray[posY, posX-1] == letter;
            startArray[posY, posX] == " ";
        }
    } catch (err) {
        console.log("Can't move here");
    }
}

function moveRight(letter, posX, posY) {
    try{
        if(startArray[posY, posX+1] == " ") {
            startArray[posY, posX+1] == letter;
            startArray[posY, posX] == " ";
        }
    } catch (err) {
        console.log("Can't move here");
    }
}

function moveDown(letter, posX, posY) {
    try{
        if(startArray[posY+1, posX] == " ") {
            startArray[posY+1, posX] == letter;
            startArray[posY, posX] == " ";
        }
    } catch (err) {
        console.log("Can't move here");
    }
}

function moveUp(letter, posX, posY) {
    try{
        if(startArray[posY-1, posX] == " ") {
            startArray[posY-1, posX] == letter;
            startArray[posY, posX] == " ";
        }
    } catch (err) {
        console.log("Can't move here");
    }
}

function drawBoard() {
    for(let i = 0; i < y; i++) {
        let string = "";
        string += mainBox[i];
        for(let j = 0; j < x; j++) {
            string += startArray[i, j];
        }
    }
}

drawBoard();

// function mainMenu() {

// }