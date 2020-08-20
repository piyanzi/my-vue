<template>
  <div>
    <my-bread-menu></my-bread-menu>

    <div class="gas-title">
      <el-button type="primary" round @click="saveComponent" size="mini">保存更改</el-button>
    </div>

    <el-card>
      <el-table :data="component" border stripe show-summary>
        <el-table-column type="index" label="编号" width="80px"></el-table-column>
        <el-table-column label="组分" prop="name" width="120px"></el-table-column>
        <el-table-column label="化学式" prop="formula" width="120px"></el-table-column>
        <el-table-column label="摩尔分数" width="120px" prop="percentage">
          <template slot-scope="scope">
            <el-input v-model="scope.row.percentage"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 组分id
      id: '',

      // 组分信息
      component: [],

      // 提交的组分数据
      componentData: {}
    }
  },

  methods: {
    // 修改组分信息
    async saveComponent () {
      // 设置各个组分
      this.component.forEach((com) => {
        this.$set(this.componentData, com.formula.toLowerCase(), com.percentage)
      })
      // 设置id
      this.$set(this.componentData, 'id', this.id)
      // 提交请求
      const { data: res } = await this.$http.put('/components', this.componentData)
      if (res.status === 0) {
        this.$message.success('修改成功！')
      } else {
        this.$message.error('修改出错！')
      }
    },

    // 修改导航
    changeMenu () {
      this.$store.commit('changePath', {
        parent: '组分管理',
        child: '修改组分',
        path: this.$store.state.activePath.path
      })
    },

    // 获取组分信息
    async getComponent () {
      const { data: res } = await this.$http.get('/components/' + this.id)
      this.component = res.data
    }
  },

  created () {
    this.id = this.$route.query.id
    this.getComponent()
    this.changeMenu()
  }
}
</script>

<style scoped>

.gas-title {
  margin-bottom: 20px;
  margin-top: 20px;
}

</style>
