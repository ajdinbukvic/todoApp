import todoView from './todoView.js';
const Todo = new todoView();
Todo.getTodos();
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnAdd = document.querySelector('#btn-add');

const footer = document.querySelector('.footer');

const addForm = document.querySelector('.add-form');
const btnSave = document.querySelector('#btn-save');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const deadline = document.querySelector('#deadline');

const search = document.querySelector('#search');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.body.style.overflow = 'scroll';
  footer.style.bottom = 0;
  title.value = description.value = deadline.value = '';
};

btnAdd.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

addForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!title.value || !description.value || !deadline.value) return;
  closeModal();
  Todo.addTodo();
});

search.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    Todo.searchTodo();
  }
});
