import { getWeatherIcon } from '../services/weatherApi'

export function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  return (
    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '20px', boxShadow: 'var(--shadow-md)' }}>
      <h3 style={{ marginBottom: '16px' }}>Próximos 7 Dias</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {forecast.slice(0, 7).map((day, idx) => {
          const date = new Date(day.date)
          const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' })
          const dayNum = date.getDate()

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                borderBottom: idx < 6 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ width: '80px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {idx === 0 ? 'Hoje' : idx === 1 ? 'Amanhã' : dayName}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>{dayNum}</p>
              </div>
              <div style={{ fontSize: '28px' }}>
                {getWeatherIcon(day.weatherCode)}
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>
                  {Math.round(day.tempMax)}°
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {Math.round(day.tempMin)}°
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
