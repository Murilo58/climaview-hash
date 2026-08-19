import { useContext, useCallback } from 'react'
import { LocationContext } from '../context/LocationContext'
import { getCurrentPosition } from '../services/geolocation'

export function useLocation() {
  const context = useContext(LocationContext)

  if (!context) {
    throw new Error('useLocation must be used within LocationProvider')
  }

  const getGeolocation = useCallback(async () => {
    try {
      const { lat, lon } = await getCurrentPosition()
      return { lat, lon }
    } catch (err) {
      console.error('Geolocation error:', err)
      return null
    }
  }, [])

  const searchLocation = useCallback(async (query) => {
    if (!query.trim()) return null

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=pt&format=json`
      )
      const data = await response.json()

      if (!data.results || data.results.length === 0) {
        return null
      }

      const result = data.results[0]
      return {
        name: `${result.name}${result.admin1 ? ', ' + result.admin1 : ''}`,
        lat: result.latitude,
        lon: result.longitude,
        country: result.country_code,
      }
    } catch (err) {
      console.error('Search error:', err)
      return null
    }
  }, [])

  return {
    ...context,
    getGeolocation,
    searchLocation,
  }
}
