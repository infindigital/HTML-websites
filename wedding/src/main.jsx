import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './studio/studio.css'
import './experience/experience.css'

// BrowserRouter gives clean URLs (e.g. /invite/noor, with no "#"). Deep links
// work because Vercel rewrites unknown paths to /index.html (see
// wedding/vercel.json); the /imran-rashina and /rayyan-inaya subpaths are
// matched earlier there, so they still reach their own deployments.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
