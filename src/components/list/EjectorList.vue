<template>
  <div id="project">
    <br />
    <el-row>
      <el-col :span="1" class="grid">
        <el-button
          type="success"
          @click="handleAddEdit"
          icon="el-icon-circle-plus-outline"
          size="mini"
          round
        >新增引射器</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table
      :data="tableForm.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      border
      ref="tableForm"
      style="width: 100%"
    >
      <el-table-column prop="id" label="元件编号" width="100"></el-table-column>
      <el-table-column prop="name" label="名称" width="100"></el-table-column>
      <el-table-column prop="elementName" label="元件类型" width="100"></el-table-column>
      <el-table-column prop="expandRate" label="膨胀比" width="100"></el-table-column>
      <el-table-column prop="compressRate" label="压缩比" width="100"></el-table-column>
      <el-table-column prop="ejectorRate" label="引射率" width="100"></el-table-column>
      <el-table-column prop="efficiency" label="等熵效率" width="100"></el-table-column>
      <el-table-column prop="elevation" label="海拔" width="100"></el-table-column>
      <el-table-column prop="x" label="横坐标" width="100"></el-table-column>
      <el-table-column prop="y" label="纵坐标" width="100"></el-table-column>
      <el-table-column label="操作" width="200pt">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tabListPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <el-dialog title="编辑" width="30%" :visible.sync="editFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :rules="editRules" :model="editForm" ref="editForm">
        <el-form-item label="名称" label-width="100px" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="膨胀比" label-width="100px" prop="expandRate">
          <el-input v-model="editForm.expandRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="压缩比" label-width="100px" prop="compressRate">
          <el-input v-model="editForm.compressRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="引射率" label-width="100px" prop="ejectorRate">
          <el-input v-model="editForm.ejectorRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="等熵效率" label-width="100px" prop="efficiency">
          <el-input v-model="editForm.efficiency" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="海拔" label-width="100px" prop="elevation">
          <el-input v-model="editForm.elevation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="横坐标" label-width="100px" prop="x">
          <el-input v-model="editForm.x" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纵坐标" label-width="100px" prop="y">
          <el-input v-model="editForm.y" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新建" width="30%" :visible.sync="addFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :rules="addRules" :model="addForm" ref="addForm">
        <el-form-item label="名称" label-width="100px" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="膨胀比" label-width="100px" prop="expandRate">
          <el-input v-model="addForm.expandRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="压缩比" label-width="100px" prop="compressRate">
          <el-input v-model="addForm.compressRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="引射率" label-width="100px" prop="ejectorRate">
          <el-input v-model="addForm.ejectorRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="等熵效率" label-width="100px" prop="efficiency">
          <el-input v-model="addForm.efficiency" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="海拔" label-width="100px" prop="elevation">
          <el-input v-model="addForm.elevation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="横坐标" label-width="100px" prop="x">
          <el-input v-model="addForm.x" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纵坐标" label-width="100px" prop="y">
          <el-input v-model="addForm.y" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
