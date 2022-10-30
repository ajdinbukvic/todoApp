import todoView from './todoView.js';
const Todo = new todoView();

export default class {
  modalContainer = document.querySelector('.modal');
  overlay = document.querySelector('.overlay');

  generateModal(typeText, obj) {
    this.modalContainer.innerHTML = `
      <button class="close-modal">&times;</button>
      <h2 class="form-heading">${typeText}</h2>
      <form class="add-form">
        <div class="input-item">
          <label for="title">Title:</label
          ><input type="text" name="title" id="title" value="${
            obj.title ? obj.title : ''
          }"/>
        </div>
        <div class="input-item">
          <label for="description">Description:</label>
          <textarea rows="4" cols="50" id="description">${
            obj.description ? obj.description : ''
          }</textarea>
        </div>
        <div class="input-item">
          <label for="deadline">Deadline:</label>
          <input type="date" name="deadline" id="deadline" value="${
            obj.deadline ? obj.deadline : ''
          }" />
        </div>
        <button type="submit" class="btn" id="btn-save">Save</button>
      </form>`;
  }
  openModal(type, obj) {
    type === 'add'
      ? this.generateModal('Add new todo:', '')
      : this.generateModal('Edit current todo:', obj);
    this.modalContainer.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    this.addEvents();
    //this.formSubmit();
  }
  closeModal() {
    this.modalContainer.classList.add('hidden');
    this.overlay.classList.add('hidden');
    document.body.style.overflow = 'scroll';
    const footer = document.querySelector('.footer');
    footer.style.bottom = 0;
  }
  addEvents() {
    const btnCloseModal = document.querySelector('.close-modal');
    btnCloseModal.addEventListener('click', this.closeModal.bind(this));
    this.overlay.addEventListener('click', this.closeModal.bind(this));
    const target = this;
    document.addEventListener('keydown', e => {
      if (
        e.key === 'Escape' &&
        !this.modalContainer.classList.contains('hidden')
      ) {
        target.closeModal();
      }
    });
  }
  formSubmit(type, id) {
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
      type === 'add' ? Todo.addTodo(newTodo) : Todo.updateTodo(newTodo, id);
    });
  }
}
