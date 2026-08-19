import { getWeatherIcon } from '../services/weatherApi'

export function WeatherCard({ weather, location }) {
  if (!weather) return null

  const { current } = weather
  if (!current) return null

  return (
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '4px' }}>{location.name}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Previsão dos próximos 7 dias</p>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        borderRadius: 'var(--radius-md)',
        padding: '20px',
        color: 'white',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 700, marginBottom: '4px' }}>
              {Math.round(current.temperature)}°C
            </div>
            <div style={{ fontSize: '14px', marginBottom: '4px', opacity: 0.95 }}>
              {current.description}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.85 }}>
              Sensação: {Math.round(current.apparentTemperature)}°C
            </div>
          </div>
          <div style={{ fontSize: '64px' }}>
            {getWeatherIcon(current.weatherCode)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {[
          { label: 'Umidade', value: `${current.humidity}%`, icon: '💧' },
          { label: 'Vento', value: `${Math.round(current.windSpeed)} km/h`, icon: '💨' },
          { label: 'Chuva', value: `${current.precipitation}mm`, icon: '🌧️' },
          { label: 'UV', value: `${current.uvIndex}`, icon: '☀️' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {label}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border)',
      }}>
        {[
          { label: 'Pressão', value: `${current.pressure} mb` },
          { label: 'Índice UV', value: current.uvIndex },
        ].map(({ label, value }) => (
          <div key={label}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              {label}
            </p>
            <p style={{ fontSize: '14px', fontWeight: 600 }}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
