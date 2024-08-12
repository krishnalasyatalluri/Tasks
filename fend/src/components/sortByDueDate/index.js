import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; 
import { useNavigate } from 'react-router-dom';
const SortByDueDate = () => {
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); 
    const navigate=useNavigate()
    useEffect(() => {
        fetchSortedTasks();
    }, [sortOrder]);

    const fetchSortedTasks = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post(`http://16.171.23.208:3920/task/sortByDate/${userId}`, {
                order: sortOrder
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks sorted by dueDate:', error);
        }
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };
    const handleBackClick=(e)=>{
        navigate('/dashboard')
    }

    return (
        <div>
            <h2>Tasks Sorted by Due Date</h2>
            <div className="sort-controls">
                <label htmlFor="sortOrder">Sort Order:</label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleBackClick} className="back-btn">Go to Dashboard</button>
        </div>
    );
};

export default SortByDueDate;
