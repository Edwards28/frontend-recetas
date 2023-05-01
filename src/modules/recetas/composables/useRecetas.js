import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/config'
import { alertConfirm, alertHtml, alertInfo } from '@/services/sweetAlert'

export const useRecetas = () => {
  const cargando = ref(true)
  const categorias = ref([])
  const errors = ref('')
  const ingredientes = ref([])
  const recetas = ref([])
  const receta = ref({})
  const labelButton = ref('Agregar Receta')
  const labelFormCrear = ref('Crear Receta')
  const labelFormEdit = ref('Editar Receta')
  const labelTable = ref('Listado Recetas')
  const nameRutaAgregar = ref('recetas.crear')
  const nameRutaEditar = ref('recetas.editar')
  const router = useRouter()
  const send = ref(false)
  const usuario = localStorage.getItem('Usuario')

  const obtenerMisRecetas = async () => {
    const { data } = await api.get(`/recetas/usuario/${usuario}`)
    cargando.value = false
    recetas.value = data.recetas
  }

  const obtenerCategorias = async () => {
    const { data } = await api.get('/categorias')
    categorias.value = data.categorias
  }

  const obtenerIngredientes = async () => {
    const { data } = await api.get('/ingredientes')
    ingredientes.value = data.ingredientes
  }

  const guardarReceta = async (form) => {
    errors.value = ''
    let response = {}
    send.value = true
    try {
      if (!form.id) {
        const { data } = await api.post('/recetas', form)
        response = data
      } else {
        const { data } = await api.put(`/recetas/${form.id}`, form)
        response = data
      }
      send.value = false
      if (response.success) {
        return alertInfo('¡Éxito!', response.message, 'success').then(() => {
          router.push({ name: 'recetas.index' })
        })
      }
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

  const obtenerReceta = async (id) => {
    const { data } = await api.get(`/recetas/${id}`)
    receta.value = data.receta
  }

  const eliminarReceta = async (id) => {
    const { isConfirmed } = await alertConfirm('¿Seguro/a desea eliminar el detalle?', 'Aceptar')

    if (isConfirmed) {
      const { data } = await api.delete(`/recetas/${id}`)
      return alertInfo('¡Éxito!', data.message, 'success').then(() => {
        cargando.value = true
        obtenerMisRecetas()
      })
    }
  }

  onMounted(async () => {
    await obtenerMisRecetas()
    await obtenerCategorias()
    await obtenerIngredientes()
  })

  return {
    cargando,
    categorias,
    eliminarReceta,
    guardarReceta,
    ingredientes,
    labelButton,
    labelFormCrear,
    labelFormEdit,
    labelTable,
    nameRutaAgregar,
    nameRutaEditar,
    obtenerReceta,
    receta,
    recetas,
    send
  }
}
