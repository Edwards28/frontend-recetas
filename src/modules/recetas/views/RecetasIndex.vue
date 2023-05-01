<script setup>
import DataTableVue from '@/components/table/DataTableComponent.vue'
import { useRecetas } from '../composables/useRecetas'
import columns from '../services/columsTableRecetas'

const {
  cargando,
  recetas,
  eliminarReceta,
  labelButton,
  labelTable,
  nameRutaAgregar,
  nameRutaEditar
} = useRecetas()
</script>

<template>
  <DataTableVue
    :labelButtonAgregar="labelButton"
    :nameRutaAgregar="nameRutaAgregar"
    :nameRutaEditar="nameRutaEditar"
    :labelTable="labelTable"
    :cargando="cargando"
    :data="recetas"
    :columnas="columns"
    :functEliminar="eliminarReceta"
  >
  </DataTableVue>
</template>
