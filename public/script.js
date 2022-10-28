const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnAdd = document.querySelector('#btn-add');

const footer = document.querySelector('.footer');

const addForm = document.querySelector('.add-form');
console.log(addForm);
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
};

btnAdd.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const addTodo = () => {
  console.log('test');
};

addForm.addEventListener('submit', e => {
  e.prevetDefault();
  addTodo();
});
