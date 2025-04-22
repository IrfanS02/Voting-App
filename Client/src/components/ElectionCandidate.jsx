import React, { useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const ElectionCandidate = ({ fullName, image, motto, _id: id }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const isAdmin = useSelector(state => state?.vote?.currentVoter?.isAdmin) // 👈 get isAdmin

  const deleteCandidate = async () => {
    try {
      setLoading(true)
      await axios.delete(`${import.meta.env.VITE_API_URL}/candidates/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      setLoading(false)
      navigate(0)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <li className="electionCandidate">
        <div className="electionCandidate_image">
          <img src={image} alt={fullName} />
        </div>
        <div>
          <h5>{fullName}</h5>
          <small>{motto?.length > 70 ? motto.substring(0, 70) + "..." : motto}</small>
          
          {/* 👇 Only show for admin */}
          {isAdmin && (
            <button className="electionCandidate_btn" onClick={deleteCandidate}>
              <IoMdTrash />
            </button>
          )}
        </div>
      </li>
    </>
  )
}

export default ElectionCandidate
