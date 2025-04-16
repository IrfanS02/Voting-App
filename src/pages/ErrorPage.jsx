import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Image from '../assets/no-data.gif';
const ErrorPage = () => {
     const navigate = useNavigate()
     //redirect user to previous page after 6 seconds
     useEffect(() => {
      setTimeout(() => {
        navigate(-1)
      },6000)
     })

  return (
   <section className = "errorPage">
    <div className='errorPage_container'>
      <img src = {Image} alt = "Page not found" />
      <h1>404</h1>
      <p>This page does not exit. You will be redirect to the previous Page
        shortly.
      </p>
    </div>
   </section>
  )
}

export default ErrorPage