import React, { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCheckCircleFill, BsFillTrashFill, BsEmojiSmile } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([])

    // 1. Database se data load karna (Fetch)
    useEffect(() => {
        axios.get('http://localhost:5000/api/todos')
            .then(result => setTodos(result.data))
            .catch(err => console.log("Fetch Error:", err))
    }, [])

    // 2. Naya Task Add karna (Create)
    const handleAdd = (task) => {
        axios.post('http://localhost:5000/api/todos', { task: task })
            .then(result => {
                setTodos([...todos, result.data]) // Database se aayi nayi item add karein
            })
            .catch(err => console.log("Add Error:", err))
    }

    // Task ko Toggle (Done/Undone) karna
const handleToggle = (id) => {
    axios.put(`http://localhost:5000/api/todos/${id}`)
        .then(result => {
            setTodos(todos.map(todo =>
                todo._id === id ? { ...todo, completed: result.data.completed } : todo
            ))
        })
        .catch(err => console.log(err))
}

// Task ko permanently Delete karna
const handleDelete = (id) => {
    // Backend ko delete request bhejna
    axios.delete(`http://localhost:5000/api/todos/${id}`)
        .then(result => {
            console.log(result);
            // Delete hone ke baad screen (state) se bhi hatana
            setTodos(todos.filter(todo => todo._id !== id));
        })
        .catch(err => console.log(err));
}

    return (
        <div className="todo-container">
            <h2 className="main-title">To-Do List</h2>
            <Create addTask={handleAdd} />

            <div className="todo-list">
                {
                    todos.length === 0 ? (
                        <div className="empty-state">
                            <BsEmojiSmile className="empty-icon" />
                            <p>No todos found</p>
                        </div>
                    ) : (
                        todos.map(todo => (
                            <div className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo._id}>
                                <div className="todo-text" onClick={() => handleToggle(todo._id)}>
                                    <div className="checkbox-icon">
                                        {todo.completed ? <BsCheckCircleFill className="icon-check" /> : <div className="circle-placeholder"></div>}
                                    </div>
                                    <span className="text-content">{todo.task}</span>
                                </div>
                                <button className="delete-btn" onClick={() => handleDelete(todo._id)}>
                                    <BsFillTrashFill />
                                </button>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Home