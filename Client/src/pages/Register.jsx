import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [userData , setUserData] = useState ({fullName:"", email:"", password:"",password2:""});

  const [error, setError] = useState("")
  const navigate = useNavigate()


  //function to change controlled inputs
  const changeInputHandler = (e) =>{
    setUserData(prevState => {
      return {...prevState,[e.target.name]:e.target.value}
    })
  }


// start 3rd day of project expressjs api communications


const registerVoter = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/voters/register`,
      userData
    );
    navigate("/");
  } catch (err) {
     setError(err.response.data.message)
  }
}


  return (
  <section className="register">
    <div className='container register_container'>
      <h2>Sign Up</h2>
      <form onSubmit={registerVoter}>
        {error && <p className='form_error_message'>{error}</p>}
        <input type = "text" name = "fullName" placeholder="Full Name" 
        onChange ={changeInputHandler} autoComplete='true' autoFocus />
        <input type = "email" name = "email" placeholder="Email Address" 
        onChange ={changeInputHandler} autoComplete='true'  />
        <input type = "password" name = "password" 
        onChange ={changeInputHandler} placeholder="Enter Password" autoComplete='true'  />
        <input type = "password" name = "password2" 
        onChange ={changeInputHandler} placeholder="Confirm Password" autoComplete='true' autoFocus />
        <p> Already have an account? <Link to= '/'>Sign in </Link></p>
        <button type = "submit" className='btn_submit'>Register</button>
      </form>
    </div>
  </section>
  )
}

export default Register