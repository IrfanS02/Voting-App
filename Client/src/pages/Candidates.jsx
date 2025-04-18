import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'
import ConfirmVote from '../components/ConfirmVote'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Candidates = () => {
  const navigate = useNavigate()
  //Access control 
  useEffect(() => {
    if(!token){
      navigate('/')
    }
  },[])

  const { id: selectedElection } = useParams()
  const [candidates, setCandidates] = useState([])
  const [canVote, setCanVote] = useState(true)


  const voteCandidateModalShowing = useSelector(state => state.ui.voteCandidateModalShowing)
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const votedId = useSelector(state => state?.vote?.currentVoter?.id) 
  const votedElections = useSelector(state => state?.vote?.currentVoter?.votedElections)


  const getCandidates = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/elections/${selectedElection}/candidates`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log("Voter response: ", response.data);
      console.log("Voted Elections: ", votedElections);
      console.log("Selected Election: ", selectedElection);
      setCandidates(response.data)
    } catch (error) {
      console.log(error)
    } 
  }

 //check if voter has already voted
  const getVoter = async () => {
    try{
       const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/voters/${votedId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const votedElections = await response.data.votedElections;
      console.log("Voter response: ", response.data);
      console.log("Voted Elections: ", votedElections);
      console.log("Selected Election: ", selectedElection);
      if(votedElections.includes(selectedElection)) {
        setCanVote(false)
      }
      
    }catch(error){
      console.log(error)
    }
  }
   
  useEffect(() => {
    getCandidates()
    getVoter()
   
    // if(votedElections.includes(selectedElection)) {
    //         setCanVote(false)
    // }
  }, [])
  
  return (
    <>
      <section className="candidates">
        {!canVote ? 
          <header className="candidates_header">
            <h1>Already Voted</h1>
            <p>
              You are only permitted to vote once in this election. Please vote in
              another election or sign out.
            </p>
          </header>
         : 
          <>
            {candidates.length > 0 ? 
              <header className="candidates_header">
                <h1>Vote for your Candidate</h1>
                <p>
                  These are the candidates for the selected election. Please vote once and wisely,
                  because you won't be allowed to vote again.
                </p>
              </header>
             : 
              <header className="candidates_header">
                <h1>Inactive Election</h1>
                <p>
                  There are no candidates found for this election. Please check back later.
                </p>
              </header>
            }
            <div className="container candidates_container">
              {candidates.map(candidate => 
                <Candidate key={candidate._id} {...candidate} />
              )}
            </div>
          </>
            }
      </section>

      {voteCandidateModalShowing && canVote && (<ConfirmVote selectedElection={selectedElection}
      />)}
    </>
          )
        }


export default Candidates