import React from 'react'
import './Filter.css'

export const Filter = () => {
  return (
    <div className='Filter-container'>
    <h1>Filtrar:</h1>
    <select name="filter" id="filter">
      <option>Todas las Tareas</option>
      <option>Pendientes</option>
      <option>Resueltas</option>
    </select>
    </div>
  )
}