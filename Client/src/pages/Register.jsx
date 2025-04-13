import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import "../css/Register.css";
const Register = () => {
  const [userData , setUserData] = useState ({fullName:"", email:"", password:"",password2:""});

  const changeInputHandler = (e) =>{
    setUserData(prevState => {
      return {...prevState,[e.target.name]:e.target.value}
    })
  }


  return (
  <section className="register">
    <div className='container register_container'>
      <h2>Sign Up</h2>
      <form>
        <p className='form_error_message'>Any error from the backend</p>
        <input type = "text" name = "fullname" placeholder="Full Name" 
        onChange ={changeInputHandler} autoComplete='true' autoFocus />
        <input type = "email" name = "email" placeholder="Email Address" 
        onChange ={changeInputHandler} autoComplete='true'  />
        <input type = "password" name = "password" 
        onChange ={changeInputHandler} placeholder="Enter Password" autoComplete='true'  />
        <input type = "password" name = "password2" 
        onChange ={changeInputHandler} placeholder="Confirm Password" autoComplete='true' autoFocus />
        <p> Already have an account? <Link to = '/'>Sign in <Link></Link></Link></p>
        <button type = "submit" className='btn_submit'>Register</button>
      </form>
    </div>
  </section>
  )
}

export default Register