import React, { useState } from 'react'
import {IoMdClose} from 'react-icons/io'
import { useDispatch } from 'react-redux';
import { UiActions } from '../store/ui-slice';

const AddElectionModal = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    
    const dispatch = useDispatch()

    //Close add election modal
    const closeModal = () => {
        dispatch(UiActions.closeElectionModal())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submission logic here
        
        // Close modal after submission
        dispatch(UiActions.closeElectionModal());
    }

  return (

    <section className="modal">
       <div className="modal_content">
        <header className="modal_header">
            <h4>Create New Election</h4>
            <button className="modal_close" onClick={closeModal}><IoMdClose /></button>
        </header>
        <form>
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
            className="btn primary" onChange={handleSubmit}>Add Election</button>
        </form>
       </div>
    </section>
  )
}

export default AddElectionModal