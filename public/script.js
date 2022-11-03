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
  const btns = document
    .querySelectorAll('.btn-filter')
    .forEach(btn => btn.classList.remove('current'));
  el.classList.add('current');
  Todo.getTodos(el.textContent.toLowerCase().trim());
});

sortBtnsContainer.addEventListener('click', e => {
  const el = e.target.closest('.btn-sort');
  if (!el) return;
  const btns = document
    .querySelectorAll('.btn-sort')
    .forEach(btn => btn.classList.remove('current'));
  el.classList.add('current');
  Todo.getTodos(undefined, el.textContent.toLowerCase().trim());
});
