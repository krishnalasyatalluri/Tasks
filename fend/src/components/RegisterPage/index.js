import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import './index.css'
import axios from 'axios'
const RegisterPage = (props) => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handleLoginClick=(e)=>{
        navigate('/login')
    }
    
    const HandleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://16.171.23.208:3920/user/register', {
                username,
                email,
                password
            })
            console.log(response.data)
            alert('registration successful')
            navigate('/login')
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'Email already exists. Please login.') {
                    alert('This email is already registered. Please login instead.');
                } else {
                    alert(`Registration failed: ${error.response.data.message || 'An unexpected error occurred'}`);
                }
            } else {
                alert('Registration failed: Unable to connect to the server.');
            }
        }


        setEmail('')
        setUsername('')
        setPassword('')
       
        navigate('/login')
    }
    return (
        <div className="register-main">
            <div className="register-container">
                <div className="content">
                    <form onSubmit={HandleSubmit}>
                        <input type="text" value={username} placeholder="enter your name here" onChange={handleUsernameChange} className="name-label" />
                        <input type="text" value={email} placeholder="enter your email here" onChange={handleEmailChange} className="email-label" />
                        <input type="text" value={password} placeholder="enter your password here" onChange={handlePasswordChange} className="pw-label" />
                        {/* <label className="already">Already have an account?</label><button className="login-link" onClick={handleLoginClick}>Login</button><br></br> */}
                        <label className="already">Already have an account?</label>
<button className="login-link" onClick={handleLoginClick}>Login</button>
<br />

                        <input type="submit" className="register-btn" placeholder="Register" />
                    </form>


                </div>

            </div>

        </div>
    )

}
export default RegisterPage