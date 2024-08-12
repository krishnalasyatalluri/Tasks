import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import './index.css'
import axios from 'axios'
const LoginPage = (props) => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    
    
    const HandleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://16.171.23.208:3920/user/login', {
                email,
                password
            })
            console.log(response.data)
            alert('login successful')
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId',response.data.id)
            navigate('/dashboard')
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Invalid credentials. Please check your email and password.');
            } else if (error.response) {
                alert(`Login failed: ${error.response.data.message || 'An unexpected error occurred'}`);
            } else {
                alert('Login failed: Unable to connect to the server.');
            }
        }


        setEmail('')
        setPassword('')
       
        navigate('/dashboard')
    }
    return (
        <div className="register-main">
            <div className="register-container">
                <div className="content">
                    <form onSubmit={HandleSubmit}>
                       
                        <input type="text" value={email} placeholder="enter your email here" onChange={handleEmailChange} className="email-label" />
                        <input type="text" value={password} placeholder="enter your password here" onChange={handlePasswordChange} className="pw-label" />

                        <input type="submit" className="register-btn" placeholder="Login" />
                    </form>


                </div>

            </div>

        </div>
    )

}
export default LoginPage