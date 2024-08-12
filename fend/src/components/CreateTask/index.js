
import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import './index.css'
import axios from 'axios'
const CreateTask = (props) => {
    const navigate=useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status,setStatus]=useState('Pending')
    const [dueDate,setDueDate]=useState('')
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handledueDateChange = (e) => {
        setDueDate(e.target.value)
    }
    const handleBackClick=(e)=>{
        navigate('/dashboard')
    }
    
    
    const HandleSubmit = async(e) => {
        e.preventDefault()

        try {
            const userId=localStorage.getItem('userId')
            const response = await axios.post(`http://16.171.23.208:3920/task/create/${userId}`, {
                title,
                description,
                status,
                dueDate
            })
            console.log(response.data)
            localStorage.setItem('taskId',response.data._id)
           alert('task created successfully')
            
        } catch (e) {
            console.log(e.message)
        }


        setTitle('')
        setDescription('')
        setDueDate('')
        setStatus('')
       
        navigate('/dashboard')
    }
    return (
        <div className="register-main">
            <div className="register-container">
                <div className="content">
                    <form onSubmit={HandleSubmit}>
                       
                        <input type="text" value={title} placeholder="enter your task title here" onChange={handleTitleChange} className="email-label" />
                        <input type="textarea" value={description} placeholder="enter your description here" onChange={handleDescriptionChange} className="pw-label" />
                        
                        <label className="status-labels">status</label><br />
                        <select value={status} onChange={handleStatusChange} className="status-label">
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <br />
                        <input type="date" value={dueDate} onChange={handledueDateChange} placeholder="enter due date" className="status-label"/>

                        <input type="submit" className="register-btn" placeholder="Create Task" />
                        <button onClick={handleBackClick} className="back-btn">Go to Dashboard</button>
                    </form>


                </div>

            </div>

        </div>
    )

}
export default CreateTask