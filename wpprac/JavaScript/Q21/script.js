let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    tasks.push({ id: Date.now(), text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
}

function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function toggleComplete(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        
        li.innerHTML = `
            <span onclick="toggleComplete(${task.id})">${task.text}</span>
            <button onclick="removeTask(${task.id})">Remove</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Allow adding task with Enter key
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


