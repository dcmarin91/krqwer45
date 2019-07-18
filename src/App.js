import React, { Component } from 'react';
import "./index.css";

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newTask: '',
      tasks: [
        { id: 1, title: "Sacar la ropa", done: false },
        { id: 2, title: "Hacer la cama", done: true },
        { id: 3, title: "Leer un rato", done: false },
      ],
      errors: {
        newTask: false
      }
    }
  }

  request = () =>{
    fetch('http://makeitreal-todo.herokuapp.com/todo_items')
    .then(function(response) {
      return response.json();
      })
      .then(myJson => {
        this.setState({tasks: myJson})
      });
    } 


  addTask(event) {
    if (this.validateNewTask()) {
      let oldTasks = this.state.tasks
      let newTask = {
        id: Math.max(...oldTasks.map(task => task.id)) + 1,
        title: this.state.newTask,
        done: false
      }
      this.setState({
        tasks: [...oldTasks, newTask],
        newTask: ''
      })
    }
    event.preventDefault();
  }
  
  validateNewTask() {
    if (this.state.newTask === '') {
      this.setState({
        errors: {
          newTask: true
        }
      })
      return false
    }
    return true
  }
  updateTask(event) {
    this.setState({
      newTask: event.target.value,
      errors: {
        newTask: false
      }
    })
  }
  toogleDone(id) {
    const newTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
        return task
      }
      return task
    })
    this.setState({
      tasks: newTasks
    })
  }
  renderTasks() {
    const tasks = this.state.tasks.map((task, index) => {
      return (
        <li
          className={task.done ? 'done' : null}
          key={task.id}
          onClick={this.toogleDone.bind(this, task.id)}>
          {task.title}
        </li>
      )
    })
    return tasks
  }
   render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3 onClick={this.request()}>Por hacer:</h3>
          <ul className="todo">
            {this.renderTasks()}
          </ul>
          <form onSubmit={this.addTask.bind(this)}>
          <input className={this.state.errors.newTask ? 'error' : null} type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} onChange={this.updateTask.bind(this)}/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
