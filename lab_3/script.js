function task_1(){
    let arrayA = [1, [1, 2, [3, 4]], [2,4]];
    let arrayB = [[5, [6]], 7, [8, [9, [10]]]];

    function flattenDeep(arr){
        return arr.reduce((acc, val) => {
            if (Array.isArray(val)) {
                return acc.concat(flattenDeep(val));
            }
            return acc.concat(val);
        }, []);
    }

    return flattenDeep([].concat(arrayA, arrayB));
}

function task_2() {
    let array = [1, [1, 2, [3, 4]], [2,4]];
    function deep_sum(arr) {
        return arr.reduce((accumulator, currentValue) => {
            if (Array.isArray(currentValue)) {
                return accumulator + deep_sum(currentValue); 
            } else {
                return accumulator + currentValue; 
            }
        }, 0);
    }
    return deep_sum(array);
}

function task_3(students) {
  return students.reduce((acc, student) => {
    if (student.age > 17) { 
      if (!acc[student.groupId]) {
        acc[student.groupId] = []; 
      }
      acc[student.groupId].push(student);
    }
    return acc;
  }, {});
}

function task_4()
{
    let line = "ABC";
    let  total1 = "";
    for(let i = 0; i < line.length; i++){
        let code =  line[i].charCodeAt(0);
        total1 += code;
    }
    let total2 = total1.replace(/7/g, "1");
    return Number(total1) - Number(total2);
}

function task_5(...objects) {
    return objects.reduce((result, source) => {
        const onlyNewKeys = Object.keys(source).reduce((acc, key) => {
            if (!(key in result)) acc[key] = source[key];
            return acc;
        }, {});
        return Object.assign(result, onlyNewKeys);
    }, Object.assign({}, {}));
}

function task_6(floors)
{
    floors = Math.floor(Number(floors));        
    if (!floors || floors <= 0) 
        {
            return [];   
        }    

    const width = 2 * floors - 1;
    const result = [];

    for (let i = 1; i <= floors; i++) {
        const stars = '*'.repeat(2 * i - 1);
        const sideSpaces = ' '.repeat((width - stars.length) / 2);
        result.push(sideSpaces + stars + sideSpaces);
    }

    return result;
}

function runTask(n){
    const output = document.getElementById(`output${n}`)
    switch(n)
    {
    case 1:
        let result = task_1();
        output.textContent = result
        break;
    case 2:
        let sum = task_2();
        output.textContent = sum
        break;
    case 3:
        let students = [
            { name: "Аня", age: 18, groupId: 1 },
            { name: "Петя", age: 16, groupId: 1 },
            { name: "Вася", age: 19, groupId: 2 },
            { name: "Оля", age: 20, groupId: 2 }
        ];
        let grouped = task_3(students);
        output.textContent = JSON.stringify(grouped, null, 2); 
        break;
    case 4:
        let digit = task_4()
        output.textContent = digit;
        break;
    case 5:
        let obj1 = {a: 1, b: 2};
        let obj2 = {c: 3};
        let obj3 = {a: 5, d: 4};
        let merged = task_5(obj1, obj2, obj3);
        output.textContent = JSON.stringify(merged, null, 2); 
        break;
    case 6:
        let floors = 3;
        output.textContent = task_6(floors).join("\n"); 
        break;
    }
}
