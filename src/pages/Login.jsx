import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import "../css/Login.css"
const Login = () => {
  const [userData , setUserData] = useState ({fullName:"", email:"", password:"",password2:""});

  const changeInputHandler = (e) =>{
    setUserData(prevState => {
      return {...prevState,[e.target.name]:e.target.value}
    })
  }

  
  return (
  <section className="Login">
    <div className='Login Login_container'>
      <h2>Sign In</h2>
      <form>
        <p className='form_error_message'>Any error from the backend</p>
       
        
        <input type = "email" name = "email" placeholder="Email Address" 
        onChange ={changeInputHandler} autoComplete='true'  />
        <input type = "password" name = "password" 
        onChange ={changeInputHandler} placeholder="Enter Password" autoComplete='true'  />
        
        <p> Dont't have an account? <Link to = '/register'>Sign Up</Link></p>
        <button type = "submit" className='btn_submit'>Login</button>
      </form>
    </div>
  </section>
  )
}

export default Login