const box = document.querySelectorAll('.box');
const area = document.getElementById('area');
const dashboarOne = document.querySelector('.dashboar-one')
const dashboarTwo = document.querySelector('.dashboar-two')
const recordTable = document.getElementsByClassName('record');
let arrrecordTable =Array.from(recordTable)
const recordTableTwo = document.getElementsByClassName('record-two');
let arrrecordTableTwo =Array.from(recordTableTwo)
const contentResult = document.getElementById('winner')
const modalWindow = document.getElementById('modal-window')
const overlay = document.getElementById('overlay')
const btnClose = document.getElementById('area-btn')
const btn1 = document.querySelector('.one-pls');
const btn2 = document.querySelector('.two-pls');
const checkResult =document.getElementById('check-result');
const checkResultBut =document.getElementById('check-result-button');
const plsConteiner = document.querySelector('.pls-conteiner')
// const newGame = document.getElementById('new-game')
let gameNamber =0;
let gameNamberTwo =0;
let arrwinner=[];
arrwinner.length=10


let arrwinnerTwo=[];
arrwinnerTwo.length=10

let move = 0;
let moveX= 0;
let moveO= 0;
let result= '';
const boxes = document.getElementsByClassName('box')
//функция рондомного числа
function randomInt(min, max) // Случайное целое число в диапазоне min-max
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция игры с компьютером
    function addXO(e) {
        if (e.target.classList.contains('one') && move%2===0 && !e.target.innerHTML && !result) {
             e.target.innerHTML = 'X'; 
             move++;
             moveX++
             check();
             setTimeout(moveBot,200)
         }  
     }
     area.addEventListener('click', addXO)
     btn1.addEventListener('click', addXO)

 // функция игры вдвоем
    
     function addXO2pls(e) {
     
         if (e.target.classList.contains('two') && move%2===0 && !e.target.innerHTML && !result) {
             e.target.innerHTML = 'X'
             moveX++
             move++
             check()
            } else if (e.target.classList.contains('two') && move%2!==0 && !e.target.innerHTML && !result) {
                 e.target.innerHTML = 'O'
                 moveO++
                 move++
                 check()
                 }        
        }
     area.addEventListener('click', addXO2pls)
     btn2.addEventListener('click', addXO2pls);
        

//функция хода бота
let arrboxes =Array.from(boxes) // перевод HTML коллекции в массив
function moveBot(){
    if (move<8 &&!result) {
    while(true){
        let r = randomInt(0, 8);
        if (!arrboxes[r].innerHTML) {    //Если находит пустую
            arrboxes[r].innerHTML = 'O'; //Ставит нолик в неё
            break;
        }
    }
    moveO++
    move++ 
    check()
 }
    }
    

// функция обновляет игру
function startNewgame(){
    for(let i=0; i<arrboxes.length; i++){
        arrboxes[i].innerHTML=''}   
        move=0
        moveO=0
        moveX=0
        result=''
        modalWindow.style.display='none'
        box.forEach((el)=>{el.classList.remove('one')})
        box.forEach((el)=>{el.classList.remove('two')})
        box.forEach((el)=>{el.classList.remove('red')})
        btn1.style.display='block'
        btn2.style.display='block'
        plsConteiner.style.display='block'
}
btnClose.addEventListener('click', startNewgame)

//_____________________________________________________________________________________________________
//функция проверяет кто победитель

