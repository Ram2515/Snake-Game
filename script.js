//Game Constants & Varible

let inputdir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSonund = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 6;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

// Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 <  1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollied(snake){
    // If You Bump Into YourSelf
    for ( let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
            
    }
    // If You Bump Into The Wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){

    // Part 1: Updating the Snake Array And Food

    if(isCollied(snakeArr)){
        gameOverSonund.play();
        musicSound.pause();
        inputdir = {x: 0, y: 0};
        alert("Game Over... Press Any Key Play Again!");
        snakeArr =[{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // If You Have Eaten The Food, Increment Score And Regenerate The Food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: " + highscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving The Snake

    for (let i = snakeArr.length -2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;
    musicSound.play();

    // Part 2: Display the Snake And Food
    //Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}


//Main Logic Starts Here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: " + highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputdir = {x: 0, y: 1} // Start The Game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;

        default:
                break;
    }
});