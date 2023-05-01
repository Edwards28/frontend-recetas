const columns = [
  { field: 'nombre', header: 'Nombre', sortable: true, headerStyle: 'width:25%; min-width:10rem;' },
  {
    field: 'descripcion',
    header: 'Descripción',
    sortable: true,
    headerStyle: 'width:35%; min-width:20rem;'
  },
  {
    field: 'categoria',
    header: 'Categoría',
    sortable: true,
    headerStyle: 'width:25%; min-width:10rem;'
  },
  {
    field: 'tiempo_preparacion',
    header: 'Tiempo Preparación',
    headerStyle: 'width:20%; min-width:15rem;'
  },
  { field: 'porciones', header: 'Porciones', sortable: true, headerStyle: 'width:25%; min-width:10rem;' },
  { field: 'usuario', header: 'Usuario', sortable: true, headerStyle: 'width:25%; min-width:10rem;' }
]

export default columns
