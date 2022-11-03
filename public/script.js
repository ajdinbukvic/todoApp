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

const sortByOldest = document.querySelector('#btn-sort-oldest');

sortByOldest.addEventListener('click', function (e) {
  Todo.getTodos(undefined, 'oldest');
});

const sortByNewest = document.querySelector('#btn-sort-newest');

sortByNewest.addEventListener('click', function (e) {
  Todo.getTodos(undefined, 'newest');
});

const filterAll = document.querySelector('#btn-filter-all');
const filterActive = document.querySelector('#btn-filter-active');
const filterCompleted = document.querySelector('#btn-filter-completed');
const filterFinished = document.querySelector('#btn-filter-finished');

filterAll.addEventListener('click', function (e) {
  Todo.getTodos('all');
});

filterActive.addEventListener('click', function (e) {
  Todo.getTodos('active');
});

filterCompleted.addEventListener('click', function (e) {
  Todo.getTodos('completed');
});

filterFinished.addEventListener('click', function (e) {
  Todo.getTodos('finished');
});
