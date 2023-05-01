<script setup>
import { useRecetas } from '@/modules/recetas/composables/useRecetas'
import { useInicio } from '../composables/useHome'

const { loading, recetas, guardarFavorite, params } = useInicio()
const { categorias } = useRecetas()
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
        <h5>Listado de Recetas</h5>
        <DataView :value="recetas" :paginator="true" :rows="5">
          <template #header>
            <div class="grid grid-nogutter">
              <div class="col-12 text-center">
                <InputText
                  id="nombre"
                  v-model.trim="params.nombre"
                  type="text"
                  placeholder="Nombre"
                  class="w-full md:w-17rem"
                />
                &nbsp;
                <InputNumber
                  id="tiempo_preparacion"
                  :min="1"
                  :max="1000000"
                  :step="1"
                  :useGrouping="false"
                  v-model.trim="params.tiempo_preparacion"
                  showButtons
                  buttonLayout="horizontal"
                  incrementButtonClass="p-button-info"
                  decrementButtonClass="p-button-info"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  class="w-full md:w-17rem"
                  placeholder="Tiempo Preparación"
                />
                &nbsp;
                <Dropdown
                  id="categoria_id"
                  :options="categorias"
                  v-model.trim="params.categoria_id"
                  optionLabel="nombre"
                  placeholder="Seleccionar Categoría"
                  :filter="true"
                  filterPlaceholder="Buscar Categoría"
                  optionValue="id"
                  class="w-full md:w-17rem text-left"
                />
              </div>
            </div>
          </template>
          <template #empty v-if="!loading"> No se han creado recetas. </template>
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
                    v-if="!data.contador_favoritos"
                    icon="pi pi-heart"
                    label="Añadir a Favoritas"
                    class="mb-2"
                    @click="guardarFavorite(data.id)"
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
