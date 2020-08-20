<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }" @click="toHome">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ this.$store.state.activePath.parent }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ this.$store.state.activePath.child }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyBreadMenu',

  methods: {
    toHome () {
      this.$store.commit('changePath', {
        path: '',
        parent: '',
        child: ''
      })
    }
  }
}
</script>

<style scoped>

</style>
