import { useEffect, useState, useRef } from 'react'
import { Header } from './components/Header'
import { LocationSearch } from './components/LocationSearch'
import { WeatherCard } from './components/WeatherCard'
import { ForecastList } from './components/ForecastList'
import { AlertBanner } from './components/AlertBanner'
import { useLocation } from './hooks/useLocation'
import { useWeather } from './hooks/useWeather'
import { useAlerts } from './hooks/useAlerts'
import { requestNotificationPermission } from './services/geolocation'
import './App.css'

export function App() {
  const { location, updateLocation } = useLocation()
  const { current, forecast, loading, error, loadWeather } = useWeather()
  const { alerts, removeAlert } = useAlerts()
  const [hasLocation, setHasLocation] = useState(false)
  const weatherLoadedRef = useRef(new Set())

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => {
    if (hasLocation && location.lat && location.lon) {
      const key = `${location.lat}-${location.lon}`
      if (!weatherLoadedRef.current.has(key)) {
        weatherLoadedRef.current.add(key)
        loadWeather(location.lat, location.lon, 7)
      }
    }
  }, [location.lat, location.lon, hasLocation, loadWeather])

  useEffect(() => {
    const initializeLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateLocation('Detectado', pos.coords.latitude, pos.coords.longitude)
          setHasLocation(true)
        },
        () => {
          setHasLocation(true)
        }
      )
    }

    initializeLocation()
  }, [])

  const handleLocationSelect = (loc) => {
    updateLocation(loc.name, loc.lat, loc.lon, loc.country)
    setHasLocation(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <LocationSearch onLocationSelect={handleLocationSelect} />

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
            color: 'white',
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            marginTop: '20px',
            marginBottom: '20px',
          }}>
            ⚠️ Erro: {error}
          </div>
        )}

        {alerts.length > 0 && (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <AlertBanner alerts={alerts} onRemove={removeAlert} />
          </div>
        )}

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-secondary)',
          }}>
            ⏳ Carregando dados climáticos...
          </div>
        )}

        {hasLocation && !loading && current && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            marginTop: '20px',
          }}>
            <WeatherCard weather={{ current, forecast }} location={location} />
            <ForecastList forecast={forecast} />
          </div>
        )}

        {hasLocation && !loading && !current && !error && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-secondary)',
          }}>
            Busque uma localização para ver a previsão
          </div>
        )}
      </main>

      <footer style={{
        background: 'white',
        borderTop: '1px solid var(--border)',
        padding: '16px 20px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)',
      }}>
        Dados fornecidos por Open-Meteo API | ClimaView Hash v1.0
      </footer>
    </div>
  )
}
