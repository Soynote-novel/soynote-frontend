<template lang="pug">
  div
    .row
      .col.s12.m6.l6(v-for="item in items")
        .card
          .card-content
            span.card-title {{ item.title }}
            p {{ item.introduce }}
    .button-list
      selectpage(:current="id", :last="5")
</template>

<script>
import Selectpage from '~/components/SelectPage.vue'

export default {
  components: {
    Selectpage
  },
  asyncData ({ params }) {
    return {
      id: 1
    }
  },
  data () {
    return {
      items: [{
        title: '타이틀',
        introduce: 'ㅁㄴㅇㄹ'
      }, {
        title: '타이틀2',
        introduce: 'ㅁㄴㅇㄹ1'
      }]
    }
  }
}
</script>
