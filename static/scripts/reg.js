//функция добавляет message вниз div по idParent
function addErrorText(message, idParent) {
    var messageBox = document.createElement('span');
    messageBox.innerHTML = message;
    messageBox.classList.remove("successText");
    messageBox.classList.add("errorText");
    messageBox.style.borderColor = "red";
    messageBox.id = "errorText_" + idParent;
    document.getElementById(idParent).appendChild(messageBox);

    return messageBox.id;
}

function addSuccessText(message, idParent) {
    var messageBox = document.createElement('span');
    messageBox.innerHTML = message;
    messageBox.classList.remove("errorText");
    messageBox.classList.add("successText");
    messageBox.style.borderColor = "green";
    messageBox.id = "successText_" + idParent;
    document.getElementById(idParent).appendChild(messageBox);

    return messageBox.id;
}

//удаляет message по id
function removeErrorText(errorTextId) {
    var elem = document.getElementById(errorTextId);

    elem.parentNode.removeChild(elem);
}

//устанавливает полю красный стиль
function setErrorCSS(idEditbox) {
    var element = document.getElementById(idEditbox);

    element.classList.add("errorEditbox");
    element.style.borderColor = "red";
}

//устанавливает полю зеленый стиль
function setSuccessCSS(idEditbox) {
    var element = document.getElementById(idEditbox);

    element.classList.add("successEditbox");
    element.style.borderColor = "green";
}

function clearError(errorTextId) {
    if (typeof errorTextId !== 'undefined') {
        removeErrorText(errorTextId);
        errorTextId = undefined;
    }
}


var loginErrorTextId = undefined;

function checkUsername() {
    clearError(loginErrorTextId);

    var login = document.getElementById("username").value;
    if (login.search(/^[a-zA-Z0-9_-]{6,16}$/) != -1) {
        // Восстановить вид страницы
        //если мы уже добавляли ошибку

        setSuccessCSS("username"); 		//делаем цвет зеленым

        sendUsername();
    } else {
        // Вывести правила ввода (логин от 6 до 16 символов, только цифры, лат. букы и _ -)
        //добавляем текст ошибки
        loginErrorTextId = addErrorText("Логин должен быть от 6 до 16 символов (цифры/лат.буквы/_/-)", "username-box")
        setErrorCSS("username"); 		//делаем цвет красным
    }
}

var emailErrorTextId = undefined;

function checkEmail() {
    clearError(emailErrorTextId);

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("email").value;
    if (email.search(re) != -1) {
        // Восстановить вид страницы
        setSuccessCSS("email");

        sendEmail();
    } else {
        // Вывести правила ввода (введите настоящий email)
        // делаем цвет красным
        emailErrorTextId = addErrorText("Введите настоящий E-mail!", "email-box");
        setErrorCSS("email");
    }
}

function sendUsername() {
    $.ajax({
        url: "ajax/reg_username",
        data: ({username: $('#username').val()}),
        success: function (data) {
            if (data) {
                // Восстановить нормальный вид страницы
                loginErrorTextId = addSuccessText("Логин свободен", "username-box");
                setSuccessCSS("username"); 		//делаем цвет зеленым
            } else {
                // Вывести ошибку (логин уже используется)
                loginErrorTextId = addErrorText("Этот логин уже занят!", "username-box");
                setErrorCSS("username"); 		//делаем цвет красным
            }
        }
    });
}

function sendEmail() {
    $.ajax({
        url: "ajax/reg_email",
        data: ({email: $('#email').val()}),
        success: function (data) {
            if (data) {
                // Восстановить нормальный вид страницы
                emailErrorTextId = addSuccessText("E-mail свободен", "email-box");
                setSuccessCSS("email");
            } else {
                // Вывести ошибку (email уже используется)
                emailErrorTextId = addErrorText("Данный E-mail уже используется!", "email-box");
                setErrorCSS("email"); 		//делаем цвет красным
            }
        }
    });
}
