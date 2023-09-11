import { useState } from 'react';

function AddTodo({ addTodo }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTodo(todoText);
    setTodoText('');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='todo-field'>Write your Todo Task: </label>
      <input
        type='text'
        id='todo-field'
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button type='submit'>Add Todo</button>
    </form>
  );
}

export default AddTodo;
