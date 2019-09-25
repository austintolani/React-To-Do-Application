import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apiKey = "ab8a79085f0c58e13b4d127711f508a67e7f2f9ac420384dea805aed7ed4a217";

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    // Load existing ToDos
    var self=this;
    var standardRequest = new XMLHttpRequest();
    standardRequest.onreadystatechange = function() {
      if(this.readyState===4 && this.status===200) {
        var todos = JSON.parse(this.responseText);
        self.setState({todos: todos});
      } else if(this.readyState===4) {
        console.log(this.responseText);
      }
    }
    standardRequest.open("GET", "https://api.kraigh.net/todos", true);
    standardRequest.setRequestHeader("x-api-key", apiKey);
    standardRequest.send();
  }
  // Toggles between completed and not completed

  // This only marks something as complete and can't do it the other way round
  markComplete = (id) => {
    var self=this;
    var data = {
      "completed": true
    }

    var completeRequest = new XMLHttpRequest();
    completeRequest.onreadystatechange = function (){
      if (this.readyState === 4 && this.status === 200)  {
        // TODO: IMPLEMENT THIS!!
        const newTodos = self.state.todos;
        newTodos.map(todo => {

          if(todo.id === id){
            todo.completed = !todo.completed
          }
          return todo;
        });
        self.setState({todos:newTodos});



      }
    }
    completeRequest.open("PUT", "https://api.kraigh.net/todos/" + id,true);
    completeRequest.setRequestHeader("x-api-key",apiKey);
    completeRequest.send(JSON.stringify(data));


  }

  // Delete an individual todo
  delTodo = (id) => {
    // TODO: complete this method

    var self=this;
    // API call, DELETE to remove
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          if (todo.id !== id) {
            return todo;
          }
        });
        self.setState({todos: remainingTodos});
      }
      else if (this.readyState===4) {
        console.log(this.responseText);
      }
    }

    deleteRequest.open("DELETE", "https://api.kraigh.net/todos/" + id, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();
  }
  // Add an individual todo
  addTodo = (text) =>  {

    var self=this;

    // Submit Todo to API
    var data = {
      text: text
    };

    var addRequest = new XMLHttpRequest();
    addRequest.onreadystatechange = function () {
      // Wait for readyState = 4 & 200 response
      if (this.readyState === 4 && this.status === 200) {
        self.setState({
          todos: [...self.state.todos, JSON.parse(this.responseText)]
        })
        self.setState({input: ''});
        document.getElementById("myForm").reset();
      } else if (this.readyState === 4) {

        // this.status !== 200, error from server
        console.log(this.responseText);

      }
    };

    addRequest.open("POST", "https://api.kraigh.net/todos", true);
    addRequest.setRequestHeader("Content-type", "application/json");
    addRequest.setRequestHeader("x-api-key", apiKey);
    addRequest.send(JSON.stringify(data));
  }
  sortAlphabetical =() =>{
    const newTodos = this.state.todos;
    newTodos.sort(function(text1,text2){
      return text1.text.localeCompare(text2.text);
    })
    this.setState({todos:newTodos});
  }

  render() {
    console.log(this.state.todos)
    return (
      <div className ="App">
      <p>
      <strong>Todos:</strong>
        <button onClick={this.sortAlphabetical} className="sortBtn">Sort</button>
      </p>
      <Todo todos={this.state.todos} markComplete = {this.markComplete} delTodo = {this.delTodo} />
      <NewTodo addTodo= {this.addTodo} />

      </div>
    );
  }
}

export default App;
