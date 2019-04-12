//функция добавляет message вниз div по idParent
function addErrorText(message, idParent){
	var messageBox = document.createElement('span');
	messageBox.innerHTML = message;
	messageBox.classList.add("errorText")
	messageBox.id = "errorText_"+idParent;
	document.getElementById(idParent).appendChild(messageBox);
	return messageBox.id;
}
//удаляет message по id
function removeErrorText(errorTextId){
	var elem = document.getElementById(errorTextId);
	elem.parentNode.removeChild(elem);
}
//устанавливает полю красный стиль
function setErrorCSS(idEditbox){
	var element = document.getElementById(idEditbox);
	element.classList.add("errorEditbox");
}
//устанавливает полю зеленый стиль
function setSuccessCSS(idEditbox){
	var element = document.getElementById(idEditbox);
	element.classList.add("successEditbox");
}
	

var loginErrorTextId = undefined;
function checkLogin() {
    var login = document.getElementById("username");
    if (login.search(/^[a-z0-9_-]{6,16}$/) != -1) {
        // Восстановить вид страницы
		//если мы уже добавляли ошибку
		if (typeof loginErrorTextId !== 'undefined') {
			removeErrorText(loginErrorTextId);
			loginErrorTextId = undefined;
		}
		setSuccessCSS("username"); 		//делаем цвет зеленым
        sendLogin();
    } else {
        // Вывести правила ввода (логин от 6 до 16 символов, только цифры, лат. букы и _ -)
		//добавляем текст ошибки
		loginErrorTextId = addErrorText("логин от 6 до 16 символов, только цифры, лат. букы и _ -", "username-box")
		setErrorCSS("username"); 		//делаем цвет красным
    }
}

var emailErrorTextId = undefined;
function checkEmail() {
    var email = document.getElementById("email");
    if (login.search(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/) != -1) {
        // Восстановить вид страницы
		if (typeof loginErrorTextId !== 'undefined') {
			removeErrorText(emailErrorTextId);
			emailErrorTextId = undefined;
		}
		setSuccessCSS("email");
        sendLogin();
        sendEmail();
    } else {
        // Вывести правила ввода (введите настоящий email)
		emailErrorTextId = addErrorText("введите настоящий email", "email-box")
		setErrorCSS("email"); 		//делаем цвет красным
    }
}

function sendLogin() {
    $.ajax({
        url: 'reg_nickname',
        data: ({username : $('#username').val()}),
        success: function(data) {
            if (data) {
                // Восстановить нормальный вид страницы
            } else {
                // Вывести ошибку (логин уже используется)
            }
        }
    });
}

function sendEmail() {
    $.ajax({
        url: 'reg_email',
        data: ({email : $('#email').val()}),
        success: function(data) {
            if (data) {
                // Восстановить нормальный вид страницы
            } else {
                // Вывести ошибку (email уже используется)
            }
        }
    });
}

