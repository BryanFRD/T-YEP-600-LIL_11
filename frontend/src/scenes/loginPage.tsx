import React, { useState } from 'react'

import './LoginPage.css' // Vous pouvez ajouter du style personnalisé ici

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = () => {
    // Logic to handle login
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Username:', username)
  }

  const handleSignUp = () => {
    // Logic to handle sign up
    console.log('Navigate to sign up page')
  }

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Pseudo:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Connexion</button>
          <button type="button" onClick={handleSignUp}>
            Inscrivez-vous
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
