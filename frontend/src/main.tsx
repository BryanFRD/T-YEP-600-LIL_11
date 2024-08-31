import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

import log, { LogLevelDesc } from 'loglevel'

import getEnvValue from './utils/environment.ts'
import { Provider } from 'react-redux'
import store from './store.ts'

const logLevel = getEnvValue('LOG_LEVEL') || 'info'
log.setLevel(logLevel as LogLevelDesc)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
