import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import CreateTask from '../CreateTask/index';
import SortByStatus from '../SortStatus';
import SortByDueDate from '../sortByDueDate';
import './index.css';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [updatedTaskData, setUpdatedTaskData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://16.171.23.208:3920/task/${userId}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task._id);
        setUpdatedTaskData(task);
    };

    const handleDeleteClick = async (taskId) => {
        const userId = localStorage.getItem('userId');

        try {
            await axios.delete(`http://16.171.23.208:3920/task/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTaskData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveClick = async (taskId) => {
        const userId = localStorage.getItem('userId');

        try {
            await axios.put(`http://16.171.23.208:3920/task/${taskId}/${userId}`, updatedTaskData);
            setEditingTaskId(null);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleCancelClick = () => {
        setEditingTaskId(null);
    };

    const handleBackClick = () => {
        navigate('/dashboard');
    };
    const handleCreateTaskClick = () => {
        navigate('/dashboard/create-task');
    };
    return (
        <div className="dashboard-container">
            <div className="sidebar">

                {/* <NavLink to="/dashboard/sortByStatus" activeClassName="active"><button>Filter By Status</button></NavLink><br />
                    <NavLink to="/dashboard/sortByDuedate" activeClassName="active-1"><button>Filter By Due Date</button></NavLink> */}
                <NavLink to="/dashboard/sortByStatus" className="nav-link"  activeClassName="active">
                    <button className="filter-btn-1">Filter By Status</button>
                </NavLink>
                <br />
                <NavLink to="/dashboard/sortByDuedate" className="nav-link"  activeClassName="active-1">
                    <button className="filter-btn-2">Filter By Due Date</button>
                </NavLink>
            </div>
            <div className="content">
                <button className='create-btn' onClick={handleCreateTaskClick}>Create New Task</button>
                <h2 className="task-title">All Tasks</h2>
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task._id}>
                                <td>
                                    {editingTaskId === task._id ? (
                                        <input
                                            type="text"
                                            name="title"
                                            value={updatedTaskData.title}
                                            onChange={handleInputChange}
                                            className="task-input"
                                        />
                                    ) : (
                                        task.title
                                    )}
                                </td>
                                <td>
                                    {editingTaskId === task._id ? (
                                        <input
                                            type="text"
                                            name="description"
                                            value={updatedTaskData.description}
                                            onChange={handleInputChange}
                                            className="task-input"
                                        />
                                    ) : (
                                        task.description
                                    )}
                                </td>
                                <td>
                                    {editingTaskId === task._id ? (
                                        <select
                                            name="status"
                                            value={updatedTaskData.status}
                                            onChange={handleInputChange}
                                            className="task-select"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    ) : (
                                        task.status
                                    )}
                                </td>
                                <td>
                                    {editingTaskId === task._id ? (
                                        <input
                                            type="date"
                                            name="dueDate"
                                            value={updatedTaskData.dueDate.substring(0, 10)}
                                            onChange={handleInputChange}
                                            className="task-input"
                                        />
                                    ) : (
                                        new Date(task.dueDate).toLocaleDateString()
                                    )}
                                </td>
                                <td>
                                    {editingTaskId === task._id ? (
                                        <>
                                            <button onClick={() => handleSaveClick(task._id)} className="task-button save">Save</button>
                                            <button onClick={handleCancelClick} className="task-button cancel">Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditClick(task)} className="task-button edit">Edit</button>
                                            <button onClick={() => handleDeleteClick(task._id)} className="task-button delete">Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <button onClick={handleBackClick} className="back-btn">Go to Dashboard</button> */}
                <Routes>
                    <Route path="/dashboard/create-task" element={<CreateTask />} />
                    <Route path="/dashboard/sortByStatus" element={<SortByStatus />} />
                    <Route path="/dashboard/sortByDuedate" element={<SortByDueDate />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;
