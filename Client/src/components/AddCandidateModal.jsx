import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'; 

const AddCandidateModal = () => {
   const [fullName, setFullName] = useState("")
   const [motto, setMotto] = useState("")
   const [image, setImage] = useState("")
   const [errorMsg, setErrorMsg] = useState("") // 👈 for showing error in UI
   const [loading, setLoading] = useState(false);

   const token = useSelector(state => state?.vote?.currentVoter?.token)
   const electionId = useSelector(state => state?.vote?.addCandidateElectionId)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const closeModal = () => {
      dispatch(UiActions.closeAddCandidateModal())
   }

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file && file.size > 1024 * 1024) {
         setErrorMsg("Image size must be less than 1MB")
         setImage("")
      } else {
         setErrorMsg("")
         setImage(file)
      }
   }

   const addCandidate = async (e) => {
      e.preventDefault()
      try {
        setLoading(true);
         if (!fullName || !motto || !image) {
            setErrorMsg("All fields are required")
            return
         }

         const candidateInfo = new FormData()
         candidateInfo.set('fullName', fullName)
         candidateInfo.set('motto', motto)
         candidateInfo.set('image', image)
         candidateInfo.set('currentElection', electionId)

         await axios.post(`${import.meta.env.VITE_API_URL}/candidates`, candidateInfo, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
         })
         setLoading(false)
         navigate(0)
         
      } catch (error) {
         console.log(error)
         setErrorMsg("Something went wrong while adding candidate")
      }
   }

   return (
    <>
     {loading && <Loader />}
      <section className="modal">
         <div className="modal_content">
            <header className="modal_header">
               <h4>Add Candidate</h4>
               <button className="modal_close" onClick={closeModal}><IoMdClose /></button>
            </header>

            {errorMsg && (
               <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                  {errorMsg}
               </div>
            )}

            <form onSubmit={addCandidate}>
               <div>
                  <h6>Candidate Name:</h6>
                  <input type="text" value={fullName} name="fullName" onChange={e =>
                     setFullName(e.target.value)} />
               </div>
               <div>
                  <h6>Candidate Motto:</h6>
                  <input type="text" value={motto} name="motto" onChange={e =>
                     setMotto(e.target.value)} />
               </div>
               <div>
                  <h6>Candidate Image:</h6>
                  <input type="file" name="image" onChange={handleImageChange}
                     accept="image/png, image/jpg, image/jpeg, image/webp, image/avif" />
               </div>
               <button type="submit" className="btn primary">Add Candidate</button>
            </form>
         </div>
      </section>
      </>
   )
}

export default AddCandidateModal
