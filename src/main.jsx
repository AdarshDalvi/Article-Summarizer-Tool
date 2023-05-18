import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SummaryContextProvider } from './Context/SummaryContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SummaryContextProvider>
      <App />
    </SummaryContextProvider>
  </React.StrictMode>,
)
