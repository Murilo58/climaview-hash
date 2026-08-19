import { useState } from 'react'
import { useLocation } from '../hooks/useLocation'

export function LocationSearch({ onLocationSelect }) {
  const { searchLocation, getGeolocation, recentLocations } = useLocation()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    const result = await searchLocation(query)
    setLoading(false)

    if (result) {
      onLocationSelect(result)
      setQuery('')
    }
  }

  const handleGeolocation = async () => {
    setLoading(true)
    const coords = await getGeolocation()
    setLoading(false)

    if (coords) {
      const result = await searchLocation(`${coords.lat},${coords.lon}`)
      if (result) {
        onLocationSelect(result)
      }
    }
  }

  return (
    <div style={{ background: 'white', padding: '20px', boxShadow: 'var(--shadow-md)' }}>
      <form onSubmit={handleSearch} style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Buscar cidade..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            style={{ flex: 1 }}
          />
          <button type="submit" disabled={loading} style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '10px 16px',
            borderRadius: 'var(--radius-sm)',
          }}>
            {loading ? '⏳' : '🔍'}
          </button>
        </div>
      </form>

      <button
        onClick={handleGeolocation}
        disabled={loading}
        style={{
          width: '100%',
          background: 'var(--bg-gradient)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '12px',
          fontWeight: 600,
        }}
      >
        {loading ? '⏳ Detectando...' : '📍 Usar Minha Localização'}
      </button>

      {recentLocations.length > 0 && (
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Recentes:
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {recentLocations.map((loc) => (
              <button
                key={`${loc.lat}-${loc.lon}`}
                onClick={() => onLocationSelect(loc)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
