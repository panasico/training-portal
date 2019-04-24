function getListTitles(pageID, list_pageID, list_titles){
    var index = indexOf(list_pageID,pageID);
    var list_pages = document.getElementById('list-pages');
    var new_page = document.createElement('li');
    new_page.innerHTML = list_titles[index];
    new_page.classList.add("pages");
    new_page.id = pageID;
    new_page.onclick = function(){
        //clickCurrentPage(pageID);
    }
    list_pages.appendChild(new_page);
    $('#list-pages').sortable({
        change: function( event, ui ) {
            //здесь надо повесить запоминание порядка при перетягивании
        }
    });
}

function getLocalList(key){
    var res = JSON.parse(localStorage.getItem(key));
    if (res === null)
        res = []
    return res;
}
function getLocalKey(key){
    var res = JSON.parse(localStorage.getItem(key));
    if (res === null)
        res = 0;
    return res;
}
function getLocalBool(key){
    var res = JSON.parse(localStorage.getItem(key));
    if (res == null || res == "false")
        res = false;
    else
        return true;
    return res;
}
function setLocalLists(list_pageId, list_types, list_title, list_text){
    localStorage.setItem('list_pageId', JSON.stringify(list_pageId));
    localStorage.setItem('list_types', JSON.stringify(list_types));
    localStorage.setItem('list_title', JSON.stringify(list_title));
    localStorage.setItem('list_text', JSON.stringify(list_text));
}
function setLocalLists1(list_answer, list_right_answer, list_points){
    localStorage.setItem('list_answer', JSON.stringify(list_answer));
    localStorage.setItem('list_right_answer', JSON.stringify(list_right_answer));
	localStorage.setItem('list_points', JSON.stringify(list_points));	
}
function start_init(){
    //получаем название курса
    document.getElementById('course_name').innerHTML = getLocalKey('course_name');
    //получаем тип курса
    if(getLocalKey('type_course'))
		document.getElementById('type_course').innerHTML = "[Назначенный курс]";
    else
		document.getElementById('type_course').innerHTML = "[Общедоступный курс]";
    var res = getLocalBool('flag_open');
    return res;
}

function getCurrentPage(){
    return getLocalKey('current_page');
}

function clickCurrentPage(current_page){
    localStorage.setItem('flag_open', JSON.stringify(true));
    localStorage.setItem('current_page', JSON.stringify(current_page));
    setLocalLists(list_pageId,list_types, list_title, list_text);
    window.location.reload();
}

function indexOf(list, object){
    for (var i = 0; i < list.length; i++)
        if(list[i] === object)
            return i;
    return -1;
}
function indexOfTest(list_pageId, object, list_types){
    for (var i = 0, j = -1; i < list_pageId.length; i++)
        if(list_types[i] === 'text')
            j++;
    if(list_pageId[i] === object)
        return j;
    return -1;
}

function change(){
    document.getElementById("btn_save_page").disabled = false;
}
function sorry(){
    swal("Простите ☹", "Это пока что в разработке", "info");
}

function getTags() {
    var div_tags = document.getElementById("tags");
    var list_spans = div_tags.getElementsByTagName('span');
    var list_tags = "";
    for (var i = 0; i < list_spans.length; i++) {
        list_tags += list_spans[i].innerHTML + ",";
    }
    if (list_tags.length > 0) {
        list_tags = list_tags.substr(0, list_tags.length - 1);
    }

    return list_tags;
}

var answer = "";
var succ_ans = "";
function getAnswer() {
    if ($("#succes-input").length)
        succ_ans += document.getElementById("succes-input").value;

    for (var i = 1; i < 6; i++){
        if ($("#check1").length)
            var check = document.getElementById("check"+i).value;
        else
            check = true;
        if($("#input"+i).length){
            var input = document.getElementById("input"+i).value;
            if(input !== ""){
                if (check === true){
                    if (i !== 1)
                        succ_ans += "|}|{ona|";
                    succ_ans += input;
                }
                if (i !== 1)
                    answer += "|}|{ona|";
                answer += input;
            }
        }
    }
}

function sendCourse() {
    $.ajax({
        url: "../ajax/course_create",
        data: ({
            categoryNum: $('#category').val(),
            tags: getTags(), //getTags()
            name: getLocalKey("course_name"),
            description: getLocalKey("description"),
            isPrivate: getLocalKey("type_course")
            }),
        success: function (data) {
            if (data === "")
                alert("Ошибка сервера");	// Если она пустая ("") - сообщить об ошибке (Ошибка сервера или какая-то такая херь)
            else
            {
                // Если в ней число - нужно его запомнить, затем редирект на страницу самого конструктора
                // (запомнить хз как, но как-то можно. Если не получится в hidden переменную страницы запихну)

                if (data === "")
                    alert("Error sendCourse()");
                else{
                    var course_id = parseInt(data,10);
                    localStorage.setItem("course_id",JSON.stringify(course_id));
                    window.location.href = "/constructor/text_designer";
                }
            }
        }
    });
}

