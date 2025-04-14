import React,{useState} from 'react'
import {candidates} from '../data'
import CandidateRating from './CandidateRating.jsx'
import {Link} from 'react-router-dom';

const ResultsElections = ({id, thumbnail , title}) => {
     const [totalVotes, setTotalVotes] = useState(521)

    //get candidates that belongn to this election iteration
    const electionCandidates = candidates.filter(candidate => {
        return candidate.election == id
    })
  return (
   <article className="result">
    <header className="result_header">
        <h4>{title}</h4>
        <div className="result_header-image">
            <img src = {thumbnail} alt = {title} />
        </div>
        </header>
        <ul className="result_lisit">
            {
                  electionCandidates.map(candidate => <CandidateRating key =
                    {candidate.id} {...candidate} totalVotes ={totalVotes}/>
                  )
            }
        </ul>
      <Link to ={`/elections/${id}/candidates`} className="btn primary full">Enter Election</Link>
   </article>
  )
}

export default ResultsElections