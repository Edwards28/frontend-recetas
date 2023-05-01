<script setup>
import FormComponent from '../components/FormComponent.vue'
import { useRecetas } from '../composables/useRecetas'

const { labelFormCrear, receta, guardarReceta, send, categorias, ingredientes } = useRecetas()
</script>

<template>
  <FormComponent
    :labelForm="labelFormCrear"
    :formData="receta"
    :functGuardar="guardarReceta"
    :send="send"
    :categorias="categorias"
    :ingredientes="ingredientes"
  ></FormComponent>
</template>
