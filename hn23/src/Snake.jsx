/* eslint-disable no-unused-vars */
import React, { Component, useState, useEffect } from 'react';
import { EventEmitter } from './EventEmitter';
import useSound from 'use-sound';
import glitchSound from './glitch.mp3';
import appleSound from './apple.mp3';
import powerOnSound from './powerOn.mp3';

import './index.css';

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addVec2(otherVec) {
        this.x += otherVec.x;
        this.y += otherVec.y;
    }

}

class Snake extends EventEmitter{
    constructor(terminalText) {
        super();
        this.terminalText = terminalText;
        if (terminalText === undefined){
            this.terminalText = `fjuehfuehufhufuehfehufheufueufhhfeuhfuheufh
fjuehfueufheuhfuehfuehufehufhuehfuefhueufeufhuefuehfuehufue
fehufhuehfuehufheufuehfeufhueufheuf`;
        }

        this.displayChoice = 0;// 0 - Menu 1 - Game 2 - Retry Screen
        this.emit('changeMenu', "");
        this.getMenuView();
        this.getRetryMenuView();
    }

    fillLine(stringArray) {
        let longest = 0;
        for (let i = 0; i < stringArray.length; i++) {
            if (longest < stringArray[i].length) {
                longest = stringArray[i].length;
            }
        }
        for (let i = 0; i < stringArray.length; i++) {
            stringArray[i] = stringArray[i].padEnd(longest, ' ');
        }
        return stringArray;
    }

    genASCIIOutput() {
        if (this.displayChoice === 0) {
            return [this.MenuOutputString, "", ""];
        } else if (this.displayChoice === 1) {
            return this.getGameView();
        } else if (this.displayChoice === 2) {
            return [this.RetryOutputString, "", ""];
        }
    }

    getMenuView() {
        let asciiArtMenu = this.terminalText + '\n' + `'-------------------------------'
|  Snake - Main Menu            |
| '---------------------------' |
| |                           | |
| |                           | |
| |                           | |
| |  [ 1 PLAY ]   [ 2 QUIT ]  | |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| '---------------------------' |
|                               |
'-------------------------------'`
        let menuArray = asciiArtMenu.split('\n');
        menuArray = this.fillLine(menuArray);
        this.MenuOutputString = "";
        for (let i = 0; i < menuArray.length; i++) {
            this.MenuOutputString += menuArray[i] + "\n";
        }
    }

    getRetryMenuView() {
        let asciiArtRetryMenu = this.terminalText + '\n' + `'-------------------------------'
|  Snake - RETRY Menu           |
| '---------------------------' |
| |                           | |
| |                           | |
| |                           | |
| |  [ 1 RETRY ]  [ 2 QUIT ]  | |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| '---------------------------' |
|                               |
'-------------------------------'`;
        let menuArray =  asciiArtRetryMenu.split('\n');
        menuArray = this.fillLine(menuArray);
        this.RetryOutputString = "";
        for (let i = 0; i < menuArray.length; i++) {
            this.RetryOutputString += menuArray[i] + "\n";
        }
    }

    getGameView() {
        let stringOutput1 = "";
        let stringOutput2 = "";
        let stringOutput3 = "";
        for (let y = 0; y < this.initialBoard.length; y++) {
            for (let x = 0; x < this.initialBoard[y].length; x++) {
                if (y === this.goalStart.y && x < this.goalStart.x + this.goalLength && x >= this.goalStart.x) {
                    stringOutput2 += this.initialBoard[y][x];
                } else {
                    if (stringOutput2 === "") {
                        stringOutput1 += this.initialBoard[y][x];
                    } else {
                        stringOutput3 += this.initialBoard[y][x];
                    }
                }
            }
            if (stringOutput2 === "") {
                stringOutput1 += "\n";
            } else {
                stringOutput3 += "\n";
            }
        }
        return [stringOutput1, stringOutput2, stringOutput3];
    }

    eat() {
        this.emit('appleEaten', "" + this.body[0].x + ", " + this.body[0].y );
        this.body[this.bodyLength] = new Vec2(0, 0);
        this.body[this.bodyLength].addVec2(this.body[this.bodyLength - 1]);
        this.bodyLength++;
    }

