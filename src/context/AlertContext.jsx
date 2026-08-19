import { createContext, useState, useCallback } from 'react'

export const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([])

  const addAlert = useCallback((type, title, message) => {
    const id = Date.now()
    const alert = { id, type, title, message, timestamp: new Date() }
    setAlerts(prev => [...prev, alert])

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message })
    }

    return id
  }, [])

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }, [])

  const clearAlerts = useCallback(() => {
    setAlerts([])
  }, [])

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  )
}
