import axios from 'axios'
import { useRouter } from 'vue-router'
import { alertInfo } from '@/services/sweetAlert'
const url = 'http://api-recetas.test/api'

const clearToken = async () => {
  const router = useRouter()
  await alertInfo('¡Alerta!', '¡Su sesión ha expirado!', 'info').then(() => {
    localStorage.clear()
    router.push({ name: 'login' })
  })
}

const api = axios.create({
  baseURL: url,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('Authorization')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    clearToken()
  }
  return Promise.reject(error)
})

export default api
