const FIELD_SIZE_X = 20; //СТРОКИ
const FIELD_SIZE_Y = 20; // СТОЛБЦЫ
const SNAKE_SPEED = 200; //сКОРОСТЬ ПЕРЕМЕЩЕНИЯ ЗМЕЙКИ
let snake = [];
let direction = "y+" // базовое направление наверх
let gameIsRunnig = false; //Запущена ли игра
let snake_timer; //переменная для записи результата setInterval
let score = 0; //результат
let points = document.getElementsByClassName("score-point")[0];

function init(){
   prepareGameField();
   points.innerHTML = score;
   let wrap = document.querySelector(".wrap");
   wrap.style.width = "400px";

   document.getElementById("snake-start").addEventListener("click", startGame);
   document.getElementById("snake-renew").addEventListener("click", refreshGame);

   addEventListener('keydown', changeDirection);
}

function prepareGameField(){
    let gameTable = document.createElement("table");
    gameTable.setAttribute("class", "game-table ");

    for (let i = 0; i < FIELD_SIZE_X; i++){ //строка
       let row = document.createElement("tr");
       row.className = "game-table row-" + i;
       for(let j = 0; j < FIELD_SIZE_Y; j++){
           let cell = document.createElement("td");
           cell.className = "game-table cell-" + i + "-" + j;

           row.appendChild(cell); //В ряд поместили ячейку
       }
       gameTable.appendChild(row); // В таблицу помещаем ряд
    }
    document.querySelector("#snake-field").appendChild(gameTable);
}

function startGame(){
   gameIsRunning = true;
   createSnake();

   snake_timer = setInterval(move, SNAKE_SPEED);
   setTimeout(createFood, 5000);
   setTimeout(createProblem, 5000);
}

function createSnake(){
   let startCoordX = Math.floor(FIELD_SIZE_X / 2); //Округление до близайшего целового числа
   let startCoordY = Math.floor(FIELD_SIZE_Y / 2);

   let snakeHead =  document.getElementsByClassName("cell-" + startCoordY + "-" + startCoordX)[0];
   
   snakeHead.setAttribute("class", snakeHead.getAttribute("class") + " snake-unit");

   let snakeTail = document.getElementsByClassName("cell-" + (startCoordY - 1) + "-" + startCoordX)[0];
   snakeTail.setAttribute("class", snakeTail.getAttribute("class") + " snake-unit");

   snake.push(snakeHead);
   snake.push(snakeTail);
   points.innerHTML = score;
}

function move(){
   let snakeHeadClasses = snake[snake.length - 1].getAttribute("class").split(" ");
/*     console.log(snakeHeadClasses); */
   let newInit;
   let snakeCoordinates = snakeHeadClasses[1].split("-");
   let coordY = parseInt(snakeCoordinates[1]);
   let coordX = parseInt(snakeCoordinates[2]);
/*  console.log("Координата y" + coordY);
   console.log("Координата x" + coordX);
   console.log("Значение direction " + direction); */
   
   if (direction == 'x-') {
       newInit = document.getElementsByClassName('cell-' + (coordY) + '-' + (coordX - 1))[0];
   }
   else if (direction == 'x+') {
       newInit = document.getElementsByClassName('cell-' + (coordY) + '-' + (coordX + 1))[0];
   }
   else if (direction == 'y+') {
       newInit = document.getElementsByClassName('cell-' + (coordY - 1) + '-' + (coordX))[0];
   }
   else if (direction == 'y-') {
       newInit = document.getElementsByClassName('cell-' + (coordY + 1) + '-' + (coordX))[0];
   }

   if (newInit === undefined){
       console.log("Зашел в функцию телепорта " + newInit);
       console.log("Направление " + direction);
       newInit = headTeteport(coordY, coordX);
   }
   
   if(!haveFood(newInit)){
       let removed = snake.splice(0, 1)[0]; 
       let classes = removed.getAttribute("class").split(" ");
       removed.setAttribute("class", classes[0] + " " + classes[1]);
   }

   if(!isSnakeUnit(newInit) && pathClear(newInit)){
       /* console.log("Значение новой ячейки" + newInit); */
       newInit.setAttribute("class", newInit.getAttribute("class") + " snake-unit");
       snake.push(newInit);
   }
   else{
       finishTheGame();
   }
}

