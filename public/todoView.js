export default class {
  todoContainter = document.querySelector('.todo-container');
  todos = [];
  filter = 'all';
  sort = 'newest';

  async getTodos() {
    const res = await fetch('http://127.0.0.1:3000/api/todos');
    const data = await res.json();
    this.todos = data.data.todos;
    this.renderTodos();
    this.setStatus();
    this.setFilterCount();
  }
  renderTodos() {
    if (!this.todos) return;
    this.todoContainter.innerHTML = '';
    this.todos.forEach(todo => {
      const formattedDate = todo.deadline.split('T').at(0);
      this.todoContainter.innerHTML += `
      <div class="todo-item" data-content="${todo.status}">
        <div class="todo-text">
          <p>Title: <span>${todo.title}</span></p>
          <p>Deadline: <span>${formattedDate}</span></p>
          <a>See description</a>
        </div>
        <div class="todo-btn">
          <button class="btn">Complete</button>
          <button class="btn">Edit</button>
          <button class="btn">Delete</button>
        </div>
      </div>`;
    });
  }
  setStatus() {
    const todoStatus = document.querySelectorAll('.todo-item');
    todoStatus.forEach((t, i) => {
      t.dataset.content = this.todos[i].status;
      let statusColor;
      if (this.todos[i].status === 'active') statusColor = '#ffd43b';
      else if (this.todos[i].status === 'completed') statusColor = '#4f772d';
      else statusColor = '#d62828';
      t.style.setProperty('--status', `${statusColor}`);
    });
  }
  setFilterCount() {
    const stats = [0, 0, 0];
    this.todos.forEach(t => {
      if (t.status === 'active') stats[0]++;
      else if (t.status === 'completed') stats[1]++;
      else stats[2]++;
    });
    const all = document.querySelector('.status-counter-all');
    const a = document.querySelector('.status-counter-active');
    const c = document.querySelector('.status-counter-completed');
    const f = document.querySelector('.status-counter-finished');
    all.textContent = this.todos.length;
    a.textContent = stats.at(0);
    c.textContent = stats.at(1);
    f.textContent = stats.at(2);
  }
  sortTodos() {}
  search() {}
  addTodo() {}
  updateTodo() {}
  deleteTodo() {}
  completeTodo() {}
}