    move() {
        if (this.displayChoice !== 1) {
            return;
        }
        let move = new Vec2(0, 0);
        switch (this.direction) {
            case 'right':
                move.x++;
                break;
            case 'left':
                move.x--;
                break;
            case 'up':
                move.y--;
                break;
            case 'down':
                move.y++;
                break;
            default:
                break;
        }
        if (!this.isValidMove(move)) {
            this.handleGameOver();
            return;
        }

        this.initialBoard[this.body[this.bodyLength - 1].y][this.body[this.bodyLength - 1].x] = ' ';

        if (this.bodyLength !== 1) {
            for (let i = this.bodyLength - 1; i >= 1; i--) {
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
        }

        this.body[0].addVec2(move);
        this.initialBoard[this.body[0].y][this.body[0].x] = 'H';
        this.initialBoard[this.body[1].y][this.body[1].x] = 'S';

        this.checkGlitch();

    }

    checkGlitch() {
        if (this.bodyLength === 8 && this.glitched === false) {
            this.initialBoard[9][26] = ' ';
            this.initialBoard[9][27] = ' ';
            this.initialBoard[9][28] = ' ';
            this.initialBoard[11][26] = ' ';
            this.initialBoard[11][27] = ' ';
            this.initialBoard[11][28] = ' ';
            this.emit('glitchWall', "");
            this.glitched = true;
        }
    }

    spawnApple() {
        for (let i = 0; i < 1000; i++) {
            let randomRow = Math.floor(Math.random() * this.terminalText.split('\n').length) + 13;
            let randomCol = Math.floor(Math.random() * 17) + 3;
            if (this.initialBoard[randomRow][randomCol] === ' ') {
                this.initialBoard[randomRow][randomCol] = 'A';
                this.applePos.x = randomCol;
                this.applePos.y = randomRow;
                return;
            }
        }
    }

    isValidMove(move) {
        let head = { ...this.body[0] };
        head.addVec2 = this.body[0].addVec2;
        head.addVec2(move);
        console.log(this.initialBoard);
        if (head.x < 0 || head.x >= this.initialBoard[0].length || head.y < 0 || head.y >= this.initialBoard.length) {
            return false;
        }
        if (head.y === this.goalStart.y) {
            if (head.x < this.goalStart.x + this.goalLength && head.x >= this.goalStart.x) {
                this.emit('goalReached', "");
                console.log("POWER BACK ON");
            }
        }
        
        for (let y = 0; y < this.initialBoard.length;y++) {
            for (let x = 0; x < this.initialBoard[y].length; x++) {
                let tile = this.initialBoard[y][x];
                if (head.x === x && head.y === y) {
                    if (tile === '|' || tile === '-' || tile === "'" || tile === "S") {
                        return false;
                    }
                    else if (tile === 'A') {
                        this.eat();
                        if (this.applePos.x === x && this.applePos.y === y) {
                            this.spawnApple();
                        }
                    }
                }
                
            }
        }
        return true;
    }

    changeDirection(newDirection) {
        if (this.direction === 'up' || this.direction === 'down') {
            if (newDirection === 'left' || newDirection === 'right') {
                this.direction = newDirection;
            }
        } else {
            if (newDirection === 'up' || newDirection === 'down') {
                this.direction = newDirection;
            }
        }
        
    }

    startGame() {
        this.displayChoice = 1;
        this.emit('changeMenu', "");
        this.glitched = false;
        let asciiArtGame = this.terminalText + '\n' + `'-------------------------------'
|  Snake - Game View            |
| '---------------------------' |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| |                           | |
| '---------------------------' |
|                               |
'-------------------------------'`;

        this.initialBoard = asciiArtGame.split('\n');
        this.initialBoard = this.fillLine(this.initialBoard);
        this.initialBoard = this.initialBoard.map(row => row.split(''));

        this.initialBoard[3][43] = "P";
        this.initialBoard[3][44] = "O";
        this.initialBoard[3][45] = "W";
        this.initialBoard[3][46] = "E";
        this.initialBoard[3][47] = "R";

        this.goalStart = new Vec2( 43, 3 );
        this.goalLength = 5;

        this.direction = 'up'; // Initial direction (right, left, up, down)
        this.body = [];
        let startingPos = this.initialBoard.length - (this.terminalText.split('\n').length + 1);
        console.log(startingPos);
        this.body[0] = new Vec2(7, startingPos - 2);
        this.body[1] = new Vec2(7, startingPos - 1);
        this.body[2] = new Vec2(7, startingPos);
        this.bodyLength = 3;
        this.initialBoard[startingPos - 2][7] = "H";
        this.initialBoard[startingPos - 1][7] = "S";
        this.initialBoard[startingPos][7] = "S";
        this.applePos = new Vec2(-1, -1);
        this.spawnApple();
    }

    handleGameOver() {
        this.displayChoice = 2;
        this.emit('changeMenu', "");
    }

}
function SnakeGame(terminalText) {
    const [snakeString1, setSnakeString1] = useState('');
    const [snakeString2, setSnakeString2] = useState('');
    const [powerText, setPowerText] = useState('');
    const [snake, setSnake] = useState(new Snake(terminalText));
    const [isGlitching, setGlitching] = useState(false);

    // Define a function to call the snake method
    const callSnakeMethod = () => {
        snake.move();
        let outputs = snake.genASCIIOutput();
        setSnakeString1(outputs[0]);
        setPowerText(outputs[1]);
        setSnakeString2(outputs[2]);
    };

    const [playGlitchSound] = useSound(glitchSound);
    const [playAppleSound] = useSound(glitchSound);
    const [playPowerOnSound] = useSound(glitchSound);

    const handleGlitchSound = () => {
        playGlitchSound();
    };

    const handleAppleSound = () => {
        playAppleSound();
    };

    const handlePowerOnSound = () => {
        playPowerOnSound();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (snake.displayChoice === 1) {
                // Check the key code and update the snake's direction accordingly
                switch (event.key) {
                    case 'ArrowUp':
                    case 'w':
                        snake.changeDirection('up');
                        break;
                    case 'ArrowDown':
                    case 's':
                        snake.changeDirection('down');
                        break;
                    case 'ArrowLeft':
                    case 'a':
                        snake.changeDirection('left');
                        break;
                    case 'ArrowRight':
                    case 'd':
                        snake.changeDirection('right');
                        break;
                    default:
                        // Handle other keys, if needed
                        break;
                }
            } else {
                switch (event.key) {
                    case '1':
                        snake.startGame();
                        break;
                    case '2':
                        break;
                    default:
                        // Handle other keys, if needed
                        break;
                }
            }


        };
        const triggerGlitch = () => {
            setGlitching(true);

            // Reset the glitch effect after 1 second
            setTimeout(() => {
                setGlitching(false);
            }, 1000);
        }

            snake.on('appleEaten', (data) => {
                console.log('Snake ate an apple at position', data.position);
                handleAppleSound();
                // Add your logic to handle the event, e.g., increment the score or perform other actions.
            });

            snake.on('glitchWall', (data) => {
                console.log('Wall has glitch');
                triggerGlitch();
                handleGlitchSound()
            });

            snake.on('endReached', (data) => {
                console.log('end Goal reached power restored');
                handlePowerOnSound();
                // Add your logic to handle the event, e.g., increment the score or perform other actions.
            });

            // Create an interval that calls the method every second
            const intervalId = setInterval(callSnakeMethod, 250); // 1000 milliseconds = 1 second
            // Add a keydown event listener
            document.addEventListener('keydown', handleKeyDown);

            // Clean up the interval and eventlistoner when the component unmounts
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                clearInterval(intervalId);
            };
    }, [] );

    return (
        <div type="ASCIIart" className={`glitchShake-container ${isGlitching ? 'glitchShake' : ''}`}>
            {snakeString1}<span id="powerWord">{powerText}</span>{snakeString2}
        </div>
        
    );
}

export default SnakeGame;