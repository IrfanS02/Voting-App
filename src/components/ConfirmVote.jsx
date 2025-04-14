import React, { useEffect, useState } from 'react'
import { candidates } from '../data'
import { UiActions } from '../store/ui-slice'
import { useDispatch, useSelector } from 'react-redux'

const ConfirmVote = () => {

    const[modalCandidate, setModalCandidate] = useState({})

    const dispatch = useDispatch()

    //close confirm vote modal
    const CloseCandiateModal = () =>{
       dispatch(UiActions.closeVoteCandidateModal())
    }

    // get selected candidate id form redux store
    const selectedVoteCandidate = useSelector(state => state.vote.selectedVoteCandidate)
    
    //get the selected candidate
    const fetchCandidate = () =>{
        candidates.find(candidate =>{
            if(candidate.id == selectedVoteCandidate){
                setModalCandidate(candidate);
            }
        })
    }

    useEffect(() =>{
        fetchCandidate()
    },[])

  return (
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
        <button className="btn primary">
            Confirm
        </button>
    </div>
   </div>
   </section>
  )
}

export default ConfirmVote