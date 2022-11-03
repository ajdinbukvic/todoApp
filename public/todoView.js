import modalView from './modalView.js';

export default class {
  apiUrl = 'http://127.0.0.1:3000/api/todos';
  todoContainer = document.querySelector('.todo-container');
  todos = [];
  statusCount = [];
  filter = 'all';
  sort = 'newest';

  async getTodos(filterBy, sortBy) {
    try {
      if (sortBy) this.sort = sortBy;
      if (filterBy) this.filter = filterBy;
      const [res1, res2] = await Promise.all([
        fetch(`${this.apiUrl}?sort=${this.sort}&filter=${this.filter}`),
        fetch(`${this.apiUrl}/todo-status-count`),
      ]);
      if (!res1.ok || !res2.ok) throw new Error('Problem with getting data...');
      const data1 = await res1.json();
      const data2 = await res2.json();
      if (data1.data.todos && data2.data.statusCount) {
        this.todos = data1.data.todos;
        this.statusCount = data2.data.statusCount;
        this.init();
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getTodo(id) {
    try {
      const res = await fetch(`${this.apiUrl}/${id}`);
      if (!res.ok) throw new Error('Problem with getting data...');
      const data = await res.json();
      if (data.data.todo) {
        return data.data.todo;
      }
    } catch (err) {
      console.log(err);
    }
  }
  generateTemplate(todo) {
    const formattedDate = todo.deadline.split('T').at(0);
    const notActive =
      todo.status !== 'active' ? 'disabled style=cursor:not-allowed' : '';
    this.todoContainer.innerHTML += `
      <div class="todo-item" data-content="${todo.status}" data-id="${todo.id}">
        <div class="todo-text">
          <h2>Title: <span>${todo.title}</span></h2>
          <p>Deadline: <span>${formattedDate}</span></p>
          <p>Description: <span>${todo.description}</span></p>
        </div>
        <div class="todo-btn">
          <button class="btn ${
            todo.status !== 'active' ? '' : 'btn-complete'
          }" ${notActive}
          >Complete</button>
          <button class="btn ${
            todo.status !== 'active' ? '' : 'btn-edit'
          }" ${notActive}
          >Edit</button>
          <button class="btn btn-delete">Delete</button>
        </div>
      </div>`;
  }
  renderTodos() {
    if (!this.todos) return;
    this.todoContainer.innerHTML = '';
    this.todos.forEach(todo => {
      this.generateTemplate(todo);
    });
  }
  renderStatusCount() {
    if (!this.statusCount) return;
    const all = document.querySelector('.status-counter-all');
    const a = document.querySelector('.status-counter-active');
    const c = document.querySelector('.status-counter-completed');
    const f = document.querySelector('.status-counter-finished');
    all.textContent = this.statusCount.reduce(
      (acc, el) => acc + el.countNum,
      0
    );
    a.textContent = this.statusCount.find(el => el._id === 'active').countNum;
    c.textContent = this.statusCount.find(
      el => el._id === 'completed'
    ).countNum;
    f.textContent = this.statusCount.find(el => el._id === 'finished').countNum;
  }
  setStatus(todos = undefined) {
    const todoStatus = document.querySelectorAll('.todo-item');
    todoStatus.forEach((t, i) => {
      const result = !todos ? this.todos[i].status : todos[i].status;
      t.dataset.content = result;
      let statusColor;
      if (result === 'active') statusColor = '#ffd43b';
      else if (result === 'completed') statusColor = '#4f772d';
      else statusColor = '#d62828';
      t.style.setProperty('--status', `${statusColor}`);
    });
  }
  // setFilterCount() {
  //   const stats = [0, 0, 0];
  //   this.todos.forEach(t => {
  //     if (t.status === 'active') stats[0]++;
  //     else if (t.status === 'completed') stats[1]++;
  //     else stats[2]++;
  //   });
  //   const all = document.querySelector('.status-counter-all');
  //   const a = document.querySelector('.status-counter-active');
  //   const c = document.querySelector('.status-counter-completed');
  //   const f = document.querySelector('.status-counter-finished');
  //   all.textContent = this.todos.length;
  //   a.textContent = stats.at(0);
  //   c.textContent = stats.at(1);
  //   f.textContent = stats.at(2);
  // }
  addDeleteEvents() {
    const deleteBtns = document.querySelectorAll('.btn-delete');
    const target = this;
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        const el = btn.closest('.todo-item');
        if (!el) return;
        const id = el.dataset.id;
        if (!confirm('Are you sure you want to delete this todo?')) return;
        target.deleteTodo(id);
      });
    });
  }
  addCompleteEvents() {
    const completeBtns = document.querySelectorAll('.btn-complete');
    const target = this;
    completeBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        const el = btn.closest('.todo-item');
        if (!el) return;
        const id = el.dataset.id;
        if (!confirm('Are you sure you want to complete this todo?')) return;
        target.completeTodo(id);
      });
    });
  }
  addEditEvents() {
    const editBtns = document.querySelectorAll('.btn-edit');
    const target = this;
    editBtns.forEach(btn => {
      btn.addEventListener('click', async function (e) {
        const el = btn.closest('.todo-item');
        if (!el) return;
        const id = el.dataset.id;
        const currentTodo = await target.getTodo(id);
        currentTodo.deadline = currentTodo.deadline.split('T').at(0);
        const Modal = new modalView();
        Modal.openModal('edit', currentTodo);
        Modal.formSubmit('edit', id);
      });
    });
  }
  init() {
    this.renderTodos();
    this.renderStatusCount();
    this.setStatus();
    //this.setFilterCount();
    this.addDeleteEvents();
    this.addCompleteEvents();
    this.addEditEvents();
  }
  searchTodos(inputValue) {
    this.todoContainer.innerHTML = '';
    const todosCopy = this.todos.filter(t => t.title.startsWith(inputValue));
    if (!todosCopy.length) {
      this.todoContainer.innerHTML = `<h1 style="text-align:center">No search results found...</h1>`;
      return;
    }
    todosCopy.forEach(t => this.generateTemplate(t));
    this.setStatus(todosCopy);
    this.addDeleteEvents();
    this.addCompleteEvents();
    this.addEditEvents();
  }
  async addTodo(newTodo) {
    try {
      const res = await fetch(`${this.apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) throw new Error('Problem with posting data...');
      const data = await res.json();
      if (data.status === 'success') {
        this.getTodos();
        this.init();
        alert('Successfully created new todo!');
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateTodo(todo, id) {
    try {
      const { title, description, deadline } = todo;
      const res = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          deadline,
        }),
      });
      if (!res.ok) throw new Error('Problem with updating data...');
      const data = await res.json();
      if (data.status === 'success') {
        this.getTodos();
        this.init();
        alert('Successfully updated todo!');
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteTodo(id) {
    try {
      const res = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Problem with deleting data...');
      this.getTodos();
      this.init();
    } catch (err) {
      console.log(err);
    }
  }
  async completeTodo(id) {
    try {
      const res = await fetch(`${this.apiUrl}/complete/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Problem with completing todo...');
      this.getTodos();
      this.init();
    } catch (err) {
      console.log(err);
    }
  }
  sortTodos() {}
}
