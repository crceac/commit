import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        deadline: deadline,
        completed: false
      }]);
      setNewTask('');
      setDeadline('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Task Management App</h1>
        <div className="input-section">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty">No tasks. Add some tasks to get started!</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <span onClick={() => toggleComplete(task.id)}>
                  <strong>{task.text}</strong>
                  {task.deadline && <span className="deadline">Deadline: {task.deadline}</span>}
                </span>
                <button onClick={() => removeTask(task.id)}>Remove</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;