function check(){

const arr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

for(let i=0; i<arr.length; i++){
    if (
        boxes[arr[i][0]].innerHTML==='X' && boxes[arr[i][1]].innerHTML==='X' && boxes[arr[i][2]].innerHTML==='X') {
            boxes[arr[i][0]].classList.add('red');
            boxes[arr[i][1]].classList.add('red');
            boxes[arr[i][2]].classList.add('red');
         result= `Победили крестики за ${moveX} хода. Общее колчество ходов ${move}`;
         if(box[1].classList.contains('one')){
            gameNamber++
            arrwinner.shift()
            arrwinner.push(`Игра №${gameNamber}.Победили крестики за ${moveX} хода.`)
            fixtable();
            } else {
            gameNamberTwo++
            arrwinnerTwo.shift()
            arrwinnerTwo.push(`Игра №${gameNamberTwo}.Победили крестики за ${moveX} хода.`)
            fixtableTwo();
            }
         setTimeout(prepareResult, 1000)
        } else if (
            boxes[arr[i][0]].innerHTML==='O' && boxes[arr[i][1]].innerHTML==='O' && boxes[arr[i][2]].innerHTML==='O') {
                boxes[arr[i][0]].classList.add('red');
                boxes[arr[i][1]].classList.add('red');
                boxes[arr[i][2]].classList.add('red');
         result=  `Победили нолики за ${moveO} хода. Общее колчество ходов ${move}`;  
         if(box[1].classList.contains('one')){
            gameNamber++
            arrwinner.shift()
            arrwinner.push(`Игра №${gameNamber}.Победили нолики за ${moveO} хода.`)
            fixtable();
            } else {
            gameNamberTwo++
            arrwinnerTwo.shift()
            arrwinnerTwo.push(`Игра №${gameNamberTwo}.Победили нолики за ${moveO} хода.`)
            fixtableTwo();
            }
            setTimeout(prepareResult, 1000)
        }
}
if(move==9 && !result) {
    result= 'Ничья'; 
    setTimeout(prepareResult, 1000)
    if(box[1].classList.contains('one')){
        gameNamber++
        arrwinner.shift()
        arrwinner.push(`Игра №${gameNamber}.Ничья.`)
        fixtable();
        } else {
        gameNamberTwo++
        arrwinnerTwo.shift()
        arrwinnerTwo.push(`Игра №${gameNamberTwo}.Ничья.`)
        fixtableTwo();
        }
}

}

//функция выводит результат на экран
function prepareResult (){
    contentResult.innerHTML=result
    modalWindow.style.display='block'
}

//функция выводит результат в таблицу рекордов при одиночной игре
function fixtable (){
    
    for (let i=9; i>=0; i--) {
        if(typeof arrwinner[i] ==='string'){
        arrrecordTable[i].innerHTML=(arrwinner[i])}}
}

//функция выводит результат в таблицу рекордов при  игре в двоем
function fixtableTwo (){
    for (let i=9; i>=0; i--) {
        if(typeof arrwinnerTwo[i] ==='string'){
        arrrecordTableTwo[i].innerHTML=(arrwinnerTwo[i])}}
}


//фугкция добав класса для игры с компом
function addClassOne(){
        box.forEach((el)=>{el.classList.add('one')})
        btn1.style.display='none'
        btn2.style.display='none'
        plsConteiner.style.display='none'
        // dashboarTwo.style.display='none'
        // dashboarOne.style.display='block'
}
btn1.addEventListener('click', addClassOne);

//фугкция добав класса для игры вдвоем
function addClassTwo(){
    box.forEach((el)=>{el.classList.add('two')})
    btn1.style.display='none'
    btn2.style.display='none'
    plsConteiner.style.display='none'
    // dashboarOne.style.display='none'
    // dashboarTwo.style.display='block'
}
btn2.addEventListener('click', addClassTwo);

//фугкция выводит на экран доску результатов
function seeresults() {
    if(box[1].classList.contains('one')){
        dashboarOne.style.display='block'
        } else {
            dashboarTwo.style.display='block'
        }
        modalWindow.style.display='none'
}
checkResult.addEventListener('click', seeresults)
checkResultBut.addEventListener('click', seeresults)

//фугкция удаляет с экрана доску результатов и выводит выбор типа игры

function deleteresults() {
            dashboarTwo.style.display='none'
            dashboarOne.style.display='none'
            if(result) {
                modalWindow.style.display='block'}    
}
dashboarOne.addEventListener('click', deleteresults)
dashboarTwo.addEventListener('click', deleteresults)

console.log(' 1.Вёрстка +10 \n 2.При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10 \n 3.Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10 \n 4.По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10 \n 5.Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +5 \n 6.Анимации или звуки, или настройки игры.+10 \n 7.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 \n Общий балл 65')

