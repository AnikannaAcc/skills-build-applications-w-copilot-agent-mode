import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const pageTitle = CODESPACE_NAME
  ? `OctoFit Tracker — ${CODESPACE_NAME}`
  : 'OctoFit Tracker — localhost fallback'

document.title = pageTitle

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
