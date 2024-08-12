import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { Navigate, useNavigate } from 'react-router-dom';
const SortByStatus = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Pending');
const navigate=useNavigate()
    useEffect(() => {
        fetchSortedTasks();
    }, [selectedStatus]);
    const fetchSortedTasks = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.post(`http://16.171.23.208:3920/task/sortByStatus/${userId}`, {
                status: selectedStatus

            });
            console.log(selectedStatus)
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks sorted by status:', error);
        }
    };


    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };
    const handleBackClick=(e)=>{
        navigate('/dashboard')
    }

    return (
        <div>
            <h2>Tasks Sorted by Status</h2>
            <div className="status-dropdown">
                <label htmlFor="status">Sort by Status: </label>
                <select id="status" value={selectedStatus} onChange={handleStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <table>
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

export default SortByStatus;
