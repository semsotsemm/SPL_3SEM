document.addEventListener("DOMContentLoaded", () => {
  function printTo(container, text, { append = false } = {}) {
    if (!container)
      {
        return;
      }
    if (append && container.textContent.trim() !== "") 
      {
      container.textContent += "\n" + text;
      }
     else 
      {
      container.textContent = text;
      }

  }

  function clearOutput(container) 
  {
    if (!container) 
      {
        return;
      }
    container.textContent = "";
  }

  const outputTask1 = document.getElementById("output-task1");
  const outputTask2 = document.getElementById("output-task2");

  const tabsRoot = document.querySelector("[data-tabs]");
  if (tabsRoot) 
    {
    const tabButtons = tabsRoot.querySelectorAll("[data-tab-target]");
    const tabPanes = tabsRoot.querySelectorAll("[data-tab-pane]");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-tab-target");
        if (!target)
          {
             return;
          }

        tabButtons.forEach((b) => b.classList.remove("tabs__btn--active"));
        btn.classList.add("tabs__btn--active");

        tabPanes.forEach((pane) => {
          const paneName = pane.getAttribute("data-tab-pane");
          pane.classList.toggle(
            "tabs__pane--active",
            paneName === target
          );
        });
      });
    });
  }

  const btnCreateShapes = document.getElementById("btn-create-shapes");

  const btnGreenCircleProps = document.getElementById(
    "btn-green-circle-props"
  );
  const btnTriangleProps = document.getElementById("btn-triangle-props");
  const btnSmallSquareColor = document.getElementById(
    "btn-small-square-color"
  );
  const btnResetTask1 = document.getElementById("btn-reset-task1");
  
  class Figure {
      constructor(color, size, edges)
      {
        this.figure_color = color;
        this.figure_size = size;
        this.figure_edges = edges;
      }
  }

  class Square extends Figure {
    constructor(color, size, edges, area) {
      super(color, size, edges);
      
      this.square_area = area;
    }

    getColor() {
      return this.figure_color;
    }
  }

  class Triangle extends Figure {
    constructor(color, size, edges, lines) {
      super(color, size, edges);
      
      this.triangle_lines = lines;
    }

    getParams() {
      return `Цвет треугольника: ${this.figure_color}\nКоличество линий треугольника: ${this.triangle_lines}\nРазмер треугольника: ${this.figure_size}\nКоличество граней треугольника: ${this.figure_edges}\n`;
    }
  }

  class Circle extends Figure {
    constructor(color, size, edges, radius) {
      super(color, size, edges);
      
      this.circle_radius = radius;
    }

    getParams() {
      return `Цвет круга: ${this.figure_color}\nРадиус линий круга: ${this.circle_radius}\nРазмер круга: ${this.figure_size}\nКоличество граней круга: ${this.figure_edges}\n`;
    }
  }

  let small_square, big_square, white_circle, green_circle, triangle_with_3_lines,  triangle_with_line;

  if (btnCreateShapes) {
    btnCreateShapes.addEventListener("click", () => {
      small_square = new Square("Желтый", 5, 4);
      big_square = new Square("Желтый", 20, 4);
      triangle_with_3_lines = new Triangle("Белый", 20, 3, 3);
      triangle_with_line = new Triangle("Белый", 20, 3, 1);
      green_circle = new Circle("Зеленый", 10, Infinity, 5);
      white_circle = new Circle("Белый", 10, Infinity, 5);
      printTo(
        outputTask1,
        "Фигуры созданы.",
        { append: false }
      );
    });
  }

  if (btnGreenCircleProps) {
    btnGreenCircleProps.addEventListener("click", () => {
       if(green_circle)
        {
          printTo(
            outputTask1,
            `Параметры зеленого круга:\n${green_circle.getParams()}`,
            { append: true }
          );
        }
        else
          {
            printTo(
            outputTask1,
            "Для начала создайте фигуры",
            { append: false }
          );
          }
    });
  }

  if (btnTriangleProps) {
    btnTriangleProps.addEventListener("click", () => {
       if(triangle_with_3_lines)
        {
          printTo(
            outputTask1,
            `Свойства треугольника с тремя полосками:\n ${triangle_with_3_lines.getParams()}`,
            { append: true }
          );
        }
        else
          {
            printTo(
            outputTask1,
            "Для начала создайте фигуры",
            { append: false }
          );
          }
    });
  }

  if (btnSmallSquareColor) {
    btnSmallSquareColor.addEventListener("click", () => {
      if(small_square)
        {
          printTo(
            outputTask1,
            `Цвет маленького квадрата: ${small_square.getColor()}`,
            { append: true }
          );
        }
        else
          {
            printTo(
            outputTask1,
            "Для начала создайте фигуры",
            { append: false }
          );
          }
    });
  }

  if (btnResetTask1) {
    btnResetTask1.addEventListener("click", () => {
      clearOutput(outputTask1);
    });
  }

  const store = {
    human: null,
    student: null,
    faculty: null,
  };

  const btnCreateHuman = document.getElementById("btn-create-human");
  const btnUpdateHumanAge = document.getElementById("btn-update-human-age");
  const btnUpdateHumanAddress = document.getElementById(
    "btn-update-human-address"
  );

  const inputHumanFirstname = document.getElementById("human-firstname");
  const inputHumanSecondname = document.getElementById("human-lastname");
  const inputHumanBirthyear = document.getElementById("human-birthyear");
  const inputHumanAddress = document.getElementById("human-address");

  class Human {
    constructor(first_name, second_name, date_of_birth, address)
    {
      this.human_first_name = first_name;
      this.human_second_name = second_name;
      this.human_date_of_birth = date_of_birth;
      this.human_address = address;
    }
      get human_age(){
        return 2025 - this.human_date_of_birth;
      }
      set human_age(user_input) {
        let success_flag = false;
        let human_new_age = Number(user_input);
        if(!isNaN(human_new_age) && isFinite(human_new_age))
          {
            if(human_new_age > 1900 && human_new_age < 2026)
              {
                this.human_date_of_birth = human_new_age;
                success_flag = true;
              }
          }
        return success_flag;
      }
      GetHumanAddress() {
        return this.human_address;
      }
      SetHumanAddress(user_input){
        let success_flag = false;
        if(typeof user_input === 'string'|| user_input !== "")
          {
            this.human_address = user_input;
            success_flag = true;
          }
        return success_flag;
      }
  }

  if (btnCreateHuman) {
    btnCreateHuman.addEventListener("click", () => {
      if(store.human == null)
      {
        const human_firstname = inputHumanFirstname.value.trim();
        const human_secondname = inputHumanSecondname.value.trim();
        const human_birthyear_input = inputHumanBirthyear.value.trim();
        const human_address = inputHumanAddress.value.trim();

        if(!human_firstname || !human_secondname || !human_birthyear_input || !human_address)
        {
          printTo(
            outputTask2,
            "Ошибка. Все поля должны быть заданы.",
            { append: false }
          );
          return;
        }

        human_birthyear = Number(human_birthyear_input)

        if (isNaN(human_birthyear) || human_birthyear < 1900 || human_birthyear > 2025) {
          printTo(outputTask2, "Ошибка. Год рождения должен быть корректным числом (от 1900 до текущего года).", { append: false });
          return;
        } 
        if (typeof human_address !== 'string' || human_address.trim() === '') 
        {
          printTo(outputTask2, "Ошибка. Проверьте адрес человека.", { append: false });
          return;
        }
        if ((typeof human_firstname !== 'string' || human_firstname.trim() === '') && (typeof human_secondname !== 'string' || human_secondname.trim() === '')) 
        {
          printTo(outputTask2, "Ошибка. Проверьте имя человека.", { append: false });
          return;
        }
        
        store.human = new Human(human_firstname, human_secondname, human_birthyear, human_address);
        printTo(
          outputTask2,
          `Human успешно создан!
Имя человека: ${store.human.human_first_name}
Фамилия человека: ${store.human.human_second_name}
Год рождения человека: ${store.human.human_date_of_birth}
Адрес человека: ${store.human.human_address}
          `,
          { append: false }
        );
      }
      else
      {
        printTo(
          outputTask2,
          "Ошибка. Человек уже создан.",
          { append: false }
        );
      }
    });
  }

  if (btnUpdateHumanAge) {
    btnUpdateHumanAge.addEventListener("click", () => {
      if(store.human)
      {
        const human_birthyear = inputHumanBirthyear.value.trim();

        if(!human_birthyear)
        {
          printTo(
            outputTask2,
            "Укажите новый год рождения",
            { append: false }
          );
          return;
        }
        if(store.human.human_age = human_birthyear)
          {
            printTo(
              outputTask2,
              `Дата рождения человека успешно изменена!
Новый год рождения человека: ${human_birthyear}
Текущий возраст человека: ${store.human.human_age}
              `,
              { append: false }
            );
          }
        else
          {
             printTo(
              outputTask2,
              "Ошибка. Проверьте возраст человека.",
              { append: false }
            );
          }
      }
      else{
        printTo(
          outputTask2,
          "Ошибка! Для начала создайте человека.",
          { append: false }
        );
      }
    });
  }
  
  if (btnUpdateHumanAddress) {
    btnUpdateHumanAddress.addEventListener("click", () => {
      if(store.human)
      {
        const human_address = inputHumanAddress.value.trim();

        if(!human_address)
        {
          printTo(
            outputTask2,
            "Укажите новый адрес человека",
            { append: false }
          );
          return;
        }

        old_address = store.human.GetHumanAddress();
        if(store.human.SetHumanAddress(human_address))
          {
            printTo(
              outputTask2,
              `Адрес человека успешно изменена!
Старый адрес человека: ${old_address}
Новый адрес человека: ${store.human.GetHumanAddress()}
              `,
              { append: false }
            );
          }
        else
          {
             printTo(
              outputTask2,
              "Ошибка. Проверьте новый адрес человека.",
              { append: false }
            );
          }
      }
      else{
        printTo(
          outputTask2,
          "Ошибка! Для начала создайте человека.",
          { append: false }
        );
      }
    });
  }

  // --- Student ---
  const btnCreateStudent = document.getElementById("btn-create-student");
  const btnUpdateStudentCourseGroup = document.getElementById(
    "btn-update-student-course-group"
  );
  const btnStudentFullname = document.getElementById("btn-student-fullname");

  const inputStudentFirstname = document.getElementById("student-firstname");
  const inputStudentLastname = document.getElementById("student-lastname");
  const inputStudentBirthyear = document.getElementById("student-birthyear");
  const inputStudentAddress = document.getElementById("student-address");
  const inputStudentFaculty = document.getElementById("student-faculty");
  const inputStudentCourse = document.getElementById("student-course");
  const inputStudentGroup = document.getElementById("student-group");
  const inputStudentId = document.getElementById("student-id");

  class Student extends Human {
    constructor(first_name, second_name, date_of_birth, address, faculty, course, group, id)
    {
      super(first_name, second_name, date_of_birth, address);
      
      this.student_faculty = faculty;
      this.student_course = course;
      this.student_group = group;
      this.student_id = id;
    }
    
    setCourseGroup(new_course, new_group) {
      let success_course = false;
      let success_group = false;
      
      let course_num = Number(new_course);
      let group_str = new_group.trim();
      
      if(!isNaN(course_num) && course_num > 0 && course_num < 7) 
        {
          this.student_course = course_num;
          success_course = true;
        }
      
      if(typeof group_str === 'string' && group_str !== "")
        {
          this.student_group = group_str;
          success_group = true;
        }
      return success_course && success_group;
    }

    getFullName() {
      return `${this.human_first_name} ${this.human_second_name}`;
    }
  }

 if (btnCreateStudent) {
    btnCreateStudent.addEventListener("click", () => {
      if(store.student == null)
      {
        const firstname = inputStudentFirstname.value.trim();
        const lastname = inputStudentLastname.value.trim();
        const birthyear_input = inputStudentBirthyear.value.trim();
        const address = inputStudentAddress.value.trim();
        const faculty = inputStudentFaculty.value.trim();
        const course = inputStudentCourse.value.trim();
        const group = inputStudentGroup.value.trim();
        const id_input = inputStudentId.value.trim();
        
        if(!firstname || !lastname || !birthyear_input || !address || !faculty || !course || !group || !id_input)
        {
          printTo(outputTask2, "Ошибка. Все поля студента должны быть заданы.", { append: false });
          return;
        }
        let birthyear = Number(birthyear_input);
        if (isNaN(birthyear) || birthyear < 1900 || birthyear > 2025) {
          printTo(outputTask2, "Ошибка. Год рождения студента должен быть корректным числом.", { append: false });
          return;
        } 
        let student_course = Number(course);
        if (isNaN(student_course) || student_course < 1 || student_course > 6) {
          printTo(outputTask2, "Ошибка. Курс студента должен быть корректным числом (1-6).", { append: false });
          return;
        }
        
        store.student = new Student(firstname, lastname, birthyear, address, faculty, student_course, group, id_input);
        
        printTo(
          outputTask2,
          `Student успешно создан!
ФИО: ${store.student.getFullName()}
Факультет: ${store.student.student_faculty}
Курс: ${store.student.student_course}, Группа: ${store.student.student_group}
№ зачетки: ${store.student.student_id}`,
          { append: false }
        );
      } else {
        printTo(outputTask2, "Ошибка. Студент уже создан.", { append: false });
      }
    });
  }

  if (btnUpdateStudentCourseGroup) {
    btnUpdateStudentCourseGroup.addEventListener("click", () => {
      if(store.student)
      {
        const new_course = inputStudentCourse.value.trim();
        const new_group = inputStudentGroup.value.trim();
        
        if(!new_course || !new_group)
        {
          printTo(outputTask2, "Укажите новый курс и группу", { append: false });
          return;
        }
        
        if(store.student.setCourseGroup(new_course, new_group))
        {
          printTo(
            outputTask2,
            `Курс и группа студента обновлены!
Новый Курс: ${store.student.student_course}
Новая Группа: ${store.student.student_group}`,
            { append: false }
          );
        } else {
          printTo(outputTask2, "Ошибка при обновлении курса/группы. Проверьте входные данные.", { append: false });
        }

      } else {
        printTo(outputTask2, "Ошибка! Для начала создайте студента.", { append: false });
      }
    });
  }

  if (btnStudentFullname) {
    btnStudentFullname.addEventListener("click", () => {
      if(store.student)
      {
        printTo(
          outputTask2,
          `ФИО студента: ${store.student.getFullName()}`,
          { append: true }
        );
      } else {
        printTo(outputTask2, "Ошибка! Для начала создайте студента.", { append: false });
      }
    });
  }

  const btnCreateFaculty = document.getElementById("btn-create-faculty");
  const btnUpdateFacultyCounts = document.getElementById(
    "btn-update-faculty-counts"
  );
  const btnFacultyGetDev = document.getElementById("btn-faculty-get-dev");
  const btnFacultyGetGroup = document.getElementById("btn-faculty-get-group");

  const inputFacultyName = document.getElementById("faculty-name");
  const inputFacultyGroups = document.getElementById("faculty-groups");
  const inputFacultyStudents = document.getElementById("faculty-students");
  const inputFacultyStudentIds = document.getElementById(
    "faculty-student-ids"
  );
  const inputFacultySearchGroup = document.getElementById(
    "faculty-search-group"
  );

  class Faculty {
    constructor(name, groups_count, students_count, student_list)
    {
      this.faculty_name = name;
      this.groups_count = groups_count;
      this.students_count = students_count;
      this.student_list = student_list || [];
    }

    setCounts(new_groups, new_students) {
      let success_groups = false;
      let success_students = false;

      let groups_num = Number(new_groups);
      let students_num = Number(new_students);

      if(!isNaN(groups_num) && groups_num >= 0) {
        this.groups_count = groups_num;
        success_groups = true;
      }
      
      if(!isNaN(students_num) && students_num >= 0) {
        this.students_count = students_num;
        success_students = true;
      }
      return success_groups && success_students;
    }

    getDev() {
      const dev_students = this.student_list.filter(student => {
          const id_str = String(student.student_id);
          return id_str.length >= 2 && id_str[1] === '3';
      });
      return dev_students.length;
    }

    getGroupe(group_name) {
      const students_in_group = this.student_list.filter(
        student => student.student_group === group_name
      );
      return students_in_group.map(student => student.getFullName());
    }
  }

 if (btnCreateFaculty) {
    btnCreateFaculty.addEventListener("click", () => {
      if(store.faculty == null)
      {
        const faculty_name = inputFacultyName.value.trim();
        const groups_count = inputFacultyGroups.value.trim();
        const students_count = inputFacultyStudents.value.trim();

        if(!faculty_name || !groups_count || !students_count)
        {
          printTo(outputTask2, "Ошибка. Все поля факультета должны быть заданы.", { append: false });
          return;
        }
        
        let groups_num = Number(groups_count);
        let students_num = Number(students_count);
        
        if (isNaN(groups_num) || groups_num < 0 || isNaN(students_num) || students_num < 0) {
          printTo(outputTask2, "Ошибка. Количество групп и студентов должно быть неотрицательным числом.", { append: false });
          return;
        }
        
        // ВАЖНО: Создаем фиктивный список студентов для тестов getDev/getGroupe
        // В реальном приложении этот список формируется динамически.
        const exampleStudents = [
            new Student("Иван", "Иванов", 2000, "Адрес1", "ФИТ", 3, "ГР2", "71201300"), // ДЭВИ: 7(ФИТ) 1(ПОИТ) 20 1 300
            new Student("Петр", "Петров", 2001, "Адрес2", "ФИТ", 4, "ГР2", "73211501"), // ДЭВИ: 7(ФИТ) 3(ДЭВИ) 21 1 501 <- ЭТО ДЭВИ
            new Student("Анна", "Сидорова", 2002, "Адрес3", "ИД", 1, "ГР1", "64222100"), // ДЭВИ: 6(ИД) 4(ПОИБМС) 22 2 100
            new Student("Мария", "Кузнецова", 2003, "Адрес4", "ФИТ", 2, "ГР2", "73231450"), // ДЭВИ: 7(ФИТ) 3(ДЭВИ) 23 1 450 <- ЭТО ДЭВИ
        ];

        store.faculty = new Faculty(faculty_name, groups_num, students_num, exampleStudents);
        
        printTo(
          outputTask2,
          `Faculty успешно создан!
Название: ${store.faculty.faculty_name}
Групп: ${store.faculty.groups_count}, Студентов: ${store.faculty.students_count}
(В списке для тестов: ${store.faculty.student_list.length} студентов)`,
          { append: false }
        );
      } else {
        printTo(outputTask2, "Ошибка. Факультет уже создан.", { append: false });
      }
    });
  }

  if (btnUpdateFacultyCounts) {
    btnUpdateFacultyCounts.addEventListener("click", () => {
      if(store.faculty)
      {
        const new_groups = inputFacultyGroups.value.trim();
        const new_students = inputFacultyStudents.value.trim();
        
        if(!new_groups || !new_students)
        {
          printTo(outputTask2, "Укажите новое количество групп и студентов", { append: false });
          return;
        }
        
        if(store.faculty.setCounts(new_groups, new_students))
        {
          printTo(
            outputTask2,
            `Количество групп и студентов Faculty обновлено!
Новые Группы: ${store.faculty.groups_count}
Новые Студенты: ${store.faculty.students_count}`,
            { append: false }
          );
        } else {
          printTo(outputTask2, "Ошибка при обновлении количества. Проверьте, что введены неотрицательные числа.", { append: false });
        }
      } else {
        printTo(outputTask2, "Ошибка! Для начала создайте факультет.", { append: false });
      }
    });
  }

  if (btnFacultyGetDev) {
    btnFacultyGetDev.addEventListener("click", () => {
      if(store.faculty)
      {
        const dev_count = store.faculty.getDev();
        printTo(
          outputTask2,
          `Количество студентов ДЭВИ: ${dev_count}`,
          { append: true }
        );
      } else {
        printTo(outputTask2, "Ошибка! Для начала создайте факультет.", { append: false });
      }
    });
  }

  if (btnFacultyGetGroup) {
    btnFacultyGetGroup.addEventListener("click", () => {
      if(store.faculty)
      {
        const group_name = inputFacultySearchGroup.value.trim();
        
        if(!group_name) {
            printTo(outputTask2, "Укажите имя группы для поиска.", { append: false });
            return;
        }
        
        const students_list = store.faculty.getGroupe(group_name);
        
        let output_message = students_list.length > 0
            ? `Студенты в группе ${group_name}:\n${students_list.join('\n')}`
            : `Студенты в группе ${group_name} не найдены.`;
            
        printTo(
          outputTask2,
          output_message,
          { append: true }
        );
      } else {
        printTo(outputTask2, "Ошибка! Для начала создайте факультет.", { append: false });
      }
    });
  }
});