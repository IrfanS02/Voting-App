import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Congrats = () => {
const token = useSelector(state => state?.vote?.currentVoter?.token)
const navigate = useNavigate()
   //Access control 
    useEffect(() => {
      if(!token){
        navigate('/')
      }
    },[])

  return (
    <div>
      <section className="congrats">
        <div className="container congrats_container">
          <h2>Thanks for you Vote!</h2>
          <p>Your vote is now added to you Candidate's vote count, You will be redirected shortly to see the new result.</p>
          <Link to ='/results' className="btn sm primary">See Results</Link>
        </div>
      </section>
    </div>
  )
}

export default Congrats
