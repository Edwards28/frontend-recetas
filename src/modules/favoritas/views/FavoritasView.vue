<script setup>
import { useFavoritas } from '../composables/useFavoritas'

const { loading, recetas, eliminarFavorite } = useFavoritas()
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <template v-if="loading">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
        </div>
      </template>
      <div v-else class="card">
        <h5>Listado de Recetas Favoritas</h5>
        <DataView :value="recetas" :paginator="true" :rows="5">
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-6 text-left"></div>
            </div>
          </template>
          <template #empty v-if="!loading"> No ha marcado una receta como favorita. </template>
          <template #list="{ data }">
            <div class="col-12">
              <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                <img
                  src="https://img.freepik.com/vector-gratis/vector-ilustracion-dibujos-animados-conjunto-tradicional-comida-comida-rapida_1441-331.jpg"
                  :alt="data.nombre"
                  class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
                />
                <div class="flex-1 text-center md:text-left">
                  <div class="font-bold text-2xl">{{ data.nombre }}</div>
                  <div class="mb-3">{{ data.descripcion }}</div>
                  <div class="flex align-items-center">
                    <span class="font-semibold"
                      ><strong>Categoría: </strong>{{ data.categoria }}</span
                    >
                  </div>
                </div>
                <div
                  class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0"
                >
                  <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{
                    data.porciones
                  }}</span>
                  <Button
                    icon="pi pi-heart-fill"
                    label="Eliminar de Favoritas"
                    class="mb-2"
                    @click="eliminarFavorite(data.id)"
                  ></Button>
                  <span class="product-badge">{{ data.tiempo_preparacion }}</span>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>
