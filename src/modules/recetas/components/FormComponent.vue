<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  labelForm: {
    type: String,
    default: null,
    required: true
  },
  formData: {
    type: Object,
    default: () => {},
    required: true
  },
  functGuardar: {
    type: Function,
    default: () => true,
    required: true
  },
  send: {
    type: Boolean,
    default: false,
    required: false
  },
  categorias: {
    type: Array,
    default: () => [],
    required: false
  },
  ingredientes: {
    type: Array,
    default: () => [],
    required: false
  }
})

const form = ref({})

watch(
  () => props.formData,
  (newForm) => {
    form.value = newForm
    form.value.sueldo = parseFloat(form.value.sueldo)
  }
)

const cancelar = () => {
  router.push({ name: 'recetas.index' })
}
</script>

<template>
  <div class="col-12">
    <div class="card">
      <h5>{{ props.labelForm }}</h5>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-6">
          <label for="nombre">Nombre</label>
          <InputText id="nombre" v-model.trim="form.nombre" type="text" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="categoria_id">Categoría</label>
          <Dropdown
            id="categoria_id"
            v-model.trim="form.categoria_id"
            :options="props.categorias"
            optionLabel="nombre"
            placeholder="Seleccionar Categoría"
            :filter="true"
            filterPlaceholder="Buscar Categoría"
            optionValue="id"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label for="tiempo_preparacion">Tiempo Preparación</label>
          <InputNumber
            id="tiempo_preparacion"
            v-model.trim="form.tiempo_preparacion"
            :min="1"
            :max="1000000"
            :step="1"
            :useGrouping="false"
            showButtons
            buttonLayout="horizontal"
            incrementButtonClass="p-button-info"
            decrementButtonClass="p-button-info"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label for="porciones">Porciones</label>
          <InputNumber
            id="porciones"
            v-model.trim="form.porciones"
            :min="1"
            :max="1000000"
            :step="1"
            :useGrouping="false"
            showButtons
            buttonLayout="horizontal"
            incrementButtonClass="p-button-info"
            decrementButtonClass="p-button-info"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label for="ingredientes">Ingredientes</label>
          <MultiSelect
            id="ingredientes"
            v-model="form.ingredientes"
            display="chip"
            :options="props.ingredientes"
            optionLabel="nombre"
            optionValue="id"
            placeholder="Seleccionar Ingredientes"
            class="w-full"
            :filter="true"
            filterPlaceholder="Buscar Categoría"
          />
        </div>
        <div class="field col-12 md:col-6">
          <label for="descripcion">Descripción</label>
          <Textarea id="descripcion" v-model.trim="form.descripcion" autoResize :rows="5" />
        </div>
      </div>
      <div class="flex flex-wrap gap-3 justify-content-end">
        <Button label="Cancelar" class="p-button-danger" @click="cancelar" />
        <Button
          :loading="props.send"
          label="Guardar"
          class="p-button-primary"
          @click="props.functGuardar(form)"
        />
      </div>
    </div>
  </div>
</template>
