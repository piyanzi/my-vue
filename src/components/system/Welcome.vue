<template>
  <div>
    <h3>welcome</h3>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('changePath', {
      path: ''
    })
  }
}
</script>

<style scoped>

</style>
