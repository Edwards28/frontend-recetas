export const isNotAuthenticatedGuard = async (to, from, next) => {
  const token = localStorage.getItem('Authorization')
  if (to.name === 'register' && !token) {
    next()
  } else if (to.name !== 'login' && !token) {
    next({ name: 'login' })
  } else if (to.name === 'login' && token) {
    next({ name: 'home' })
  } else {
    next()
  }
}
