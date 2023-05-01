export default [
  {
    path: 'favoritas',
    name: 'favoritas.index',
    component: () =>
      import(/* webpackChunkName: 'favoritas' */ '@/modules/favoritas/views/FavoritasView.vue')
  }
]
