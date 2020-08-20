<template>
  <div>
    <my-bread-menu></my-bread-menu>
    {{ this.simulation }}

    <el-tabs v-model="activeName">
      <el-tab-pane name="node" label="节点数据">
        <div id="load">节点载荷</div>
        <div id="elevation">节点海拔</div>
        <div id="pressure">节点压力</div>
      </el-tab-pane>
      <el-tab-pane name="pipe" label="管道数据">管道数据</el-tab-pane>
      <el-tab-pane name="gas" label="流体数据">流体数据</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: 0,
      // 模拟结果
      simulation: {},
      // tabs
      activeName: 'node'
    }
  },

  methods: {
    // 获取模拟结果
    async getSimulation () {
      const { data: res } = await this.$http.get('/simulate/' + this.id)
      this.simulation = res.data
    },

    // 修改导航
    changeMenu () {
      this.$store.commit('changePath', {
        parent: '工程管理',
        child: '模拟结果',
        path: this.$store.state.activePath.path
      })
    }
  },

  created () {
    this.id = this.$route.query.id
    this.getSimulation()
    this.changeMenu()
  }
}
</script>

<style lang="less" scoped>

</style>
