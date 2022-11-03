import modalView from './modalView.js';
import todoView from './todoView.js';

const Modal = new modalView();
const Todo = new todoView();

const btnAdd = document.querySelector('#btn-add');
const search = document.querySelector('#search');

const filterBtnsContainer = document.querySelector('.footer-filter-btns');
const sortBtnsContainer = document.querySelector('.footer-sort-btns');

Todo.getTodos();

btnAdd.addEventListener('click', () => {
  Modal.openModal('add', undefined);
  Modal.formSubmit('add', undefined);
});

search.addEventListener('keyup', () => {
  Todo.searchTodos(search.value);
});

filterBtnsContainer.addEventListener('click', e => {
  const el = e.target.closest('.btn-filter');
  if (!el) return;
  Todo.getTodos(el.textContent.toLowerCase().trim());
});

sortBtnsContainer.addEventListener('click', e => {
  const el = e.target.closest('.btn-sort');
  if (!el) return;
  Todo.getTodos(undefined, el.textContent.toLowerCase().trim());
});
