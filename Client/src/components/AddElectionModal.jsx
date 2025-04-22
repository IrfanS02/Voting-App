import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader'; 

const AddElectionModal = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Close add election modal
    const closeModal = () => {
        
        dispatch(UiActions.closeElectionModal())
    }
    
    const token = useSelector(state => state?.vote?.currentVoter?.token)
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Add your submission logic here
        
    //     // Close modal after submission
    //     dispatch(UiActions.closeElectionModal());
    // }

    const createElection = async (e) => {
         e.preventDefault()
         try{
            setLoading(true);
              const electionData = new FormData()
              electionData.set('title', title)
              electionData.set('description', description)
              electionData.set('thumbnail', thumbnail)
              const response = await axios.post(`${import.meta.env.VITE_API_URL}/elections/`, electionData,
                {withCredentials: true, headers: {Authorization: `Bearer ${token}`}
                })
                setLoading(false);
                closeModal()
                navigate(0)
         }catch(error){
            console.log(error)
         }
    }

  return (
    <>
     {loading && <Loader />}
    <section className="modal">
       <div className="modal_content">
        <header className="modal_header">
            <h4>Create New Election</h4>
            <button className="modal_close" onClick={closeModal}><IoMdClose /></button>
        </header>
        <form onSubmit={createElection}>
            <div>
                <h6>Election Title:</h6>
                <input type ="text" value ={title} onChange ={ e => setTitle(e.target.value)} name="title" />
            </div>
            <div>
                <h6>Election Description:</h6>
                <input type ="text" value ={description}onChange ={ e => setDescription(e.target.value)}name="description" />
            </div>
            <div>
                <h6>Election Thumbnail:</h6>
                <input type ="file" name="thumbnail"  onChange ={ e => setThumbnail(e.target.files[0])}
                accept="image/png, image/jpg, image/jpeg, image/webp, image/avif" />
            </div>
            <button type="submit"
            className="btn primary" >Add Election</button>
        </form>
       </div>
    </section>
    </>
  )
}

export default AddElectionModal
//onChange={handleSubmit}