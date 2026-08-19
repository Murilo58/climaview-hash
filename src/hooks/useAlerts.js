import { useContext, useCallback } from 'react'
import { AlertContext } from '../context/AlertContext'

const SEVERE_WEATHER_THRESHOLDS = {
  windSpeed: 40,
  rainChance: 80,
  uvIndex: 8,
}

export function useAlerts() {
  const context = useContext(AlertContext)

  if (!context) {
    throw new Error('useAlerts must be used within AlertProvider')
  }

  const checkWeatherAlerts = useCallback((weatherData) => {
    if (!weatherData?.current) return

    const current = weatherData.current
    const alerts = []

    if (current.windSpeed > SEVERE_WEATHER_THRESHOLDS.windSpeed) {
      context.addAlert(
        'warning',
        '⚠️ Alerta de Vento',
        `Ventos de ${current.windSpeed} km/h esperados`
      )
    }

    if (current.rainChance > SEVERE_WEATHER_THRESHOLDS.rainChance) {
      context.addAlert(
        'warning',
        '🌧️ Alerta de Chuva',
        `Chance de chuva de ${current.rainChance}%`
      )
    }

    if (current.uvIndex > SEVERE_WEATHER_THRESHOLDS.uvIndex) {
      context.addAlert(
        'danger',
        '☀️ Alerta UV Alto',
        `Índice UV de ${current.uvIndex} - Use protetor solar`
      )
    }

    return alerts
  }, [context])

  return {
    ...context,
    checkWeatherAlerts,
  }
}
