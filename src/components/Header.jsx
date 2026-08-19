export function Header({ title = 'ClimaView Hash' }) {
  return (
    <header style={{
      background: 'var(--bg-gradient)',
      color: 'white',
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: 'var(--shadow-lg)',
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700 }}>{title}</h1>
      <button
        onClick={() => window.location.reload()}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: '2px solid white',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        🔄 Atualizar
      </button>
    </header>
  )
}
