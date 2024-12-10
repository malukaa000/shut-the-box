//buttons and other as variables
const rollBtn = document.querySelector("#roll-btn");
const playBtn = document.querySelector("#play-btn");
const indivBtn = document.querySelector("#individual-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const againBtn = document.querySelector("#again-btn");
//other elements as variables
const tableBody = document.querySelector("#body");
const roundCounter = document.querySelector("#round");
const playerTurn = document.querySelector("#player");
const versus = document.querySelector("#versus");
const board = document.querySelector('#board');
const scoreboard = document.querySelector('#scoreboard');
const winners = document.querySelector('#winners');
const inputs = document.querySelector('#input-area');
const alerts = document.querySelector('#alert-area');
//dice as variables
const firstDice = document.querySelector("#first-dice");
const secondDice = document.querySelector("#second-dice");
//player inputs as variables
const playerOne = document.querySelector('#player1');
const playerTwo = document.querySelector('#player2');
//boxes array
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let round = 1;
let activePlayer;
let dice1;
let dice2;
let playerOnePts = 0;
let playerTwoPts = 0;

//event listeners
//play button
playBtn.addEventListener('click', function(){
if (playerOne.value.trim() != "" && playerTwo.value.trim() != ""){
    const scoreheadOne = document.querySelector('#p1');
    const scoreheadTwo = document.querySelector('#p2');
    for (let i = 1; i  < boxes.length; i++){
        boxes[i] = document.querySelector(`#c${i}`);
    }

    roundCounter.textContent = "Round 1";
    versus.textContent = playerOne.value + " vs. " + playerTwo.value;
    playerTurn.textContent = playerOne.value +"'s turn";
    scoreheadOne.textContent = playerOne.value;
    scoreheadTwo.textContent = playerTwo.value;
    activePlayer = 1;

    inputs.style.display = 'none';
    board.style.display = 'block';
    scoreboard.style.display = 'flex';
    alerts.style.display = 'none';
    alerts.textContent = "";
    winners.style.display = 'none';

    indivBtn.disabled = true;
    endBtn.disabled = true;
    sumBtn.disabled= true;
 } else {
    playerOne.focus();
    alerts.textContent = "You must enter names :)"
 }
});

//roll button
rollBtn.addEventListener('click', function(){
    rollBtn.disabled = true;
    dice1 = rollDice();
    dice2 = rollDice();

    firstDice.className = `bi bi-dice-${dice1}`;
    secondDice.className = `bi bi-dice-${dice2}`;

    if(dice1 === dice2 || boxes[dice1] === "X" || boxes[dice2] === "X"){
        indivBtn.disabled = true;
    } else {
        indivBtn.disabled = false;
    }
    if (dice1 + dice2 > 9 || boxes[dice1+dice2] === "X"){
        sumBtn.disabled = true;
    } else {
        sumBtn.disabled = false;
    }
    if (indivBtn.disabled && sumBtn.disabled){
        endBtn.disabled = false;
    }
});

//individual button
indivBtn.addEventListener('click', function(){
    shut(dice1);
    shut(dice2);
    boxes[0] = boxes[0] + dice1 + dice2;
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

//sum button
sumBtn.addEventListener('click', function(){
    shut(dice1+dice2);
    boxes[0] = boxes[0] + dice1 + dice2;
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

//end button
endBtn.addEventListener('click', function(){
    if (activePlayer === 1){
        playerOnePts = playerOnePts + 45 - boxes[0];
        tableBody.insertAdjacentElement('beforeend', buildRow(round, playerOnePts));
        activePlayer = 2;
        playerTurn.textContent = playerTwo.value + "'s turn";
    } else if (activePlayer === 2){
        playerTwoPts = playerTwoPts + 45 - boxes[0];
        const parentRow = document.querySelector(`#Round${round}`);
        const twoPoints = parentRow.querySelector('#p2-points');
        twoPoints.textContent = playerTwoPts;
        activePlayer = 1;
        round++;
        roundCounter.textContent = "Round " + round;
        playerTurn.textContent = playerOne.value + "'s turn";
    }
    resetBoard();
    if (round > 5){
        gameOver();
    }
});

//again button
againBtn.addEventListener('click', function(){
    inputs.style.display = 'flex';
    scoreboard.style.display = 'none';
    winners.style.display = 'none';
    againBtn.style.display = 'none';
    playerOne.value = "";
    playerTwo.value = "";
    round = 1;
    playerOnePts = 0;
    playerTwoPts = 0;
    tableBody.innerHTML = "";
    alerts.textContent = "";
    alerts.style.display = 'flex';
});

//other functions
//rolls the dice
function rollDice(){
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    return diceNumber;
}

//shuts a box
function shut(boxNumber){
    boxes[boxNumber].classList.add("shut");
    boxes[boxNumber].textContent = "X";
    boxes[boxNumber] = "X";
}

//builds rows in the scorecard
function buildRow(r, playerPoints){
    const row = document.createElement("tr");
    row.id = "Round" + r;
    const roundNum = document.createElement('th');
    roundNum.textContent = "Round " + r;
    const p1Points = document.createElement('td');
    p1Points.textContent = playerPoints;
    const p2Points = document.createElement('td');
    p2Points.id = "p2-points";
    row.insertAdjacentElement('beforeend', roundNum);
    row.insertAdjacentElement('beforeend', p1Points);
    row.insertAdjacentElement('beforeend', p2Points);
    return row;

}

//resets the board after each player plays
function resetBoard(){
    boxes.fill(0);
    for (let i = 1; i  < boxes.length; i++){
        boxes[i] = document.querySelector(`#c${i}`);
        boxes[i].textContent = i;
        boxes[i].classList.remove("shut");
    }
    endBtn.disabled = true;
    rollBtn.disabled = false;
}

//ends the game
function gameOver(){
    board.style.display = 'none';
    winners.style.display = 'flex';
    againBtn.style.display = 'block';
    const winnerDisplay = document.querySelector('#winner');

    if (playerOnePts > playerTwoPts) {
        winnerDisplay.textContent = playerTwo.value + " wins with a score of " + playerTwoPts + "! " + playerOne.value + " has " + playerOnePts + " points.";
    } else if (playerOnePts < playerTwoPts){
        winnerDisplay.textContent = playerOne.value + " wins with a score of " + playerOnePts + "! " + playerTwo.value + " has " + playerTwoPts + " points.";
    } else {
        winnerDisplay.textContent = "You tied!";
    }
}
