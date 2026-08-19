export function AlertBanner({ alerts, onRemove }) {
  if (!alerts || alerts.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {alerts.map((alert) => {
        const bgMap = {
          danger: 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)',
          warning: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
          info: 'linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)',
        }

        const textColorMap = {
          danger: 'white',
          warning: '#78350f',
          info: '#0c2340',
        }

        const borderMap = {
          danger: '#dc2626',
          warning: '#f97316',
          info: '#0284c7',
        }

        return (
          <div
            key={alert.id}
            style={{
              background: bgMap[alert.type] || bgMap.info,
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              color: textColorMap[alert.type],
              borderLeft: `4px solid ${borderMap[alert.type]}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                {alert.title}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                {alert.message}
              </div>
            </div>
            <button
              onClick={() => onRemove(alert.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0',
                minWidth: '24px',
              }}
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
