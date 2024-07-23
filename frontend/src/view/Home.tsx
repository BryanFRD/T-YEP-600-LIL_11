import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from '../context/UserContext'
import PhaserGame from '../game'

const Home = () => {
  let navigate = useNavigate()

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
    }
  }, [user])

  return <PhaserGame />
}

export default Home
