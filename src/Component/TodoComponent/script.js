import { Component } from "react";
import TodoListItems from "../TodoListComponent/script";
import { v4 as uuidv4 } from "uuid";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./style.css"


class Todo extends Component {
  state = { todoList:[], item: "", isEditing:false,};


  // Add new value to array
  onClickButton = () => {
    const { item } = this.state;

    if(item === ""){
      toast.error("Please Enter Task")
    }
     else{
    // create New Item
    const newItem = {
      id: uuidv4(),
      text: item,
      isEditing:false
    };

    // Update state Value
    this.setState((prevstate) => ({
      todoList: [...prevstate.todoList, newItem],
      item: "",
      isEditing:false
    }));

  }
  };

  // update item value
  onChangeValue = (event) => {
    this.setState({ item: event.target.value });
  };

  // Delete Todo Item
  deleteTodoItem = (id) => {
    const{todoList} = this.state
    const updatedList = todoList.filter(eachItem => eachItem.id !== id)

    this.setState({todoList:updatedList})
    toast.success("Item Deleted")
  }

  // Edit Todo Item
  editTodoItem = (id) => {
    const {todoList} = this.state
    const editItem  = todoList.find(item => item.id === id)
    this.setState({isEditing:true,item:editItem.text})
  }

  onSaveLocalStorage = () => {
    const{todoList} = this.state
    localStorage.setItem("todoList",JSON.stringify(todoList))
  }
  // Render Method
  render() {
    const { todoList, item,isEditing} = this.state;
    localStorage.setItem("TodoList",todoList)
    return (
      <div className="app-container">
        <div className="Todo-app-container">
          <h1 className="heading">Todo List App</h1>
          <div className="input-and-add-container">
            <input
              type="text"
              placeholder="Enter Your Task..."
              value={item}
              onChange={this.onChangeValue}
            />
            <button type="button" className="todo-button" onClick={this.onClickButton}>
              {isEditing ? "Edit" : "Add"}
            </button>
            <button type="button" className="todo-button" onClick={this.onSaveLocalStorage}>Save</button>
          </div>
          <ul className="Todo-List-items-container">
            {todoList.map((item) => (
              <TodoListItems
                key={item.id}
                todoDetails={item}
                deleteTodoItem={this.deleteTodoItem}
                editTodoItem = {this.editTodoItem}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
