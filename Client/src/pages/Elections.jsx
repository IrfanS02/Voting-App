import React,{useState,useEffect} from 'react'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import {useDispatch, useSelector} from 'react-redux'
import {UiActions} from '../store/ui-slice'
import UpdateElectionModal from '../components/UpdateElectionModal'
import axios from 'axios'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const Elections = () => {
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const navigate = useNavigate()
  //Access control 
   useEffect(() => {
     if(!token){
       navigate('/')
     }
   },[])
 
  const [elections, setElections] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch()
  //open add election modal
  const openModal = () =>{
    dispatch(UiActions.openElectionModal())
  }
  
  const isAdmin = useSelector(state => state?.vote?.currentVoter?.isAdmin)
  const electionModalShowing = useSelector(state => state.ui.electionModalShowing)
  const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing)
  
  const getElections = async () =>{
    setIsLoading(true)
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/elections/`,
        {withCredentials: true, headers: {Authorization: `Bearer ${token}`}
        }) 
        setElections(response.data);
    }catch(error){
       console.log(error)
    }
    setIsLoading(false)
  }

  
useEffect(() => {
  getElections();
}, []);

  return (
   <>
    <section className="elections">
      <div className="container elections_container">
        <header className="elections_header">
          <h1>Ongoing Elections</h1>
          {isAdmin && <button className="btn primary" onClick={openModal}>
            Create New Election
          </button>}
          {isLoading ? <Loader /> : <menu className="elections_menu">
            {
              elections.map(election => <Election key ={election._id}{...election} />)
            }
          </menu>}
        </header>
      </div>
    </section> 

    {electionModalShowing && <AddElectionModal />}
    {updateElectionModalShowing && <UpdateElectionModal />}

   </>
  )
}

export default Elections