import React, { useEffect, useState } from 'react'
// import {elections as dummyElections} from "../data";
import ResultElection from "../components/ResultsElections";
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const navigate = useNavigate()
  //Access control 
   useEffect(() => {
     if(!token){
       navigate('/')
     }
   },[])
  const [election, setElection] = useState([]);
  
  const getElections = async (e) =>{
      try{
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/elections`,
            {withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
            const elections = await response.data;
            setElection(elections)
          }catch(error){
          console.log(error)
      }
  }

  useEffect(()=>{
      getElections()
  },[])


  return (
    <section className="results">
      <div className="container results_container">
        {
          election.map(election => <ResultElection key =
            {election._id} {...election} />
          )
        }
      </div>
    </section>
  )
}

export default Results
