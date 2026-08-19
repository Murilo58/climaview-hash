import { createContext, useState, useCallback, useMemo } from 'react'

export const WeatherContext = createContext()

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState({
    current: null,
    forecast: [],
    loading: false,
    error: null,
    lastUpdate: null,
  })

  const updateWeather = useCallback((data) => {
    setWeather(prev => ({
      ...prev,
      current: data.current,
      forecast: data.forecast,
      loading: false,
      error: null,
      lastUpdate: new Date(),
    }))
  }, [])

  const setLoading = useCallback((loading) => {
    setWeather(prev => ({ ...prev, loading }))
  }, [])

  const setError = useCallback((error) => {
    setWeather(prev => ({ ...prev, error, loading: false }))
  }, [])

  const value = useMemo(() => ({
    ...weather,
    updateWeather,
    setLoading,
    setError,
  }), [weather, updateWeather, setLoading, setError])

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}
