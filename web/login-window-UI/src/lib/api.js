const API_BASE = import.meta.env.VITE_API_URL || '/api/auth'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export function registerUser({ username, email, password }) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })
}

export function loginUser({ email, password }) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function getMe(token) {
  return request('/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
