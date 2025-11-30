const person = {
  name: "Алексей",
  age: 14,
  greet(username) {
    this.name = username
    return "Привет " + this.name;
  },
  ageAfterYears(years) {
    this.age = years
    return "Текущий возраст: " + this.age;
  }
}

const car = {
  model: "Mercedes",
  year: 2020,
  getInfo() {
    return `Модель машины: ${this.model},\nГод выпуска: ${this.year}`
  }
}

const book = {
  title: "",
  author: ""
}

function Book(book_title, book_author) {
  this.title = book_title;
  this.author = book_author;
  this.getTitle = function () {
    return this.title;
  }
  this.getAuthor = function () {
    return this.author;
  }
}

const team = {
  members: [],

  setMember(member_name, member_age) {
    this.members.push({ name: member_name, age: member_age });
  },

  getMember() {
    line = "";
    this.members.forEach(function(member, index){
      line += `${index + 1}: ${member.name}, ${member.age}\n`;
    }, this)
    return line;
  }
}

const counter = (function () {
  let count= 0;
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },

    getValue() {
      return count;
    }
  };
})();

const item = {
  price: 2500,
}

const user= {
  _firstname:"",
  _lastname:"",
  
  get fullName()
  {
    return this._firstname + " " + this._lastname;    
  },
  set fullName(value)
  {
    const parts = value.split(" ");
    this._firstname = parts[0] || "";
    this._lastname = parts[1] || "";
    return "Имя пользователя изменено";    
  }
}

const circle = {
  radius: 5, 
  area: 25,
  
  calculateArea(){
    return this.radius * this.radius * Math.PI;
      
  },
  get circle_area()
  {
    return this.area;
  },
  set circle_area(circle_radius)
  {
    this.radius = circle_radius;
    this.area = this.calculateArea();
  }
}

const car2 = {
  make: "Toyota",
  model: "Camry",
  year: 2020
}

const numbersArray = [10, 20, 30];

const rectangle = {
  _width: 0,
  _height: 0,
  
  calculateArea(){
    return this._width * this._height;
  },
  
  get width()
  {
    return this._width;
  },
  set width(value)
  {
    this._width = value;
  },
  
  get height()
  {
    return this._height;
  },
  set height(value)
  {
    this._height = value;
  },
  
  get area()
  {
    return this.calculateArea();
  }
}



const tasks = {
  task1() {
    const inputAge = document.getElementById("user_age").value;
    const inputName = document.getElementById("user_name").value;
    if (!isNaN(inputAge) && inputAge.trim() !== "" && isNaN(inputName) && inputName.trim() !== "") {
      let user_age = parseInt(inputAge, 10);
      if (user_age > 70 || user_age < 0) {
        output_message = "Не верю";
      }
      else {
        output_message = person.greet(inputName) + "\n" + person.ageAfterYears(user_age);
      }
    }
    else {
      output_message = "Не балуйтесь!";
    }
    return output_message;
  },
  task2() {
    let year = document.getElementById("year_of_manufacture").value
    let car_model = document.getElementById("car_model").value
    if (!isNaN(year) && year.trim() !== "" && isNaN(car_model) && car_model.trim() !== "") {
      let year_of_manufacture = parseInt(year, 10);
      if (year_of_manufacture > 2026 || year_of_manufacture < 1960) {
        output_message = "Не верю";
      }
      else {
        car.year = year_of_manufacture;
        car.model = car_model;
        output_message = car.getInfo();
      }
    }
    else {
      output_message = "Не балуйтесь!";
    }
    return output_message;
  },
  task3() {
    let book_title = document.getElementById("book_title").value
    let book_author = document.getElementById("book_author").value
    if (isNaN(book_title) && book_title.trim() !== "" && isNaN(book_author) && book_author.trim() !== "") {
      let myBook = new Book(book_title, book_author);
      return `Книга автора: ${myBook.getAuthor()}:\n"${myBook.getTitle()}"`
    }
  },
  task4() {
    return {
      add() {
        let member_name = document.getElementById("member_name").value
        let member_age = document.getElementById("member_age").value
        if (!isNaN(member_age) && member_age.trim() !== "" && isNaN(member_name) && member_name.trim() !== "") {
          let memberAge = parseInt(member_age, 10);
          if (memberAge > 70 || memberAge < 0) {
            output_message = "Не верю";
          }
          else {
            team.setMember(member_name, memberAge);
            output_message = "Игрок добавлен!";
          }
        }
        else {
          output_message = "Не балуйтесь!";
        }
        return output_message;
      },
      getInfo() {
        return team.getMember();
      }
    };
  },
  task5() {
    return {
      add() {
        return counter.increment();
      },
      remove() {
        return counter.decrement();
      },
      get() {
        return counter.decrement();
      },
    };
  },
  task6() {
    return {
      change() {
        const new_price = document.getElementById("new_price").value;
        item.price = new_price
        return item.price;
      },
      fix() {
        Object.defineProperty(item, 'price', {
        writable: false, 
        configurable: false 
        }); 
        return "Цену больше нельзя изменить!";
      },
    };
  },
  task7() {
    const circle_radius = document.getElementById("circle_radius").value;
    circle.circle_area = circle_radius;
    return  circle.circle_area;
  },
  task8() {
    return {
      change() {
        const car_make = document.getElementById("car_make").value;
        const car_model2 = document.getElementById("car_model2").value;
        const car_year = document.getElementById("car_year").value;
        if (isNaN(car_make) && car_make.trim() !== "" && isNaN(car_model2) && car_model2.trim() !== "" && !isNaN(car_year) && car_year.trim() !== "") {
          let year_of_car = parseInt(car_year, 10);
          if (year_of_car > 2026 || year_of_car < 1960) {
            output_message = "Не верю";
          }
          else {
            car2.make = car_make;
            car2.model = car_model2;
            car2.year = year_of_car;
            output_message = `Марка: ${car2.make}\nМодель: ${car2.model}\nГод: ${car2.year}`;
          }
        }
        else {
          output_message = "Не балуйтесь!";
        }
        return output_message;
      },
      fix() {
        Object.defineProperty(car2, 'make', {
          writable: false,
          configurable: false
        });
        Object.defineProperty(car2, 'model', {
          writable: false,
          configurable: false
        });
        Object.defineProperty(car2, 'year', {
          writable: false,
          configurable: false
        });
        return "Свойства больше нельзя изменить!";
      },
    };
  },
  task9() {
    Object.defineProperty(numbersArray, 'sum', {
      get() {
        return this[0] + this[1] + this[2];
      },
      configurable: false
    });
    return `Массив: [${numbersArray[0]}, ${numbersArray[1]}, ${numbersArray[2]}]\nСумма: ${numbersArray.sum}`;
  },
  task10() {
    const rectangle_width = document.getElementById("rectangle_width").value;
    const rectangle_height = document.getElementById("rectangle_height").value;
    if (!isNaN(rectangle_width) && rectangle_width.trim() !== "" && !isNaN(rectangle_height) && rectangle_height.trim() !== "") {
      let width_value = parseInt(rectangle_width, 10);
      let height_value = parseInt(rectangle_height, 10);
      if (width_value < 0 || height_value < 0) {
        output_message = "Не верю";
      }
      else {
        rectangle.width = width_value;
        rectangle.height = height_value;
        output_message = `Ширина: ${rectangle.width}\nВысота: ${rectangle.height}\nПлощадь: ${rectangle.area}`;
      }
    }
    else {
      output_message = "Не балуйтесь!";
    }
    return output_message;
  },
  task11() {
    const user_firstname = document.getElementById("user_firstname").value;
    const user_lastname = document.getElementById("user_lastname").value;
    
    if (isNaN(user_firstname) && user_firstname.trim() !== "" && isNaN(user_lastname) && user_lastname.trim() !== "") 
    {
      user.fullName = user_firstname + " " + user_lastname;
      return "Полное имя: " + user.fullName;
    }
    else
    {
      return "Не балуйтесь"
    }
  },
};

