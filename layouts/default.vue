<template lang="pug">
  div.blue-grey.lighten-5
    Header
    .row
      .col.s12.m11.l10(style="min-height: 40em;")
        nuxt
      .col.s12.m1.l2
    Footer
</template>

<script>
import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '~/assets/init.css'
import init from '~/assets/init.js'

import email from '~/assets/email.js'

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    email()
    init()
  },
  watch: {
	'$route' (to, from) {
      if (to.fullPath === from.fullPath) {
        return
      } else {
        if (this.isServer) {
          return
        }
        this.$nextTick(() => {
          setTimeout(() => {
            email()
          }, 700)
        })
      }
    }
  }
}
</script>