function isSnakeUnit(unit){
   let check = false;
   if(snake.includes(unit)){
       check = true;
   }
   return check;
}

function haveFood(unit){
   /* console.log("Функция хевфуд приняла " + unit); */

   let check = false;

/*     console.log("Атрибуты класса юнита  " + unit.getAttribute("class"));
*/
   let unitClasses = unit.getAttribute("class").split(" ");

/*     console.log("Классы юнита " + unitClasses);
*/
   if(unitClasses.includes("food-unit")){
       check = true;
       createFood();
       score++;
       points.innerHTML = score;
   }
   return check;
}

function createFood(){
   console.log("Вход в функцию создания еды");
   let  foodCreated = false;
   while(!foodCreated){
       console.log("Вход в цикл while")
       let foodX = Math.floor(Math.random() * FIELD_SIZE_X);
       let foodY = Math.floor(Math.random() * FIELD_SIZE_Y);
       let foodCeil = document.getElementsByClassName("cell-" + foodY + "-" + foodX)[0];
       let foodCeilClasses = foodCeil.getAttribute("class").split(" ");

       if(!foodCeilClasses.includes("food-unit")){
           let classes = "";
           for(let i = 0; i < foodCeilClasses.length; i++){
               classes += foodCeilClasses[i] + " ";
           }
           foodCeil.setAttribute("class", classes + "food-unit");
           foodCreated = true;
       }
   }
}

function changeDirection(e) {
   console.log(e);
   
   switch (e.keyCode) {
       case 37: // Клавиша влево
           if (direction != 'x+') {
               direction = 'x-'
           }
           break;
       case 38: // Клавиша вверх
           if (direction != 'y-') {
               direction = 'y+'
           }
           break;
       case 39: // Клавиша вправо
           if (direction != 'x-') {
               direction = 'x+'
           }
           break;
       case 40: // Клавиша вниз
           if (direction != 'y+') {
               direction = 'y-'
           }
           break;
   }
}


function finishTheGame(){
   gameIsRunnig = false;
   clearInterval(snake_timer);
   /* alert('Вы проиграли! Ваш результат: ' + score.toString()); */
}

function refreshGame(){
   location.reload();
}

/*  let visibleResult = document.createElement("span");
visibleResult.innerText = "Текущий результат игры " + score; // В инит
let containerResult = document.querySelector(".score"); // Если еда обновить
containerResult.appendChild(visibleResult); */

function createProblem(){
   let  problemCreated = false;
   while(!problemCreated){
       let problemX = Math.floor(Math.random() * FIELD_SIZE_X);
       let problemY = Math.floor(Math.random() * FIELD_SIZE_Y);
       let problemCeil = document.getElementsByClassName("cell-" + problemY + "-" + problemX)[0];
       let problemCeilClasses = problemCeil.getAttribute("class").split(" ");

       if(!problemCeilClasses.includes("snake-unit") && !problemCeilClasses.includes("food-unit")){
           let classes = "";
           for(let i = 0; i < problemCeilClasses.length; i++){
               classes += problemCeilClasses[i] + " ";
           }
           problemCeil.setAttribute("class", classes + "problem-unit");
           problemCreated = true;
       }
   }
}

function pathClear(unit){
   let check = false;
   let unitClasses = unit.getAttribute("class").split(" ");
   if(!unitClasses.includes("problem-unit")){
       check = true;
   }
   return check;
}

function headTeteport(y, x){
   let unit;

   if(direction == "x-"){
       unit = document.getElementsByClassName("cell-" + y + "-" + (FIELD_SIZE_X - 1))[0];
   }
   else if (direction == "x+"){
       unit = document.getElementsByClassName("cell-" + y + "-" + (FIELD_SIZE_X + 1))[0];
   }
   else if (direction == "y-"){
       unit = document.getElementsByClassName("cell-" + (FIELD_SIZE_Y - 1) + "-" + x)[0];
   }
   else if (direction == "y+"){
       unit = document.getElementsByClassName("cell-" + (FIELD_SIZE_Y + 1) + "-" + x)[0];
       console.log("Переопределение координат " + unit);
   }
   return unit;
}

init();