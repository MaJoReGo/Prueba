import React, { useState, useEffect } from 'react';
import { Form } from '../../Form/Form';
import { Filter } from '../../Filter/Filter';
import './Main.css';

export const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todas las Tareas');

  // Cargar las tareas guardadas en el almacenamiento local cuando el componente se monta
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Guardar las tareas en el almacenamiento local cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdded = (newTask) => {
    // Agregar la nueva tarea al estado de tareas
    setTasks([...tasks, { ...newTask, completed: false }]);
  };

  const handleCheckboxChange = (index) => {
    // Copiar el arreglo de tareas
    const newTasks = [...tasks];
    // Cambiar el estado de completado de la tarea en el índice especificado
    newTasks[index].completed = !newTasks[index].completed;
    // Actualizar el estado de las tareas
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    // Copiar el arreglo de tareas y eliminar la tarea en el índice especificado
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    // Actualizar el estado de las tareas
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'Pendientes':
        return !task.completed;
      case 'Resueltas':
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <main>
      <Form onTaskAdded={handleTaskAdded} />
      <div className='home-container'>
        <h1>Tienes {filteredTasks.length} tareas</h1>
        <br/>
        <hr/> 
      </div>
      <Filter setFilter={setFilter} />
      <div className='container'>
        {filteredTasks.map((task, index) => (
          <div key={index}>
            <ul>
              <li>
                <span
                  className={`circle ${task.completed ? 'green' : 'red'}`}
                ></span>
                {task.title}
              </li>
              <li>{task.description}</li>
              <input
                id={`checkboxTask${index}`} 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => handleCheckboxChange(index)}
              />
              <button onClick={() => handleDeleteTask(index)}>Borrar</button>
            </ul>
          </div>
        ))}
      </div> 
    </main>
  );
};
