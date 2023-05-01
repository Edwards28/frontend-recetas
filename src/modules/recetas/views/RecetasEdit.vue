<script setup>
import FormComponent from '../components/FormComponent.vue'
import { onMounted } from 'vue'
import { useRecetas } from '../composables/useRecetas'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { labelFormEdit, receta, guardarReceta, obtenerReceta, send, categorias, ingredientes } =
  useRecetas()

onMounted(async () => {
  await obtenerReceta(props.id)
})
</script>

<template>
  <FormComponent
    :labelForm="labelFormEdit"
    :formData="receta"
    :functGuardar="guardarReceta"
    :send="send"
    :categorias="categorias"
    :ingredientes="ingredientes"
  ></FormComponent>
</template>
