export default [
  {
    path: 'recetas',
    name: 'recetas.index',
    component: () =>
      import(/* webpackChunkName: 'recetas' */ '@/modules/recetas/views/RecetasIndex.vue')
  },
  {
    path: 'recetas/crear',
    name: 'recetas.crear',
    component: () =>
      import(/* webpackChunkName: "recetas.crear" */ '@/modules/recetas/views/RecetasCreate.vue')
  },
  {
    path: 'recetas/:id/editar',
    name: 'recetas.editar',
    component: () =>
      import(/* webpackChunkName: "recetas.editar" */ '@/modules/recetas/views/RecetasEdit.vue'),
    props: (route) => ({
      id: route.params.id
    })
  }
]