var id
var name
var expandRate
var compressRate
var ejectorRate
var efficiency
var elevation
var x
var y
export default {
  methods: {
    cancel () {
      // 取消的时候直接设置对话框不可见即可
      this.editFormVisible = false
      this.addFormVisible = false
    },
    // 编辑
    handleEdit (row) {
      this.editForm = row
      id = row.id
      name = row.name
      expandRate = row.expandRate
      compressRate = row.compressRate
      ejectorRate = row.ejectorRate
      efficiency = row.efficiency
      elevation = row.elevation
      x = row.x
      y = row.y
      this.editFormVisible = true
    },
    // 删除
    handleDelete (row) {
      var that = this
      this.$confirm('永久删除此节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        id = row.id
        that.$axios
          .post('/deleteEjector', {
            id: id
          })
          .then((response) => {
            // eslint-disable-next-line eqeqeq
            if (response.status === 200) {
              that.cancel()
              that.$message('删除成功！')
              this.getEjector()
            }
          })
          .catch(function (error) {
            that.$message('删除失败！')
            console.log(error)
          })
      })
    },
    // boolean值格式化
    formatBoolean: function (row, column, cellValue) {
      let ret
      if (cellValue) {
        ret = '是'
      } else {
        ret = '否'
      }
      return ret
    },
    addEdit () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          var that = this
          name = this.addForm.name
          expandRate = this.addForm.expandRate
          compressRate = this.addForm.compressRate
          ejectorRate = this.addForm.ejectorRate
          efficiency = this.addForm.efficiency
          elevation = this.addForm.elevation
          x = this.addForm.x
          y = this.addForm.y
          this.$axios
            .post('/addEjector', {
              elementId: 3,
              elementName: '引射器',
              projectId: this.pid,
              name: name,
              expandRate: expandRate,
              compressRate: compressRate,
              ejectorRate: ejectorRate,
              efficiency: efficiency,
              elevation: elevation,
              x: x,
              y: y
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status === 200) {
                that.$message('新增引射器成功！')
                that.cancel()
                that.getEjector()
              }
            })
            .catch(function (error) {
              that.$message('新增失败！')
              console.log(error)
            })
        }
      })
    },
    update () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          var that = this
          id = this.editForm.id
          name = this.editForm.name
          expandRate = this.editForm.expandRate
          compressRate = this.editForm.compressRate
          ejectorRate = this.editForm.ejectorRate
          efficiency = this.editForm.efficiency
          elevation = this.editForm.elevation
          x = this.editForm.x
          y = this.editForm.y
          this.$axios
            .post('/setEjector', {
              elementId: 3,
              elementName: '引射器',
              projectId: this.pid,
              modelId: this.editForm.modelId,
              id: id,
              name: name,
              expandRate: expandRate,
              compressRate: compressRate,
              ejectorRate: ejectorRate,
              efficiency: efficiency,
              elevation: elevation,
              x: x,
              y: y
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status === 200) {
                that.cancel()
                that.$message('修改成功！')
                this.getEjector()
              }
            })
            .catch(function (error) {
              that.$message('修改失败！')
              console.log(error)
            })
        }
      })
    },
    // 新建任务
    handleAddEdit () {
      Object.keys(this.addForm).forEach(key => (
        this.addForm[key] = ''
      ))
      this.addFormVisible = true
    },
    getEjector () {
      this.$axios
        .post('/getEjector', {
          projectId: this.pid
        })
        .then((response) => {
          // eslint-disable-next-line eqeqeq
          if (response.status === 200) {
            this.tableForm = response.data.data
            this.totalCount = response.data.data.length
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 分页
    // 每页显示的条数
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
    }
  },
  mounted () {
    this.pid = this.$route.query.id
    this.getEjector()
  },
  data () {
    return {
      tableForm: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      pid: 0,
      addFormVisible: false,
      editFormVisible: false,
      editForm: {
        id: '',
        name: '',
        modelId: '',
        expandRate: '',
        compressRate: '',
        ejectorRate: '',
        efficiency: '',
        elevation: '',
        x: '',
        y: ''
      },
      addForm: {
        name: '',
        expandRate: '',
        compressRate: '',
        ejectorRate: '',
        efficiency: '',
        elevation: '',
        x: '',
        y: ''
      },
      editRules: {
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        elevation: [{ required: true, message: '请输入海拔', trigger: 'change' }],
        expandRate: [{ required: true, message: '请输入膨胀比', trigger: 'change' }],
        compressRate: [{ required: true, message: '请输入压缩比', trigger: 'change' }],
        ejectorRate: [{ required: true, message: '请输入引射率', trigger: 'change' }],
        efficiency: [{ required: true, message: '请输入等熵效率', trigger: 'change' }],
        name: [{ required: true, message: '请输入元件名称', trigger: 'change' }]
      },
      addRules: {
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        elevation: [{ required: true, message: '请输入海拔', trigger: 'change' }],
        expandRate: [{ required: true, message: '请输入膨胀比', trigger: 'change' }],
        compressRate: [{ required: true, message: '请输入压缩比', trigger: 'change' }],
        ejectorRate: [{ required: true, message: '请输入引射率', trigger: 'change' }],
        efficiency: [{ required: true, message: '请输入等熵效率', trigger: 'change' }],
        name: [{ required: true, message: '请输入元件名称', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>
</style>
