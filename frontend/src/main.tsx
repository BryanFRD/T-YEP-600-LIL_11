import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

import log, { LogLevelDesc } from 'loglevel'

import { ServerContextProvider } from './context/ServerContext.tsx'
import { UserContextProvider } from './context/UserContext.tsx'
import getEnvValue from './utils/environment.ts'

const logLevel = getEnvValue('LOG_LEVEL') || 'info'
log.setLevel(logLevel as LogLevelDesc)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServerContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ServerContextProvider>
  </React.StrictMode>
)
