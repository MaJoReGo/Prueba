import React, { useState } from 'react';
import { Form } from '../../Form/Form';
import { Filter } from '../../Filter/Filter';
import './Main.css';

export const Main = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    // Agregar la nueva tarea al estado de tareas
    setTasks([...tasks, newTask]);
  };

  return (
    <main>
      <Form onTaskAdded={handleTaskAdded} />
      <div className='home-container'>
        <h1>Tienes {tasks.length} tareas</h1>
        <br/>
        <hr/> 
      </div>
      <Filter />
      <div className='container'>
        {tasks.map((task, index) => (
          <div key={index}>
            <ul>
              <li>
                <span className="circle"></span>{/* Círculo verde */}
                {task.title}
              </li>
              <li>{task.description}</li>
              <input id="checkboxTask" type="checkbox" />
            </ul>
          </div>
        ))}
      </div> 
    </main>
  );
};
