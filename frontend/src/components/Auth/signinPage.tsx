import { useState } from 'react'

import Button from './buttonComponent'
import FormInputComponent from './formInputComponent'

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [pseudo, setPseudo] = useState('')

  console.log('Email:', email)
  console.log('Pseudo:', pseudo)

  const handleSignIn = () => {
    console.log('Navigate to sign up page')
  }

  const handleLogin = () => {}

  return (
    <div>
      <h1 className="text-6xl text-center mb-8">Inscription</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
        className="flex flex-col items-center justify-center w-3/5 h-full"
      >
        <div className="grid grid-cols-3 w-full justify-center items-center">
          <label htmlFor="email" className="ms-auto me-3 text-2xl">
            Email
          </label>
          <FormInputComponent
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            className="p-2 m-2 border-solid border-2 border-black rounded-lg col-span-2"
          />
        </div>
        <div className="grid grid-cols-3 w-full justify-center items-center">
          <label htmlFor="pseudo" className="ms-auto me-3 text-2xl">
            Pseudo
          </label>
          <FormInputComponent
            type="pseudo"
            name="pseudo"
            placeholder="Pseudo"
            onChange={e => setPseudo(e.target.value)}
            className="p-2 m-2 border-solid border-2 border-black rounded-lg col-span-2"
          />
        </div>
        <div className="mt-8 justify-center gap-3">
          <Button
            className="text-3xl"
            text="S'inscrire"
            onClick={handleSignIn}
          />
        </div>
      </form>
    </div>
  )
}

export default SigninPage
