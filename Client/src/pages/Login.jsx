import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from "react-redux"
import {voteActions} from "../store/vote-slice"
// Import eye icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [userData, setUserData] = useState({fullName:"", email:"", password:"",password2:""});
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState,[e.target.name]:e.target.value}
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginVoter = async (e) => {
    try{
      e.preventDefault()
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/voters/login`,userData);
      const newVoter = await response.data;
      localStorage.setItem("currentUser",JSON.stringify(newVoter))
      dispatch(voteActions.changeCurrentVoter(newVoter))
      navigate("/results");
    }catch(err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className="Login">
      <div className='Login Login_container'>
      <form onSubmit={loginVoter}>
        <h2>Sign In</h2>
        
          {error && <p className='form_error_message'>{error}</p>}
          <input 
            type = "email" 
            name = "email" 
            placeholder="Email Address"
            onChange ={changeInputHandler} 
            autoComplete='true' 
          />
          
          <div className="password-input-container">
            <input 
              type = {showPassword ? "text" : "password"} 
              name = "password"
              onChange ={changeInputHandler} 
              placeholder="Enter Password" 
              autoComplete='true' 
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <p> Dont't have an account? <Link to = '/register'>Sign Up</Link></p>
          <button type = "submit" className='btn_submit'>Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login