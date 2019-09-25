import React, { Component } from 'react';
import './NewTodo.css';
// import Todo from './Todo';

class NewTodo extends Component {
  state = {
    text: ''
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.text);
    this.setState({text: ''});
  }
  onChange = (e) => this.setState({text:e.target.value});

  render() {
    return (
      <form id = "myForm" onSubmit={this.onSubmit} style={{ display: 'flex' }}>
  <input
    type="text"
    name="title"
    style={{ flex: '10', padding: '5px' }}
    placeholder="Add Todo ..."
    onChange={this.onChange}
  />
  <input
    type="submit"
    value="Submit"
    className="btn"
    style={{flex: '1'}}
  />
</form>
      );
  }
}

export default NewTodo;
