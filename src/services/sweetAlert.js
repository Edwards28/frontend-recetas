import Swal from 'sweetalert2'

export const alertInfo = (title, text, icon) => {
  return Swal.fire({
    background: '#36465D',
    color: '#ffff',
    title,
    text,
    icon,
    showConfirmButton: false,
    timer: 2500,
    allowOutsideClick: false
  })
}

export const alertHtml = (title, html, icon) => {
  return Swal.fire({
    background: '#36465D',
    color: '#ffff',
    title,
    html,
    icon,
    showConfirmButton: false,
    timer: 2500,
    allowOutsideClick: false
  })
}

export const alertConfirm = async (text, button = 'Eliminar') => {
  return Swal.fire({
    background: '#36465D',
    color: '#ffff',
    title: '¡Confirmación!',
    text: `${text}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7B8FA1',
    cancelButtonColor: '#A84448',
    confirmButtonText: `${button}`,
    cancelButtonText: 'Cancelar',
    allowOutsideClick: false,
    heightAuto: false
  })
}
