const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const dueDate = document.getElementById('dueDate');
const dueTime = document.getElementById('dueTime');
const taskList = document.getElementById('taskList');
const body = document.body;
const themeIcon = document.getElementById('themeIcon');

// Trocar tema
function toggleTheme() {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  themeIcon.className = body.classList.contains('dark') ? 'fas fa-sun' : 'fas fa-moon';
}

// Carregar tema salvo
window.onload = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.remove('dark');
    themeIcon.className = 'fas fa-moon';
  } else {
    themeIcon.className = 'fas fa-sun';
  }
  loadTasks();
};

function saveTasks() {
  const tasks = [];
  const items = taskList.querySelectorAll('li');
  items.forEach(item => {
    const taskText = item.querySelector('.task-text').textContent;
    const dueText = item.querySelector('.due-date').textContent;
    const [taskDueDate, taskDueTime] = dueText.split(' ');
    const isCompleted = item.classList.contains('completed');
    tasks.push({ taskText, taskDueDate, taskDueTime, isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task => addTaskToDOM(task));
  }
}

function addTask(event) {
  event?.preventDefault();
  const taskText = taskInput.value.trim();
  const taskDueDate = dueDate.value;
  const taskDueTime = dueTime.value;

  if (!taskText || !taskDueDate || !taskDueTime) {
    alert('Preencha todos os campos!');
    return;
  }

  addTaskToDOM({ taskText, taskDueDate, taskDueTime, isCompleted: false });

  taskInput.value = '';
  dueDate.value = '';
  dueTime.value = '';
  saveTasks();
}

function addTaskToDOM({ taskText, taskDueDate, taskDueTime, isCompleted }) {
  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <span class="due-date">${taskDueDate} ${taskDueTime}</span>
    <button class="remove-btn"><i class="fas fa-trash"></i></button>
  `;
  taskList.appendChild(li);

  li.querySelector('.task-text').addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.querySelector('.remove-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });
}

taskForm.addEventListener('submit', addTask);
