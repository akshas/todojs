window.onload = function() {
	var field = document.querySelector('.field');
	var addButton = document.querySelector('#button_add');
	var removeButton = document.querySelector('#button_remove');
	var todoList = document.querySelector('.todo_list');
	var pattern = /(\d){1,3}/g;
	var prefix = 'data_';
	var todoArray = [];
	var attribute = 'data-id';
	field.focus();
if(localStorage.length > 0){
	var todoArray = JSON.parse(localStorage.getItem('todoList'));
	var i = todoArray.length;
	todoArray = todoArray.map(function(item, i){
	item.id = prefix + i;
			return item;
		});

	todoArray.forEach(function(item){
		var li = document.createElement('li')
		li.className = "item" ;
		li.setAttribute(attribute, item.id);
		var text = document.createTextNode(item.value);
			var todo = {
			id: item.id,
			value: item.value,
			checked: false
		};
		if(item.checked){
			li.className = "done";
			todo.checked = true;
		}
		li.appendChild(text);
		todoList.appendChild(li);
	});

}
else{
	var i = 0;
}

/* события */

	addButton.addEventListener('click', addLi);
	removeButton.addEventListener('click', removeLi);

// находим все элементы списка и устанавливаем обработчик событий на каждый

	todoList.addEventListener('click', done);
	todoList.addEventListener('dblclick', deleteItem);

// обработчик на сабмит формы
document.querySelector('form').addEventListener('submit', addLi);

// функции
/* добавление элемента списка */
function addLi(e){
	e.preventDefault();
	if(field.value.length > 0){
		var li = document.createElement('li');
		li.className = "item" ;
		li.setAttribute(attribute, prefix + i);
		var text = document.createTextNode(field.value);
		li.appendChild(text);
		todoList.appendChild(li);
		var todo = {
			id: prefix + i,
			value: field.value,
			checked: false
		};
		todoArray.push(todo);
		localStorage.setItem("todoList", JSON.stringify(todoArray));
		field.value = '';
		field.focus();
		i++;
	}
}

/* добавление класса done */
function done(e){
	var target = e.target;
	target.classList.toggle('done');
	var id = target.getAttribute(attribute);
	var match = id.match(pattern);
	var done = todoArray[match[0]]
	done.checked == false ? done.checked = true : done.checked = false;
	localStorage.setItem('todoList', JSON.stringify(todoArray));
}

/* удаление элемента */
function deleteItem(e){
	var target = e.target;
	var id = target.getAttribute(attribute);
	target.remove();
	var match = id.match(pattern);
	todoArray.splice([match[0]],1);
	todoArray = todoArray.map(function(item, i){
	item.id = prefix + i;
			return item;
		});
	localStorage.setItem('todoList', JSON.stringify(todoArray));
	var liItem = document.querySelectorAll('.item');
	liItem.forEach(function(item, i){
		item.setAttribute(attribute, prefix + i);
	});
}

/* удаление всех эелементов списка со страницы и локал сториджа */
function removeLi(){
	todoList.innerHTML = '';
	localStorage.clear();
	i = 0;
	todoArray = [];
};

}
