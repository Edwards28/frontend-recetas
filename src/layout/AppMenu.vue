<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: 'Inicio',
    items: [{ label: 'Inicio', icon: 'pi pi-fw pi-home', path: '/', to: 'home' }]
  },
  {
    label: 'Recetas',
    icon: 'pi pi-fw pi-briefcase',
    items: [
      {
        label: 'Recetas',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Mis Recetas',
            icon: 'pi pi-fw pi-list',
            path: '/recetas',
            to: 'recetas.index'
          },
          {
            label: 'Mis Recetas Favoritas',
            icon: 'pi pi-fw pi-heart-fill',
            path: '/favoritas',
            to: 'favoritas.index'
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