const resultsCache = {};

function updateResult(taskId, message) {
  const output = document.getElementById(`${taskId}-output`);
  if (output) {
    output.textContent = message ?? "Нет данных";
  }
}

function additionalHandler() {
  const add_btn = document.querySelector(".add-btn");
  const remove_btn = document.querySelector(".remove-btn");
  const add_counter_btn = document.querySelector(".add_counter-btn");
  const remove_counter_btn = document.querySelector(".remove_counter-btn");
  const get_counter_btn = document.querySelector(".get_counter-btn");
  const change_btn = document.querySelectorAll(".change-btn");
  const fix_btn = document.querySelectorAll(".fix-btn");
  add_btn.addEventListener("click", () => {
    const taskId = add_btn.dataset.task;
    const result = tasks[taskId]().add();
    resultsCache[taskId] = result;
    updateResult(taskId, result);
  });
  change_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskId = btn.dataset.task;
      const result = tasks[taskId]().change();
      resultsCache[taskId] = result;
      updateResult(taskId, result);
    });
  });
  fix_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskId = btn.dataset.task;
      const result = tasks[taskId]().fix();
      resultsCache[taskId] = result;
      updateResult(taskId, result);
    });
  });
  remove_btn.addEventListener("click", () => {
    const taskId = remove_btn.dataset.task;
    const result = tasks[taskId]().getInfo();
    resultsCache[taskId] = result;
    updateResult(taskId, result);
  });
  add_counter_btn.addEventListener("click", () => {
    const taskId = add_counter_btn.dataset.task;
    const result = tasks[taskId]().add();
    resultsCache[taskId] = result;
    updateResult(taskId, result);
  });
  remove_counter_btn.addEventListener("click", () => {
    const taskId = remove_counter_btn.dataset.task;
    const result = tasks[taskId]().remove();
    resultsCache[taskId] = result;
    updateResult(taskId, result);
  });
  get_counter_btn.addEventListener("click", () => {
    const taskId = get_counter_btn.dataset.task;
    const result = tasks[taskId]().get();
    resultsCache[taskId] = result;
    updateResult(taskId, result);
  });
}

function attachHandlers() {
  document.querySelectorAll(".run-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskId = btn.dataset.task;
      const executor = tasks[taskId];

      if (typeof executor !== "function") {
        updateResult(taskId, "Обработчик не найден.");
        return;
      }

      try {
        const result = executor();
        resultsCache[taskId] = result;
        updateResult(taskId, result);
      } catch (error) {
        updateResult(taskId, `Ошибка: ${error.message}`);
      }
    });
  });

  document.querySelectorAll(".reset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskId = btn.dataset.reset;
      delete resultsCache[taskId];
      updateResult(taskId, "Жду результат...");
    });
  });
}

document.addEventListener("DOMContentLoaded", attachHandlers);
document.addEventListener("DOMContentLoaded", additionalHandler);
