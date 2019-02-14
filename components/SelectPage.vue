<template lang="pug">
  ul
    li(v-if="current > 1")
      nuxt-link.btn.btn-floating.small.blue.lighten-2(to="/mc_servers") First
    li(v-if="current > 1")
      nuxt-link.btn.btn-floating.small.blue.lighten-2(:to="'/mc_servers/' + prev") Prev
    li(v-for="item in items")
      nuxt-link.btn.btn-floating.small(:class="(item == current ? 'cyan lighten-1' : 'blue lighten-2')", :to="'/mc_servers/' + item") {{ item }}
    li(v-if="last > current")
      nuxt-link.btn.btn-floating.small.blue.lighten-2(:to="'/mc_servers/' + next") Next
    li(v-if="last > current")
      nuxt-link.btn.btn-floating.small.blue.lighten-2(:to="'/mc_servers/' + last") Last
</template>

<script>
// https://stackoverflow.com/a/45355468
function numberRange (start, end) {
  return new Array(end - start).fill().map((d, i) => i + start);
}

export default {
  props: ['current', 'last'],
  data () {
    return {
      next: parseInt(this.current) + 1,
      prev: parseInt(this.current) - 1,
      items: numberRange((this.current - 5 >= 1 ? this.current - 5 : 1), (this.current + 5 < this.last ? this.current + 5 : this.last) + 1)
    }
  },
  mounted () {
    console.log(this.current)
    console.log(this.next)
    console.log(this.prev)
    console.log(this.last)
    console.log(this.items)
  }
}
</script>
