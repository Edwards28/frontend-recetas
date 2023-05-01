import { onMounted, ref, watch } from 'vue'
import api from '@/api/config'
import { alertConfirm, alertHtml, alertInfo } from '@/services/sweetAlert'

export const useInicio = () => {
  const loading = ref(true)
  const recetas = ref([])
  const errors = ref('')
  const params = ref({})

  const obtenerRecetas = async () => {
    const { data } = await api.get('/recetas')
    loading.value = false
    recetas.value = data.recetas
  }

  const guardarFavorite = async (receta_id) => {
    errors.value = ''
    const { isConfirmed } = await alertConfirm('¿Seguro/a desea marcar como favorita?', 'Aceptar')

    if (isConfirmed) {
      try {
        const { data } = await api.post('/recetas/guardar/favorita', { receta_id })
        if (data.success) {
          return alertInfo('¡Éxito!', data.message, 'success').then(() => {
            loading.value = true
            obtenerRecetas()
          })
        }
      } catch (e) {
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
  }

  watch(params.value, async (newParams) => {
    let response = ''
    if (!newParams) {
      const { data } = await api.get('/recetas')
      response = data
    } else {
      const { data } = await api.get('/recetas', { params: newParams })
      response = data
    }
    if (response.success) {
      recetas.value = response.recetas
    }
  })

  onMounted(async () => {
    await obtenerRecetas()
  })

  return {
    guardarFavorite,
    loading,
    params,
    recetas
  }
}
