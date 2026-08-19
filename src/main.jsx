import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { LocationProvider } from './context/LocationContext'
import { WeatherProvider } from './context/WeatherContext'
import { AlertProvider } from './context/AlertContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <LocationProvider>
        <WeatherProvider>
          <App />
        </WeatherProvider>
      </LocationProvider>
    </AlertProvider>
  </React.StrictMode>,
)
