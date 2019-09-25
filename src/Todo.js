import React, { Component } from 'react';
import './Todo.css';
// import Todo from './Todo';

class Todo extends Component {

  // Getting the style for each individual todo
  getStyleTodo = (todo) => {
      return{
        // TODO: insert styling for individual todos.
        padding: '10px',
        borderBottom: '2px #ccc dotted',
        textDecoration: todo.completed ? 'line-through' : 'none'
      }
    }

    getStyleCheckbox = (todo) => {
      return{
        background: 'Orange',
        border: '1px solid black',
        padding: '8px 8px',
        cursor: 'pointer',
        borderRadius: '50%',
        borderBottom: '-20px',

        background: todo.completed ? 'Orange' : 'Gray'
      }
    }

  render() {
    return this.props.todos.map((todo) =>(
      <div style = {this.getStyleTodo(todo)}>
      <p>
      <button onClick = {this.props.markComplete.bind(this,todo.id)} style = {this.getStyleCheckbox(todo)}></button> {'   '}
      {todo.text}
      <button onClick = {this.props.delTodo.bind(this,todo.id)} style = {delBtnStyle}>-</button>
      </p>
      </div>
    ));
  }
}
// Styling for buttons
const delBtnStyle = {
  background: 'FireBrick',
  color: '#fff',
  border:  '1px solid black',
  padding: '5px 5px',
  cursor: 'pointer',
  float: 'right'
}
export default Todo;
