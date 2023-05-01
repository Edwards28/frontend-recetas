import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/config'
import { alertConfirm, alertHtml, alertInfo } from '../../../services/sweetAlert'

export const useAuth = () => {
  const router = useRouter()
  const send = ref(false)
  const errors = ref('')
  const form = ref({})

  const login = async () => {
    errors.value = ''
    try {
      send.value = true
      const { data } = await api.post('/login', form.value)
      send.value = false
      return alertInfo('¡Éxito!', data.message, 'success').then(() => {
        localStorage.clear()
        localStorage.setItem('Authorization', data.token)
        localStorage.setItem('Usuario', data.usuario)
        router.push({ name: 'home' })
      })
    } catch (e) {
      send.value = false
      if (e.response.status === 400) {
        for (const key in e.response.data.errors) {
          errors.value += `<b>${key}: </b>${e.response.data.errors[key][0]}</br>`
        }
        return alertHtml('¡Error!', errors.value, 'error')
      } else {
        return alertInfo('¡Error!', e.response.data.message, 'error')
      }
    }
  }

  const register = async () => {
    errors.value = ''
    try {
      send.value = true
      const { data } = await api.post('/register', form.value)
      send.value = false
      return alertInfo('¡Éxito!', data.message, 'success').then(() => {
        router.push({ name: 'login' })
      })
    } catch (e) {
      send.value = false
      if (e.response.status === 400) {
        for (const key in e.response.data.errors) {
          errors.value += `<b>${key}: </b>${e.response.data.errors[key][0]}</br>`
        }
        return alertHtml('¡Error!', errors.value, 'error')
      } else {
        return alertInfo('¡Error!', e.response.data.message, 'error')
      }
    }
  }

  const logout = async () => {
    try {
      const { isConfirmed } = await alertConfirm('¿Seguro/a desea cerrar sesión?', 'Cerrar')
      if (isConfirmed) {
        const { data } = await api.post('/logout')
        return alertInfo('¡Alerta!', data.message, 'info').then(() => {
          localStorage.clear()
          router.push({ name: 'login' })
        })
      }
    } catch (e) {
      return alertInfo('¡Alerta!', '¡Su sesión ha expirado!', 'info').then(() => {
        localStorage.clear()
        router.push({ name: 'login' })
      })
    }
  }

  return {
    form,
    login,
    logout,
    register,
    send
  }
}
