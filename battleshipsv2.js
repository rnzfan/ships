const readlineSync = require('readline-sync'); // npm i readline-sync

const boardLength = 8;
const numOfShips = 2;
const numOfGuesses = 20;

/* Generate the battleships */
function generateShips() { 
  const ships = [];
  do {
    let x, y;
    x = Math.floor(Math.random() * boardLength) + 1;
    y = Math.floor(Math.random() * boardLength) + 1;
    if (!ships.some((ship) => ship.x == x && ship.y == y)) {
      ships.push({x: x, y: y});
    }
  } while (ships.length < numOfShips);
  return ships;
}

function runGame() {

  const ships = generateShips();

  console.log("\n - Welcome to the Game of Battleships - \n");
  console.log(`You got ${numOfGuesses} chances to remove ${numOfShips} battleships on a board of ${boardLength} by ${boardLength} cells!\n`);
  
  let numOfGuessesLeft = numOfGuesses;
  while (ships.length > 0 && numOfGuessesLeft > 0) {
    let guess = readlineSync.question(`Enter a coordinate:${numOfGuessesLeft == numOfGuesses ? '(for example 3,5)': ''} `); //readlineSync already trimmed the whitespace
    
    /* Check if the user input is valid */
    let regex = /^\d+,\d+$/;
    if (!(regex.test(guess))) {
      console.log("Please enter the coordinate with two numbers separated by a Comma (for example 3,5)!");
      continue;
    }
    let guessArr = guess.split(',').map((strNum) => Number(strNum));
    if (guessArr[0] < 1 || guessArr[0] > boardLength || guessArr[1] < 1 || guessArr[1] > boardLength) {
      console.log(`Your guess was out of board! The coordinate's numbers must between 1 and ${boardLength} (inclusive).`);
      continue;
    }
  
    /* An array to store the distance information between player's guess and battleships */
    let distanceArr = ships.map((ship) => Math.abs(ship.x-guessArr[0])+Math.abs(ship.y-guessArr[1]));
  
    /* Different cases upon comparing the player's guess */
    if (distanceArr.some((distance) => distance == 0)) {
      console.log(`Nice! Your guess was correct, Battleship (${ships[distanceArr.indexOf(0)].x}, ${ships[distanceArr.indexOf(0)].y}) was removed!`);
      ships.splice(distanceArr.indexOf(0), 1);
    } else if (distanceArr.some((distance) => distance == 1 || distance == 2)) {
      console.log("HOT! (1 or 2 cells away)");
    } else if (distanceArr.some((distance) => distance == 3 || distance == 4)) {
      console.log("WARM! (3 or 4 cells away)");
    } else {
      console.log("COLD! Too far away");
    }
  
    /* Report the number of guesses left to player in each round of guess */
    numOfGuessesLeft--;
    console.log(`There ${numOfGuessesLeft>1 ? `are ${numOfGuessesLeft} guesses`: `is ${numOfGuessesLeft} guess`} left.`);
  }
  
  /* Decide won or lost */
  if (ships.length == 0) {
    console.log("All Battleships were removed, You won!");
  } else {
    console.log("All Guesses were used, You lost!");
  }

}

/* The game runs */
runGame();









