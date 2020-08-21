<template>
  <el-dialog
    title="新建模拟"
    :visible.sync="dialogVisible"
    width="30%">
    <el-form :model="projectInfo" label-width="80px" label-position="left">
      <el-form-item label="工程信息">
        <el-input placeholder="请输入工程描述信息" v-model="projectInfo.info" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="模拟类型">
        <el-select v-model="projectInfo.type" placeholder="请选择模拟类型" >
          <el-option v-for="item in type" :label="item.name" :value="item.name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="气体组分">
        <el-select v-model="projectInfo.comId" placeholder="请选择组分">
          <el-option v-for="item in gas" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="projectInfo.author" :disabled="true"></el-input>
      </el-form-item>
      <el-button type="primary" @click="_upload">上传文件（若不选择文件，则生成空模型）</el-button>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="createProject">下一步</el-button>
    </span>
    <input type="file" id="upload_xml" @change="handle_file($event)" accept=".xml" style="display: none;">
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: true,

      type: [],

      gas: [],

      projectInfo: {
        info: '',
        type: '',
        model: '',
        author: '',
        comId: ''
      }
    }
  },

  methods: {
    // 获取所有的气体列表
    async getGas () {
      const { data: res } = await this.$http.get('/components/findAll')
      this.gas = res.data
    },

    // 创建项目
    createProject () {
      this.dialogVisible = false
      this.newProject()
    },

    // 弹出上传文件框
    _upload () {
      document.getElementById('upload_xml').click()
    },

    // 处理上传的文件
    handle_file ($event) {
      var _this = this
      var files = event.target.files
      if (files != null) {
        var file = files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
          _this.projectInfo.model = e.target.result
          _this.$message('文件已添加')
        }
        reader.readAsText(file)
      }
    },

    async newProject () {
      const { data: res } = await this.$http.post('/projects', this.projectInfo)
      await this.$router.push({
        path: '/editProject',
        query: {
          id: res.data
        }
      })
    },

    // 获取模拟类型
    async getType () {
      const { data: res } = await this.$http.get('/types')
      this.type = res.data
    },

    // 获取当前用户
    getUser () {
      const user = JSON.parse(window.sessionStorage.getItem('user'))
      this.projectInfo.author = user.username
    }
  },

  created () {
    this.getUser()
    this.getType()
    this.getGas()
  }
}
</script>

<style scoped>

</style>
