import { useContext } from 'react'

import UserContext from '../context/UserContext'

const NotFound = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold text-gray-700">
        Oups ! Page non trouvée.
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        On dirait que vous avez rencontré une erreur sauvage... mais elle s'est
        enfuie !
      </p>
      <img
        src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
        alt="Scène de combat 2D"
        className="w-1/2 mt-6"
      />
      <p className="mt-4">Retournons à la sécurité !</p>
      {user ? (
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Retour à l'accueil
        </a>
      ) : (
        <a
          href="/login"
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </a>
      )}
    </div>
  )
}

export default NotFound
