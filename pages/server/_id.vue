<template lang="pug">
  p server info {{ id }}
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+/.test(params.id)
  },
  asyncData ({ params }) {
    return {
      id: params.id
    }
  }
}
</script>

