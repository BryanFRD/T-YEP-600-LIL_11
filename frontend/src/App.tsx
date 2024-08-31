import { ToastContainer, Zoom } from 'react-toastify'

import Router from './routes/router'

import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Zoom}
        theme="light"
      />
    </>
  )
}

export default App
