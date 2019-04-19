// Страница создания курса (назови course.js - у меня уже эта функция есть, над прост теги докрутить)
var script = document.createElement('script');
script.src = "constructor.js";
document.getElementsByTagName('head')[0].appendChild(script);

function sendCourse() {
    $.ajax({
        url: "../ajax/course_create",
        data: ({
            category: $('#category').val(),
            spec: $('#spec').val(),
            name: $('#name').val(),

            tags:   getLocalList("list_tags");// строковый массив тегов 
                    // надо придумать как спарсить со страницы
                    // например - ["css", "tag1", "soso"]

            isPrivate: document.getElementById("isPrivate").checked == true
        }),
        success: function (data) {
            // Сюда прилетит строка с course_id. 
            // Если она пустая ("") - сообщить об ошибке (Ошибка сервера или какая-то такая херь)
            // Если в ней число - нужно его запомнить, затем редирект на страницу самого конструктора
            // (запомнить хз как, но как-то можно. Если не получится в hidden переменную страницы запихну)
			if (date === "")
				alert("Error sendCourse()");
			else{
				var course_id = parseInt(data,10);
				localStorage.setItem("course_id",JSON.stringify(course_id));
				window.location.href= "course_create.html";  // не знаю откуда будет вызываться
			}
        }
    });
}

// Страница самого конструктора

function sendCourseStruct() {
    $.ajax({
        url: "../ajax/course_struct",
        data: ({
            course_id: getLocalKey("course_id"); // собсна то значение, что ты запомнил  
            
            types:    getLocalList("list_title"); // строковый массив типов страниц, кол-во элементов = кол-во страниц созданных пользователем
                        // text - для страницы с текстом, test - для теста любого вида 
                        // например - ["text", "test", "test"]
        }),
        success: function (data) {
            // Сюда прилетит строковый массив с id страниц. (Например [5, 2635, 666])
            // Если он пустой ("") - сообщить об ошибке
            // Если в нём числа - парсим числа (page_id) и для каждого вызываем sendTextPage() или sendTestPage()
            // в зависимости от типа страницы (тип страницы можно определить по массиву types)
			if (data === "")
				alert("Error sendCourseStruct()");	// Если он пустой ("") - сообщить об ошибке
			else
				{
					// Если в нём числа - парсим числа (page_id) и для каждого вызываем sendTextPage() или sendTestPage()
					// в зависимости от типа страницы (тип страницы можно определить по массиву types)
					for (var i = 0; i < data.length; i+=2){
					  var page_id = parseInt(data.charAt(i),10);
					  console.log(page_id);//debug
					  if(page_id !== 0){
						if (types[i/2] === "text")
						  sendTextPage(course_id, page_id);
						else
						  sendTestPage(course_id, page_id);
					  }
					  else
						console.log("Error! null page_id");
					}
				}
        }
    });
}

function sendTextPage(course,page) {
    $.ajax({
        url: "../ajax/course_page_text",
        data: ({
            course_id:  course; // собсна то значение, что ты запомнил  
            
            page_id:   page // значение из sendCourseStruct()
			
			var list_pageId = getLocalList("list_pageId");
			var index = indexOf(list_pageId, page);
			var list_title = getLocalList("list_title");
			var list_text = getLocalList("list_text");

            title:   list_title[index];  // Заголовок страницы
            
            text:   list_text[index];    // Текст страницы

            file_data:  // Необязательно пока что делать
        }),
        success: function (data) {
            // Сюда могу сообщить об ошибке, но пока что её игнорим, здесь можно нихуя не добавлять
        }
    });
}
//-------------------------------------------------------- Создание тестовых страницы пока что делаю
function sendTestPage() {
    $.ajax({
        url: "../ajax/course_page_test",
        data: ({
            course_id:  course; // собсна то значение, что ты запомнил  
            
            page_id:   page // значение из sendCourseStruct()
			
			var list_pageId = getLocalList("list_pageId");
			var index = indexOf(list_pageId, page);
			var list_title = getLocalList("list_title");

            title:   list_title[index];  // Заголовок страницы
            
            question:   // Текст вопроса
			
			var list_answer = getLocalList("list_answer");
			var list_right_answer =  getLocalList("list_right_answer");
            ans:        // Текст вариантов ответа
                        // Если вариант ответа один - разделитель офк не нужен (Пример "Ответ1")
                        // Если вариантов ответа несколько - разделитель нужен. Разделителем будет |}|{ona| (Пример "Ответ1|}|{ona|Ответ2")
            
            right_ans:  // Текст верных вариантов ответа. Правила такие же, что и в ans 
                        // ИЛИ можешь склеить верные номера ответов в строку - например ans = "Ответ1|}|{ona|Ответ2|}|{ona|Ответ3"
                        // Если верными будут ответы 1 и 3, то отправляешь "13" или "31", главное, чтобы номер соответствовал порядку в ans 
                        // Второй варик предпочтительнее, напиши потом, чо выбрал
        }),
        success: function (data) {
            // Сюда могу сообщить об ошибке, но пока что её игнорим, здесь можно нихуя не добавлять
        }
    });
}
