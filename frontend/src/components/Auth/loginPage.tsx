import React, { useState } from 'react'

import Button from './buttonComponent'
import FormInputComponent from './formInputComponent'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Email:', email)
    console.log('Password:', password)
  }

  const handleSignUp = () => {
    console.log('Navigate to sign up page')
  }

  return (
    <div>
      <h1 className="text-red-700 text-6xl text-center">Connexion</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <div className="flex justify-center">
          <label htmlFor="email" className="inline-flex items-center">
            Identifiant
          </label>
          <FormInputComponent
            type="identifiant"
            name="identifiant"
            placeholder="Mail / Pseudo"
            onChange={e => setEmail(e.target.value)}
            className="inline-flex p-2 m-2 border-solid border-2 border-black rounded-lg w-1/3"
          />
        </div>
        <div className="flex justify-center">
          <label htmlFor="password" className="inline-flex items-center">
            Mot de passe:
          </label>
          <FormInputComponent
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={e => setPassword(e.target.value)}
            className="inline-flex p-2 m-2 border-solid border-2 border-black rounded-lg w-1/3"
          />
        </div>
        <div className="flex mt-8 justify-center gap-3">
          <Button className="text-3xl" text="Connexion" onClick={handleLogin} />
          <Button
            className="text-3xl"
            text="Inscription"
            onClick={handleSignUp}
          />
        </div>
      </form>
    </div>
  )
}

export default LoginPage
