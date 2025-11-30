function deepCopy(value) {
  if (Array.isArray(value)) {
    return [...value].map(item => deepCopy(item));
  }

  if (value !== null && typeof value === "object") {
    const copied = {};

    for (const key in value) {
      copied[key] = deepCopy(value[key]);
    }

    return { ...copied };
  }
  return value;
}

let user = {
    name: 'Masha',
    age: 21
};

let numbers = [1, 2, 3];

let user1 = {
    name: 'Masha',
    age: 23,
    location: {
        city: 'Minsk',
        country: 'Belarus'
    }
};

let user2 = {
    name: 'Masha',
    age: 28,
    skills: ["HTML", "CSS", "JavaScript", "React"]
};

const array = [
    {id: 1, name: 'Vasya', group: 10}, 
    {id: 2, name: 'Ivan', group: 11},
    {id: 3, name: 'Masha', group: 12},
    {id: 4, name: 'Petya', group: 10},
    {id: 5, name: 'Kira', group: 11},
];

let user4 = {
    name: 'Masha',
    age: 19,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        exams: {
            maths: true,
            programming: false
        }
    }
};

let user5 = {
    name: 'Masha',
    age: 22,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { maths: true, mark: 8},
            { programming: true, mark: 4},
        ]
    }
};

let user6 = {
    name: 'Masha',
    age: 21,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { 
                maths: true,
                mark: 8,
                professor: {
                    name: 'Ivan Ivanov',
                    degree: 'PhD'
                }
            },
            { 
                programming: true,
                mark: 10,
                professor: {
                    name: 'Petr Petrov',
                    degree: 'PhD'
                }
            },
        ]
    }
};

let user7 = {
    name: 'Masha',
    age: 20,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { 
                maths: true,
                mark: 8,
                professor: {
                    name: 'Ivan Petrov',
                    degree: 'PhD',
                    articles: [
                        {title: "About HTML", pagesNumber: 3},
                        {title: "About CSS", pagesNumber: 5},
                        {title: "About JavaScript", pagesNumber: 1},
                    ]
                }
            },
            { 
                programming: true,
                mark: 10,
                professor: {
                    name: 'Petr Ivanov',
                    degree: 'PhD',
                    articles: [
                        {title: "About HTML", pagesNumber: 3},
                        {title: "About CSS", pagesNumber: 5},
                        {title: "About JavaScript", pagesNumber: 1},
                    ]
                }
            },
        ]
    }
};

let store = {
    state:{
        profilePage:{
            post:[
                {id:1, message:'Hi', likeCount:12},
                {id:2, message:'By', likeCount:1},
            ],
            newPostText:"About me",
        },
        dialogsPage:{
            dialogs:[
                {id:1, name:"Valera"},
                {id:2, name:"Andrey"},
                {id:3, name:"Sasha"},
                {id:4, name:"Victor"},
            ],
            messages:[
                {id:1, message:"hi"},
                {id:2, message:"hi hi"},
                {id:3, message:"hi hi hi"},
            ],
        },
        slidebar:[],
    },
};

function showResult(elementId, message, isError = false) {
    const resultElement = document.getElementById(elementId);
    resultElement.textContent = message;
    resultElement.classList.add('show');
    if (isError) {
        resultElement.classList.add('error');
    } else {
        resultElement.classList.remove('error');
    }
}

function executeTask1() {
    user_copy = deepCopy(user);
    showResult('result1', `Объект user успешно скопирован!\nИмя копии пользователя: ${user_copy.name}`);
}

function executeTask2() {
    numbers_copy = deepCopy(numbers);
    showResult('result2', `Объект numbers успешно скопирован!\nВторой элемент копии: ${numbers_copy[1]}`);
}

function executeTask3() {   
    user1_copy = deepCopy(user1);
    showResult('result3', `Объект user1 успешно скопирован!\nВозраст копии пользователя: ${user1_copy.age}`);
}

function executeTask4() {
    user2_copy = deepCopy(user2);
    showResult('result4',  `Объект user2 успешно скопирован!\nВозраст копии пользователя: ${user2_copy.age}`);
}

function executeTask5() {
    array_copy = deepCopy(array);
    showResult('result5', `Объект array_copy успешно скопирован!\nИмя второго пользователя копии: ${array[1].name}`);
}

function executeTask6() {
    user4_copy = deepCopy(user4);
    showResult('result6',  `Объект user4 успешно скопирован!\nУниверситет копии пользователя: ${user4_copy.studies.university}`);
}

function executeTask7() {
    user5_copy = deepCopy(user5);
    user5_copy.studies.department.group = 12;
    user5_copy.studies.exams[1].mark = 10;
    showResult('result7', `Объект user5 успешно скопирован!\nНомер группы копии пользователя: ${user5_copy.studies.department.group}\nОценка за экзамен по программированию копии пользователя: ${user5_copy.studies.exams[1].mark}`);
}

function executeTask8() {
    user6_copy = deepCopy(user6);
    user6_copy.studies.exams[1].professor.name = "Nikolay Beloded";
    showResult('result8', `Объект user6 успешно скопирован!\nИмя преподователя, копии пользователя: ${user6_copy.studies.exams[1].professor.name}`);
}

function executeTask9() {
    user7_copy = deepCopy(user7);
    user7_copy.studies.exams[1].professor.articles[1].pagesNumber = 3;
    showResult('result9', `Объект user7 успешно скопирован!\nКоличество страниц в копии статьи AboutCSS: ${user7_copy.studies.exams[1].professor.articles[1].pagesNumber}`);
}

function executeTask10() {
    const store_copy = deepCopy(store);
    const messages = store_copy.state.dialogsPage.messages; 
    for (const message of messages) {                       
        message.message = "Hello";
    }
    showResult(
        'result10',
        `Объект store успешно скопирован!\n2 Сообщение копии объекта store: ${store_copy.state.dialogsPage.messages[1].message}`
    );
}
