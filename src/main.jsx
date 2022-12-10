import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {CotizadorAppProvider} from './contexts/CotizadorApp'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CotizadorAppProvider>
      <App />
    </CotizadorAppProvider>
  </React.StrictMode>
)
