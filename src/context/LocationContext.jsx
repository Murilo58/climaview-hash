import { createContext, useState, useCallback, useMemo } from 'react'

export const LocationContext = createContext()

export function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    name: '',
    lat: -23.5505,
    lon: -46.6333,
    country: 'BR',
  })

  const [recentLocations, setRecentLocations] = useState(() => {
    const stored = localStorage.getItem('recentLocations')
    return stored ? JSON.parse(stored) : []
  })

  const updateLocation = useCallback((name, lat, lon, country = 'BR') => {
    setLocation({ name, lat, lon, country })
    setRecentLocations(prev => {
      const updated = [
        { name, lat, lon, country, timestamp: Date.now() },
        ...prev.filter(l => !(l.lat === lat && l.lon === lon))
      ].slice(0, 5)
      localStorage.setItem('recentLocations', JSON.stringify(updated))
      return updated
    })
  }, [])

  const value = useMemo(() => ({
    location,
    updateLocation,
    recentLocations,
  }), [location, updateLocation, recentLocations])

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  )
}
