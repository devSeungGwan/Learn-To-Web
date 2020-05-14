const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;

  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;

  delBtn.innerText = '👏완료';
  span.innerText = text;
  delBtn.addEventListener('click', deleteToDo);

  //style Button
  delBtn.style.fontSize = '20px';
  delBtn.style.backgroundColor = '#019875';
  delBtn.style.marginRight = '20px';
  delBtn.style.marginBottom = '10px';
  delBtn.style.color = 'white';
  delBtn.style.border = 'none';

  //style Text

  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;

  li.style.alignContent = 'center';

  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: toDos.length + 1,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
