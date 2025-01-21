function isJson(string: string) {
  try {
    JSON.parse(string)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false
  }
}

function getStore(key: string) {
  if (isJson(localStorage.getItem(key) || '')) {
    return JSON.parse(localStorage.getItem(key) || '')
  } else {
    return localStorage.getItem(key) || ''
  }
}

function setStore(key: string, value: string | object) {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  }

  if (typeof value === 'string') {
    localStorage.setItem(key, value)
  }
}

export { getStore, setStore }

