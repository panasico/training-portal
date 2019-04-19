function getListTitles(pageID, list_pageID, list_titles){
	var index = indexOf(list_pageID,pageID);
	var list_pages = document.getElementById('list-pages');
	var new_page = document.createElement('li');
	new_page.innerHTML = list_titles[index];
	new_page.classList.add("pages");
	new_page.id = pageID;
	new_page.onclick = function(){
		clickCurrentPage(pageID);
	}
	list_pages.appendChild(new_page);
	$('#list-pages').sortable({
			 change: function( event, ui ) {
				 //здесь надо повесить запоминание порядка при перетягивании
			 }
		});
	console.log(pageID);
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
function setLocalLists1(list_answer, list_right_answer){
	localStorage.setItem('list_answer', JSON.stringify(list_answer));
	localStorage.setItem('list_right_answer', JSON.stringify(list_right_answer));
}
function start_init(){
	//получаем название курса
	document.getElementById('course_name').innerHTML = getLocalKey('course_name');
	//получаем тип курса
	if(getLocalKey('type_course'))
		document.getElementById('type_course').innerHTML = "[Общедоступный курс]";
	else
		document.getElementById('type_course').innerHTML = "[Назначенный курс]";
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

