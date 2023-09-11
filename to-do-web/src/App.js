import { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './components/todo/add-todo';
import TodoList from './components/todo/list';

function App() {
  const [todoList, setTodoList] = useState([]);

  const fetchTodoList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/tasks`
      ).then((res) => res.json());

      setTodoList(response.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // get todo lists
    fetchTodoList();
  }, []);

  const addTodo = async (text) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      }).then((res) => res.json());

      if (response.success) {
        setTodoList(response.data);
        alert('Todo Added');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id, updateText) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/tasks/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: updateText })
        }
      ).then((res) => res.json());

      if (response.success) {
        setTodoList(response.data);
        alert('Todo Updated');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/tasks/${id}`,
        { method: 'DELETE' }
      ).then((res) => res.json());

      if (response.success) {
        const deleteTodo = todoList.filter((item) => item._id !== id);
        setTodoList(deleteTodo);
        alert('Todo Deleted');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <AddTodo addTodo={addTodo} />
        <TodoList
          list={todoList}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </header>
    </div>
  );
}

export default App;
