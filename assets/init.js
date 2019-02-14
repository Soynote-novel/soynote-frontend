import $ from 'jquery'

export default () => {
  $(document).ready(() => {
    $(".button-collapse").sideNav({
      edge: 'left',
      closeOnClick: true,
      draggable: true
    })
  })
}