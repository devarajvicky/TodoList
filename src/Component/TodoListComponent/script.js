import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import "./style.css"

const TodoListItems = (props) => {
  const { todoDetails, deleteTodoItem, editTodoItem } = props;
  const { id, text } = todoDetails;

  const onRemoveItem = () => {
    deleteTodoItem(id);
  };

  const onEditItem = () => {
    editTodoItem(id, text);
  };
  return (
    <div className="todo-item">
      <li>{text}</li>
      <div className="button-container">
      <button type="button" className="button edit" onClick={onEditItem}>
        <FaEdit aria-label="Edit-icon" />
      </button>
      <button type="button" className="button delete" onClick={onRemoveItem}>
        <MdDelete aria-label="delete" />
      </button>
      </div>
     
    </div>
  );
};

export default TodoListItems;
