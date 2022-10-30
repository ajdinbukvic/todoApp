import modalView from './modalView.js';
import todoView from './todoView.js';
const Todo = new todoView();
const Modal = new modalView();
Todo.getTodos();
//const modal = document.querySelector('.modal');
//const overlay = document.querySelector('.overlay');
//const btnCloseModal = document.querySelector('.close-modal');
const btnAdd = document.querySelector('#btn-add');

//const footer = document.querySelector('.footer');

// const addForm = document.querySelector('.add-form');
// const title = document.querySelector('#title');
// const description = document.querySelector('#description');
// const deadline = document.querySelector('#deadline');
//const btnSave = document.querySelector('#btn-save');

const search = document.querySelector('#search');

// const openModal = type => {
//   type === 'add' ? modal('Add new todo:') : modal('Edit current todo:');
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
//   document.body.style.overflow = 'hidden';
//   window.scrollTo(0, 0);
// };

// const closeModal = () => {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
//   document.body.style.overflow = 'scroll';
//   footer.style.bottom = 0;
//   title.value = description.value = deadline.value = '';
// };

const addTodoHandler = () => {
  const addForm = document.querySelector('.add-form');
  const title = document.querySelector('#title');
  const description = document.querySelector('#description');
  const deadline = document.querySelector('#deadline');
  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!title.value || !description.value || !deadline.value) {
      alert('You must fill in all fields!');
      return;
    }
    if (new Date(deadline.value) < Date.now()) {
      alert('Deadline must be bigger than current date!');
      return;
    }
    if (title.value.length < 5) {
      alert('Title must be at least 5 characters long!');
      return;
    }
    const newTodo = {
      title: title.value,
      description: description.value,
      deadline: deadline.value,
    };
    Modal.closeModal();
    title.value = description.value = deadline.value = '';
    Todo.addTodo(newTodo);
  });
};

btnAdd.addEventListener('click', () => {
  Modal.openModal('add', undefined);
  Modal.formSubmit('add', undefined);
});
//btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', e => {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

// addForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   if (!title.value || !description.value || !deadline.value) return;
//   if (new Date(deadline.value) < Date.now()) {
//     alert('Deadline must be bigger than current date!');
//     return;
//   }
//   const newTodo = {
//     title: title.value,
//     description: description.value,
//     deadline: deadline.value,
//   };
//   Modal.closeModal();
//   title.value = description.value = deadline.value = '';
//   Todo.addTodo(newTodo);
// });

search.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    Todo.searchTodos(search.value);
  }
});
