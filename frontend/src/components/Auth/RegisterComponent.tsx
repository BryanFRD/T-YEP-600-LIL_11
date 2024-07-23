import {
  faEnvelope,
  faLock,
  faUser,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Logic to handle registration
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animatedBackground blur-sm absolute w-full h-full"></div>
      <div className="relative w-full max-w-md p-8 space-y-16 rounded-md bg-white bg-opacity-80">
        <h1 className="text-3xl font-bold text-center">Créer un compte</h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              name="username"
              placeholder="Pseudo"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            S'inscrire
          </button>
        </form>
        <div className="flex justify-center">
          <a href="/login" className="text-cyan-500 hover:underline">
            Déjà un compte ? Connectez-vous
          </a>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent
