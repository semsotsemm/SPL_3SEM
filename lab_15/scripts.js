
document.getElementById('mainForm').addEventListener('submit', function(event) 
{
	event.preventDefault(); 

    const errorMessages = document.querySelectorAll('.error-msg');
    errorMessages.forEach(msg => msg.style.display = 'none');

    let isValid = true;

    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    const surname = document.getElementById('surname');
    const firstname = document.getElementById('firstname');

    if (!nameRegex.test(surname.value) || surname.value.length > 20 || surname.value.trim() === "") 
    {
        document.getElementById('error-surname').style.display = 'block';
        isValid = false;
    }

    if (!nameRegex.test(firstname.value) || firstname.value.length > 20 || firstname.value.trim() === "") 
    {
        document.getElementById('error-firstname').style.display = 'block';
        isValid = false;
    }

    const emailRegex = /^\S+@[a-zA-Z]{2,5}\.[a-zA-Z]{2,3}$/;
    const email = document.getElementById('email');
    if (!emailRegex.test(email.value)) 
    {
        document.getElementById('error-email').style.display = 'block';
        isValid = false;
    }

    const phoneRegex = /^\(0\d{2}\)\d{3}-\d{2}-\d{2}$/;
    const phone = document.getElementById('phone');
    if (!phoneRegex.test(phone.value)) 
    {
        document.getElementById('error-phone').style.display = 'block';
        isValid = false;
    }

    const about = document.getElementById('about');
    if (about.value.trim() === "" || about.value.length > 250)
    {
        document.getElementById('error-about').style.display = 'block';
        isValid = false;
    }

    if (isValid) 
    {
        const city = document.getElementById('city').value;
        const isBSTU = document.getElementById('isBSTU').checked;
        const courseRadio = document.querySelector('input[name="course"]:checked');
        const course = courseRadio ? courseRadio.value : null;

        if (!course) 
        {
            alert("Пожалуйста, выберите курс!");
            return;
        }

        if (city !== "Минск" || course !== "3" || !isBSTU)
        {
            const confirmData = confirm("Ваши данные (Город, Курс или ВУЗ) отличаются от ожидаемых (Минск, 3 курс, БГТУ). Вы уверены в своем ответе?");
            if (confirmData) 
            {
                alert("Форма успешно проверена и готова к отправке!");
            } 
        } 
        else 
        {
            alert("Все данные верны! Форма отправлена.");
        }
    }
});