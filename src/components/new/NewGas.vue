<template>
  <el-dialog
    :visible.sync="visible"
    title="新建组分"
    width="30%">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="组分名称">
        <el-input placeholder="请输入组分名称" v-model="component.name" maxlength="10" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="newGas">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: true,
      component: {
        name: ''
      },
      id: ''
    }
  },

  methods: {
    // 取消并返回主页
    cancel () {
      this.$router.push({
        path: '/home'
      })
    },

    // 提交申请
    async newGas () {
      const { data: res } = await this.$http.post('/components', this.component)
      await this.$router.push({
        path: '/editGas',
        query: {
          id: res.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
