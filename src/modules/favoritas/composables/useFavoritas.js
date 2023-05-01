import { onMounted, ref } from 'vue'
import api from '@/api/config'
import { alertConfirm, alertInfo } from '@/services/sweetAlert'

export const useFavoritas = () => {
  const loading = ref(true)
  const recetas = ref([])
  const errors = ref('')
  const usuario = localStorage.getItem('Usuario')

  const obtenerRecetasFavoritas = async () => {
    const { data } = await api.get(`/recetas/favoritas/usuario/${usuario}`)
    loading.value = false
    recetas.value = data.recetas
  }

  const eliminarFavorite = async (receta_id) => {
    errors.value = ''
    const { isConfirmed } = await alertConfirm(
      '¿Seguro/a desea desmarcar como favorita?',
      'Aceptar'
    )

    if (isConfirmed) {
      try {
        const { data } = await api.delete(`/recetas/favorita/${receta_id}`)
        if (data.success) {
          return alertInfo('¡Éxito!', data.message, 'success').then(() => {
            loading.value = true
            obtenerRecetasFavoritas()
          })
        }
      } catch (e) {
        return alertInfo('¡Error!', e.response.data.message, 'error')
      }
    }
  }

  onMounted(async () => {
    await obtenerRecetasFavoritas()
  })

  return {
    eliminarFavorite,
    loading,
    recetas
  }
}
