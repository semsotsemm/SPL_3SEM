//1
function calculate(operation, parm1, parm2)
{
switch(operation)
        {
          case '+':
            return  parm1 + parm2;
          case '-':
            return  parm1 - parm2;
          case '*':
            return  parm1 * parm2;
          case '/':
            return  parm1 / parm2;
        }
}

function checkOperation() {
  const inputElement = document.getElementById("operation");
  const inputValue = inputElement.value.trim();

  operations = inputValue.split(",");
  operation = operations[0];
  number1 = operations[1];
  number2 = operations[2];

  if (operation == '+' || operation == '*' ||operation == '-' ||operation == '/') {
    if(/^\d+$/.test(number1) && /^\d+$/.test(number2))
      {
        inputElement.placeholder = calculate(operation, Number(number1), Number(number2));
        inputElement.style.backgroundImage = "url('image/success.png')";
        inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
      }
      else{
        inputElement.placeholder = "Ошибка ввода 2 или 3 оператора.";
        inputElement.style.backgroundImage ="url('image/unsuccess.png')";
        inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
      }
  }
  else {
    inputElement.placeholder = "Разрешенные операции +,-,/,*, проверьте ввод.";
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
  inputElement.value = "";
}


//2
function get_sum_cube(number)
{
  let sum = 0
  for(let i = 1; i <= number;i++)
    {
      sum += i**3;
    }
    return sum;

}

function checkSumCube() {
  const inputElement = document.getElementById("sumCube");
  const inputValue = inputElement.value.trim();
  if(/^\d+$/.test(inputValue))
    {
    let result = get_sum_cube(Number(inputValue));
    inputElement.placeholder = result;
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
    }
  else{
    inputElement.placeholder = "Ошибка: введено не число";
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
  inputElement.value = "";
}


//3
function get_arithmetic_mean(numbers)
{
  sum = 0;
  for(let i = 0; i < numbers.length; i++)
    {
      sum += numbers[i];
    }
    return sum/numbers.length;
}

function checkArithmeticMean() {
  const inputElement = document.getElementById("arithmetic");
  const inputValue = inputElement.value.trim();

  const listOfNumbers = inputValue.split(",").map(item => item.trim());
  const allNumber = listOfNumbers.every(num => /^-?\d+(\.\d+)?$/.test(num));

  if(allNumber)
    {
    let numbers = listOfNumbers.map(Number);
    let result = get_arithmetic_mean(numbers);
    inputElement.placeholder = result;
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
    }
  else{
    inputElement.placeholder = "Ошибка ввода";
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
  inputElement.value = "";
}

//4
function reverse_line(line)
{
  let reversed_line = "";
    for (let i = line.length; i >= 0; i--) {
    if ((line[i] >= "A" && line[i] <= "Z") || (line[i] >= "a" && line[i] <= "z"))
      {
      reversed_line += line[i];
      }
    }
    return reversed_line
}

function turnOver() {
  const inputElement = document.getElementById("userLine");
  const inputValue = inputElement.value.trim();
  if(inputValue)
    {
    result = reverse_line(inputValue);
    inputElement.placeholder = result;
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
    }
  else{
    inputElement.placeholder = "Ошибка ввода";
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
  inputElement.value = "";
}


//5
function repeat_line(line, num)
{
  let repeated_line = "";
    for (let i = 0; i < num; i++) {
      repeated_line += line
    }
    return repeated_line
}

function repeat() {
  const inputElement = document.getElementById("repeatLineInput");
  const inputValue = inputElement.value.trim();
  userInput = inputValue.split(',');
  if(userInput && userInput.length == 2)
    line = userInput[0];
    number = userInput[1];
    if(/^\d+$/.test(number))
      {
      result = repeat_line(line, number);
      inputElement.placeholder = result;
      inputElement.style.backgroundImage = "url('image/success.png')";
      inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
      }
  else{
    inputElement.placeholder = "Ошибка ввода";
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
  inputElement.value = "";
}


//5
function uniqueItems(array1, array2)
{
  let uniquearray = []
    for (let i = 0; i < array1.length; i++) {
      if(!(array2.includes(array1[i]) ))
        {
          uniquearray.push(array1[i])
        }
    }
    return uniquearray
}

function getUniqueItems() {
  const first_array = document.getElementById("first_array");
  const second_array = document.getElementById("second_array");
  const inputValue1 = first_array.value.trim();
  const inputValue2 = second_array.value.trim();
  let array1 = inputValue1.split(',');
  let array2 = inputValue2.split(',');
  if(array1 && array2){
    uniquearray = uniqueItems(array1, array2);
    alert("Уникальные элементы из массива 1: "+uniquearray);
    inputElement.style.backgroundImage = "url('image/success.png')";
    inputElement.style.backgroundColor = "rgba(0, 255, 42, 0.2)";
  }
  else{
    inputElement.placeholder = "Ошибка ввода";
    inputElement.style.backgroundImage ="url('image/unsuccess.png')";
    inputElement.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  }
  inputElement.value = "";
}
