import React,{useEffect, useState} from 'react'
// import {candidates} from '../data'
import CandidateRating from './CandidateRating.jsx'
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from './Loader.jsx';


const ResultsElections = ({_id: id, thumbnail , title}) => {
     const [totalVotes, setTotalVotes] = useState(0)
     const [electionCandidates, setElectionCandidates] = useState([])
     const [isloading, setIsLoading] = useState(false)

     const token = useSelector(state => state?.vote?.currentVoter?.token);

     const getCandidates = async () =>{
          setIsLoading(true)
      try{
         const response = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}/candidates`,
          {withCredentials: true, headers: {Authorization: `Bearer ${token}`}
          })
          const candidates = await response.data;
          setElectionCandidates(candidates)
          //calculate the total votes in each election
          const total = candidates.reduce((sum, c) => sum + c.voteCount, 0);
          setTotalVotes(total);

      }catch(error){
        console.log(error)
      }
      setIsLoading(false)
     }


     useEffect(() => {
      getCandidates()
}, [])
   
  return (
    <>
    {isloading && <Loader />}
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
                    {candidate._id} {...candidate} totalVotes ={totalVotes}/>
                  )
            }
        </ul>
      <Link to ={`/elections/${id}/candidates`} className="btn primary full">Enter Election</Link>
   </article>
   </>
  )
}

export default ResultsElections