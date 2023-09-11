import { useState } from 'react';

function TodoList(props) {
  const { list, deleteTodo, updateTodo } = props;
  return (
    <>
      <h1>Todo List</h1>

      <ul>
        {list.map((item) => (
          <TodoListItem
            key={item._id}
            item={item}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </ul>
    </>
  );
}

function TodoListItem({ item, deleteTodo, updateTodo }) {
  const [isEdit, setEdit] = useState(false);
  const [updateText, setUpdateText] = useState('');
  return (
    <li>
      {item.text}
      {isEdit && (
        <>
          <input
            type='text'
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
          <button onClick={() => updateTodo(item._id, updateText)}>
            Update
          </button>
        </>
      )}
      {!isEdit && <button onClick={() => setEdit(true)}>Edit</button>}
      <button onClick={() => deleteTodo(item._id)}>Delete</button>
    </li>
  );
}

export default TodoList;
