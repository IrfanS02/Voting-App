import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { UiActions } from '../store/ui-slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { voteActions } from '../store/vote-slice'
import { useNavigate } from 'react-router-dom'

const ConfirmVote = ({selectedElection}) => {

    const[modalCandidate, setModalCandidate] = useState({})
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //close confirm vote modal
    const CloseCandiateModal = () =>{
       dispatch(UiActions.closeVoteCandidateModal())
    }

    // get selected candidate id form redux store
    const selectedVoteCandidate = useSelector(state => state.vote.selectedVoteCandidate)
    const token = useSelector(state=> state?.vote?.currentVoter?.token)
    
    
    const currentVoter = useSelector(state => state?.vote?.currentVoter)
    //get the candidate selected to be voted for
    const fetchCandidate = async () =>{
       try{
        setLoading(true);
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/candidates/${selectedVoteCandidate}`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          setModalCandidate(await response.data)
          setLoading(false)
       }catch(error){
        console.log(error)
       }
    }

// confirm vote for selected candidate
const confrimVote = async () =>{
    try{
        setLoading(true)
        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/candidates/${selectedVoteCandidate}`,
            {selectedElection},
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` }
            }
          )
          const voteResult = await response.data;
          dispatch(voteActions.changeCurrentVoter({...currentVoter, votedElections: voteResult}))
          setLoading(false)
          navigate('/congrats')
        }catch(error){
        console.log(error)
    }

    CloseCandiateModal()
}


    useEffect(() => {
        fetchCandidate();
    }, []); 

  return (
    <>
    {loading && <Loader />}
    <section className="modal">
    <div className="modal_content confirm_vote-content">
        <h5>Please Confirm you Vote</h5>
        <div className="confirm_Vote-image">
            <img src ={modalCandidate.image} alt ={modalCandidate.fullName}/>
        </div>
        <h2>{modalCandidate.fullName?.length > 17 ? modalCandidate.fullName?.substring(0,17) +"..." :
            modalCandidate?.fullName}</h2>
        <p>{modalCandidate.motto?.length > 45 ? modalCandidate.motto?.substring(0,45) +"..." :
            modalCandidate?.motto}</p>
        <div className="confirm_vote-cta">
            <button className="btn" onClick={CloseCandiateModal}>
                Cancel
            </button>
            <button className="btn primary" onClick={confrimVote}>
                Confirm
            </button>
        </div>
    </div>
    </section>
    </>
  )
}

export default ConfirmVote