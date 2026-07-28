import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

import { Navigate } from 'react-router-dom'

const Signout = () => {

  const { signout } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async (e) => {
    e.preventDefault()

    signout()


    navigate("/sigin")

  }
  return (
    <div>
      <Link onClick={handleSignOut} > Sign out</Link>
    </div>
  )
}

export default Signout