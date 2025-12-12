
import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false }
    ]);
    setInput('');
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container py-5" style={{ background: '#e3f2fd', minHeight: '100vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="mb-4 text-primary">業務用Todo管理アプリ</h1>
              <form onSubmit={handleAddTodo} className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="新しいタスクを入力"
                />
                <button type="submit" className="btn btn-primary">追加</button>
              </form>
              <ul className="list-group">
                {todos.length === 0 && <li className="list-group-item text-center text-secondary">タスクはありません</li>}
                {todos.map(todo => (
                  <li
                    key={todo.id}
                    className={
                      'list-group-item d-flex align-items-center justify-content-between' +
                      (todo.completed ? ' bg-light' : '')
                    }
                  >
                    <span
                      onClick={() => handleToggleComplete(todo.id)}
                      style={{
                        cursor: 'pointer',
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#6c757d' : '#212529',
                        fontWeight: todo.completed ? 400 : 500
                      }}
                    >
                      {todo.text}
                    </span>
                    <div>
                      <button
                        className={todo.completed ? 'btn btn-outline-primary btn-sm me-2' : 'btn btn-primary btn-sm me-2'}
                        onClick={() => handleToggleComplete(todo.id)}
                      >
                        {todo.completed ? '未完了に戻す' : '完了'}
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(todo.id)}
                      >削除</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
