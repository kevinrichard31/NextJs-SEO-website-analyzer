"use client";
import React, { useState } from 'react';

function TodoList() {
  const initialTasks = [{ name: 'hello', state: false },{ name: 'hello', state: false },{ name: 'hello', state: false }]; // Remplace ça par ton propre tableau de tâches
  const [tasks, setTasks] = useState(initialTasks);

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].state = !updatedTasks[index].state;
    console.log(updatedTasks[index].state);
    setTasks(updatedTasks);
  };

  return (
    <div className='max-w-3xl'>
      {tasks.map((task, index) => (
        <div key={index} className="form-control">
          <label className="cursor-pointer label">
          <input
              type="checkbox"
              checked={task.state}
              onChange={() => handleCheckboxChange(index)}
              className="checkbox checkbox-success"
            />
            <span className="label-text">{task.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
