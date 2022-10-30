import modalView from './modalView.js';
import todoView from './todoView.js';

const Modal = new modalView();
const Todo = new todoView();

const btnAdd = document.querySelector('#btn-add');
const search = document.querySelector('#search');

Todo.getTodos();

btnAdd.addEventListener('click', () => {
  Modal.openModal('add', undefined);
  Modal.formSubmit('add', undefined);
});

search.addEventListener('keyup', function (e) {
  Todo.searchTodos(search.value);
});
