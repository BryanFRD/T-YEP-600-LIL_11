import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

import { ServerContextProvider } from './context/ServerContext.tsx'
import { UserContextProvider } from './context/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ServerContextProvider>
        <App />
      </ServerContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
