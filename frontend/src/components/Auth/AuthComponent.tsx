import React, { useState } from 'react'

const AuthComponent: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    firstName: '',
    lastName: '',
    pseudo: '',
    email: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      console.log('Register:', formData)
      // Implementer la logique d'inscription ici
    } else {
      console.log('Login:', {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password
      })
      // Implementer la logique de connexion ici
    }
  }

  const toggleMode = () => setIsSignUp(!isSignUp)

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-center">
          {isSignUp ? 'Inscription' : 'Connexion'}
        </h1>
        <form onSubmit={handleAction} className="space-y-6">
          {isSignUp ? (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="pseudo"
                placeholder="Pseudo"
                value={formData.pseudo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
            </>
          ) : (
            <input
              type="text"
              name="emailOrUsername"
              placeholder="Identifiant (email ou pseudo)"
              value={formData.emailOrUsername}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isSignUp ? "S'inscrire" : 'Connexion'}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100 focus:outline-none"
              onClick={toggleMode}
            >
              {isSignUp ? 'Connexion' : "S'inscrire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthComponent
