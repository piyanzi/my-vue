<template>
  <div>
    <h3>{{ message }}</h3>
  </div>

</template>

<script>
export default {
  data () {
    return {
      message: '错误页面'
    }
  },

  methods: {
    // 获取出错信息
    getMessage () {
      this.message = this.$route.params.message
    }
  },

  created () {
    this.getMessage()
  }
}
</script>

<style scoped>

</style>