function sendCourseStruct() {
    var typeList = getLocalList("list_types");
    var courseId = getLocalKey("course_id");

    $.ajax({
        url: "../ajax/course_struct",
        data: ({
            type_list: typeList + "",
            course_id: courseId // собсна то значение, что ты запомнил
            // строковый массив типов страниц, кол-во элементов = кол-во страниц созданных пользователем
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
                //alert(data);
                // Если в нём числа - парсим числа (page_id) и для каждого вызываем sendTextPage() или sendTestPage()
                // в зависимости от типа страницы (тип страницы можно определить по массиву types)
                // for (var i = 0; i < data.length; i+=1){
                //     var page_id = parseInt(data.charAt(i),10);
                //     console.log(page_id);//debug
                //     if(page_id !== 0){
                //         if (typeList[i] === "text")
                //             sendTextPage(courseId, page_id);
                //         else
                //             sendTestPage(courseId, page_id);
                //     }
                //     else
                //         console.log("Error! null page_id");
                // }

                var ids = data.split(",");
                for (var i = 0; i < ids.length; i+=1) {
                    var page_id = parseInt(ids[i], 10);
                    if(page_id !== 0) {
                        if (typeList[i] === "text")
                            sendTextPage(courseId, page_id, i + 1);
                        else
                            sendTestPage(courseId, page_id, i + 1);
                    } else
                        console.log("Error! null page_id");
                }
                //localStorage.setItem('list_pageId', JSON.stringify(ids));

            }
        }
    });
}

function sendTextPage(course, page, local_page) {
    var list_pageId = getLocalList("list_pageId");
    alert("List: " + list_pageId);
    var index = indexOf(list_pageId, "page" + local_page);
    alert("Find by: page" + local_page);
    alert("Index: " + index);
    var list_title = getLocalList("list_title");
    var list_text = getLocalList("list_text");

    $.ajax({
        url: "../ajax/course_page_text",
        data: ({
            course_id:  course, // собсна то значение, что ты запомнил
            page_id:   page, // значение из sendCourseStruct()
            title:   list_title[index] + "",  // Заголовок страницы
            text:   list_text[index] + "",    // Текст страницы
            file_data:  ""// Необязательно пока что делать
        }),
    success: function (data) {
        // Сюда могу сообщить об ошибке, но пока что её игнорим, здесь можно нихуя не добавлять
    }
});
}
//-------------------------------------------------------- Создание тестовых страницы пока что делаю
function sendTestPage(course, page, local_page) {
    var list_pageId = getLocalList("list_pageId");
    alert("List: " + list_pageId);
    var index = indexOf(list_pageId, "page" + local_page);
    alert("Non test index: " + index);
    var list_title = getLocalList("list_title");
    var list_text = getLocalList("list_text");

    var indexTest = indexOfTest(list_pageId, page, list_types);
    alert("Test index: " + indexTest);
    var list_answer = getLocalList("list_answer");
    var list_right_answer = getLocalList("list_right_answer");

    $.ajax({
        url: "../ajax/course_page_test",
        data: ({
            course_id: course, // собсна то значение, что ты запомнил
            page_id: page, // значение из sendCourseStruct()
            title: list_title[index] + "",  // Заголовок страницы
            question: list_text[index] + "",  // Текст вопроса
            ans: list_answer[indexTest] + "",      // Текст вариантов ответа
            // Если вариант ответа один - разделитель офк не нужен (Пример "Ответ1")
            // Если вариантов ответа несколько - разделитель нужен. Разделителем будет |}|{ona| (Пример "Ответ1|}|{ona|Ответ2")
            rightAns: list_right_answer[indexTest] + ""// Текст верных вариантов ответа. Правила такие же, что и в ans
            // ИЛИ можешь склеить верные номера ответов в строку - например ans = "Ответ1|}|{ona|Ответ2|}|{ona|Ответ3"
            // Если верными будут ответы 1 и 3, то отправляешь "13" или "31", главное, чтобы номер соответствовал порядку в ans
            // Второй варик предпочтительнее, напиши потом, чо выбрал
        }),
        success: function (data) {
            // Сюда могу сообщить об ошибке, но пока что её игнорим, здесь можно нихуя не добавлять
        }
    });
}

