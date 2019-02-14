<template lang="pug">
  header
    nav.white
      .nav-wrapper
        nuxt-link.brand-logo.center.blue-grey-text.text-darken-2(to='/') 책꽂이
        nuxt-link.button-collapse(to='#', data-activates='mobile-menu')
          i.material-icons menu
        ul.left.hide-on-med-and-down
          li
            nuxt-link.blue-grey-text.text-darken-2(to='/novel') 소설
          
        ul.right.hide-on-med-and-down
          li
            nuxt-link.blue-grey-text.text-darken-2(to='/login') 로그인
          li
            nuxt-link.blue-grey-text.text-darken-2(to='/register') 회원가입
          li
            p(style='width: 1em')
        ul#mobile-menu.side-nav
          li
            nuxt-link(to='/novel') 소설
          li
            .divider
          li
            nuxt-link(to='/login') 로그인
          li
            nuxt-link(to='/register') 회원가입
</template>
