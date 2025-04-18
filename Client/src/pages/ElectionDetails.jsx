import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ElectionCandidate from '../components/ElectionCandidate'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import AddCandidateModal from '../components/AddCandidateModal'
import axios from 'axios'
import { voteActions } from '../store/vote-slice'

const ElectionDetails = () => {
  
     //Access control 
      useEffect(() => {
        if(!token){
          navigate('/')
        }
      },[])
  
  const [isLoading, setIsLoading] = useState(false)
  const [election, setElections] = useState([])
  const [candidates, setCandidates] = useState([])
  const [voters, setVoters] = useState([])

  const {id} = useParams()
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addCandidateModalShowing = useSelector(state => state.ui.addCandidateModalShowing)
  const token = useSelector(state => state.vote.currentVoter?.token)
  const isAdmin = useSelector(state => state?.vote?.currentVoter?.isAdmin)
  const getElection = async ()=>{
      setIsLoading(true)
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}`,
          {withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
          setElections(response.data);
        }catch (error) {
        console.log(error)
      }
  }
  
  const getCandidates = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}/candidates`,
        {withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
        setCandidates(response.data);
    }catch (error){
      console.log(error)
    }
  }


  const getVoters = async() =>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}/voters`,
        {withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
        setVoters(response.data);
    }catch(error){
      console.log(error)
    }
  }

  const deleteElection = async() =>{
    try{
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/elections/${id}`,
        {withCredentials: true , headers: {Authorization: `Bearer ${token}`}});
        navigate('/elections')
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getElection()
    getCandidates()
    getVoters()
    dispatch(UiActions.closeAddCandidateModal());
  },[])
   
  // open add candidate modal
  const openModal =() =>{
    dispatch(UiActions.openAddCandidateModal())
    dispatch(voteActions.changeAddCandidateElectionId(id))
  }


  return (
    <>
   <section className="electionDetails">
    <div className="container electionDetails_container">
      <h2>{election.title}</h2>
      <p>{election.description}</p>
      <div className="electionDetails_image">
        <img src ={election.thumbnail} alt = {election.title} />
      </div>
      <menu className="electionDetails_candidates">
        {
          candidates.map(candidate => <ElectionCandidate key = {candidate._id}
            {...candidate} />
          )
        }
        {isAdmin && <button className="add_candidate-btn" onClick ={openModal}>
         <IoAddCircleOutline />
        </button>}
      </menu>

      <menu className="voters">
        <h2>Voters</h2>
        <table className="voter_table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {
            voters.map((voter, index) => (
              <tr key={`${voter._id}-${index}`}>
                <td><h5>{voter.fullName}</h5></td>
                <td>{voter.email}</td>
                <td>{new Date(voter.createdAt).toLocaleString()}</td>
              </tr>
            ))
          }
        </tbody>

        </table>
      </menu>

      {isAdmin && <button className='btn danger full' onClick={deleteElection}>Delete Election</button>}
    </div>
   </section>

   {addCandidateModalShowing && <AddCandidateModal />}
   </>
  )
}

export default ElectionDetails
