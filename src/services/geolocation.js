export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`))
      }
    )
  })
}

export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return Promise.resolve(false)
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve(true)
  }

  if (Notification.permission === 'denied') {
    return Promise.resolve(false)
  }

  return Notification.requestPermission().then(permission => permission === 'granted')
}
