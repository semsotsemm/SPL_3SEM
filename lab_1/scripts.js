//1
let a = 5;              // number 
let name = "Name";            // string
let i = 0;                  // number
let double = 0.23;       // number
let result = 1 / 0;       // number
let answer = true;       // boolean
let no = null;            // object


//2
console.log(`%c${"2 Задание"}`,`color: ${"red"};  font-size: 28px`);
let rectangleWidth = 45;
let rectangleLength = 21;
let squareSide = 5;
console.log(rectangleWidth * rectangleLength / squareSide / squareSide);


//3
console.log(`%c${"3 Задание"}`,`color: ${"red"};  font-size: 28px`);
let i1 = 2;
let a1 = ++i1;
let b1 = i1++;
if (a1 > b1) {
  console.log("Переменная a1 больше b1");
}
else if (a1 < b1) {
  console.log("Переменная a1 меньше b1");
}
else {
  console.log("Переменные a1 и b1 равны");
}


//4
console.log(`%c${"4 Задание"}`,`color: ${"red"};  font-size: 28px`);
("Котик" == "котик") ? console.log("Котик == котик"): console.log("Котик != котик");
("Котик" == "китик") ? console.log("Котик == китик"): console.log("Котик != китик");
("Кот" == "Котик") ? console.log("Кот == Котик"): console.log("Кот != Котик");
("Привет" == "Пока") ? console.log("Привет == Пока"): console.log("Привет != Пока");
(73 == "53") ? console.log('73 == "53"'): console.log('73 != "53"');
(false == 0) ? console.log('false == 0'): console.log('false != 0');
(54 == true) ? console.log('54 == true'): console.log('54 != true');
(false == 123) ? console.log('false == 123'): console.log('false != 123');
(true == "3") ? console.log('true == "3"'): console.log('true != "3"');
(3 == "5мм") ? console.log('3 == "5мм"'): console.log('3 != "5мм"');
(8 == "-2") ? console.log('8 == "-2"'): console.log('8 != "-2"');
(34 == "34") ? console.log('34 == "34"'): console.log('34 != "34"');
(null == undefined) ? console.log('null == undefined'): console.log('null != undefined');


// 5 
function checkInput() {
  const inputElement = document.getElementById("fio");
  const inputValue = inputElement.value.trim();
  const resultBlock = document.getElementById("result");

  resultBlock.innerHTML = "";

  if (!(inputValue.toLowerCase() === "николай" || 
        inputValue.toLowerCase() === "николай иванович" || 
        inputValue.toLowerCase() === "белодед николай иванович")) {
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  } else {
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
  }
}


//6
console.log(`%c${"6 Задание"}`,`color: ${"red"};  font-size: 28px`);
let englishExam = true;
let mathematicsExam = true;
let physicsExam = false;

if (englishExam && mathematicsExam && physicsExam) {
  console.log("Студента переведут на второй курс");
}
if (!englishExam && !mathematicsExam && !physicsExam) {
  console.log("Студент будет отчислен");
}
if (!(englishExam && mathematicsExam && physicsExam) && (englishExam || mathematicsExam || physicsExam)) {
  console.log("Студента ожидает пересдача");
}


  //7
  console.log(`%c${"7 Задание"}`,`color: ${"red"};  font-size: 28px`);
  console.log(true + true);    //Приведение к int для сложение 1+1 = 2
  console.log(0 + "5");   //Приведение к string для конкартинации 
  console.log(5 + "мм");    //Приведение к string для конкартинации 
  console.log(8 / Infinity);   //Неопределенность стримится к 0
  console.log(9 * "\n9"); // Преобразуется в 9 * " 9" после чего к числу, в итоге 81
  console.log(null - 1);  // Преобразуется к number 0-1 = -1
  console.log("5" - 2); // Приведение к number 5-2 = 3
  console.log("5px" - 3); // Не может перевести к числу поэтому Not a number
  console.log(true - 3); // Приведение к number 1-3 = -2
  console.log(7 || 0); // Или возвращает первое true, если такое есть, иначе false, в данном случае 7 приводится к true

  
//8
console.log(`%c${"8 Задание"}`,`color: ${"red"};  font-size: 28px`);
for (let number = 1; number <= 10; number++) {
  if (number % 2 == 0) {
      console.log(number + 2);
  } else {
      console.log(number + "мм");
  }
}

  
// 9 (Через массив)
function checkDay() {
  const inputElement = document.getElementById("day");
  const inputValue = inputElement.value.trim();
  const resultBlock = document.getElementById("resultday");

  resultBlock.innerHTML = "";

  const daysArray = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
  const dayNumber = parseInt(inputValue);

  if (dayNumber >= 1 && dayNumber <= 7) {
    inputElement.value = "";
    inputElement.placeholder =  daysArray[dayNumber - 1]; 
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
    resultBlock.textContent = ""; 
  } else {
    inputElement.value = ""; 
    inputElement.placeholder = "Неверный номер дня. Введите число от 1 до 7.";
    inputElement.style.backgroundImage = "url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
}

// 9 (Через объект)
function checkDayObj() {
  const inputElement = document.getElementById("dayobj");
  const inputValue = inputElement.value.trim();
  const resultBlock = document.getElementById("resultdayobj");

  resultBlock.innerHTML = "";

  let daysObject = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    7: "Воскресенье"
  };
  const dayNumber = parseInt(inputValue);

  if (daysObject[dayNumber]) {
    inputElement.value = ""; 
    inputElement.placeholder = daysObject[dayNumber]; 
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
  } else {
    inputElement.value = ""; 
    inputElement.placeholder = "Неверный номер дня. Введите число от 1 до 7.";
    inputElement.style.backgroundImage = "url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
}


// 10
function combineParams(param1 = "Добрый", param2 = "день", param3){
    const inputElement = document.getElementById("userName");
    inputElement.value = ""; 
    inputElement.placeholder =  param1 +" "+  param2  + " " + param3;
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
  }
  
function twoParams() {
  const inputElement = document.getElementById("userName");
  const inputValue = inputElement.value.trim();
  const resultBlock = document.getElementById("resultname");

  resultBlock.innerHTML = "";

  
  combineParams(undefined, undefined,  inputValue)
}

//11
  function paramsDeclaration(a, b)
  {
    result = (a == b)? a*4 : a*b;
    return result;
  }
  const paramsExpression = function(a,b) {
    result = (a == b)? a*4 : a*b;
    return result;
  }
  const paramsArrow = (a,b) =>{
    result = (a == b)? a*4 : a*b;
    return result;
  }
function checkParams() {
  const inputElement = document.getElementById("parms");
  const inputValue = inputElement.value.trim();
  const resultBlock = document.getElementById("resultparms");

  resultBlock.innerHTML = "";
  parms = inputValue.split(",");
  const num1 = parms[0];
  const num2 = parms[1];
  resultDec = paramsDeclaration(num1, num2);
  resultExp = paramsExpression(num1, num2);
  resultArr = paramsArrow(num1, num2);
  alert("Результат Declaration: " + resultDec + ",\n" + "Результат Expression: " + resultExp + ",\n"+ "Результат Arrow: " + resultArr);

};