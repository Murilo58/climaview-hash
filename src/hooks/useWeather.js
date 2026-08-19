import { useContext, useCallback, useRef, useEffect, useMemo } from 'react'
import { WeatherContext } from '../context/WeatherContext'
import { fetchWeather } from '../services/weatherApi'

export function useWeather() {
  const context = useContext(WeatherContext)
  const timeoutRef = useRef(null)

  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider')
  }

  const { updateWeather, setLoading, setError } = context

  const loadWeather = useCallback(async (lat, lon, days = 7) => {
    setLoading(true)
    try {
      const data = await fetchWeather(lat, lon, days)
      updateWeather(data)
      localStorage.setItem(`weather_${lat}_${lon}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }))
    } catch (err) {
      setError(err.message)
    }
  }, [updateWeather, setLoading, setError])

  const scheduleNextUpdate = useCallback((days = 30) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      // Auto-refresh logic here
    }, days * 60 * 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    ...context,
    loadWeather,
    scheduleNextUpdate,
  }
}
