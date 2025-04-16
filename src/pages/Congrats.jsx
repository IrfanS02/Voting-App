import React from 'react'
import { Link } from 'react-router-dom'

const Congrats = () => {
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
