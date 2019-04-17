function getListTitles(title, pageID){
	var list_pages = document.getElementById('list-pages');
	var new_page = document.createElement('li');
	new_page.innerHTML = title;
	new_page.classList.add("pages");
	new_page.id = pageID;
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
function setLocalLists(list_pageId, list_types, list_title, list_text){
	localStorage.setItem('list_pageId', JSON.stringify(list_pageId));
	localStorage.setItem('list_types', JSON.stringify(list_types));
	localStorage.setItem('list_title', JSON.stringify(list_title));
	localStorage.setItem('list_text', JSON.stringify(list_text));
}