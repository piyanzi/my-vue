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
        >新增站场</el-button>
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
      <el-table-column prop="inletPressure" label="进场压力" width="100"></el-table-column>
      <el-table-column prop="outletPressure" label="出场压力" width="100"></el-table-column>
      <el-table-column prop="production" label="产率" width="100"></el-table-column>
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
        <el-form-item label="进场压力" label-width="100px" prop="inletPressure">
          <el-input v-model="editForm.inletPressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出场压力" label-width="100px" prop="outletPressure">
          <el-input v-model="editForm.outletPressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产率" label-width="100px" prop="production">
          <el-input v-model="editForm.production" auto-complete="off"></el-input>
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
        <el-form-item label="进场压力" label-width="100px" prop="inletPressure">
          <el-input v-model="addForm.inletPressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出场压力" label-width="100px" prop="outletPressure">
          <el-input v-model="addForm.outletPressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="产率" label-width="100px" prop="production">
          <el-input v-model="addForm.production" auto-complete="off"></el-input>
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
var inletPressure
var outletPressure
var production
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
      inletPressure = row.inletPressure
      outletPressure = row.outletPressure
      production = row.production
      elevation = row.elevation
      x = row.x
      y = row.y
      this.editFormVisible = true
    },
    // 删除
    handleDelete (row) {
      var that = this
      this.$confirm('永久删除此站场, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        id = row.id
        that.$axios
          .post('/deleteStation', {
            id: id
          })
          .then((response) => {
            // eslint-disable-next-line eqeqeq
            if (response.status === 200) {
              that.cancel()
              that.$message('删除成功！')
              this.getStation()
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
          inletPressure = this.addForm.inletPressure
          outletPressure = this.addForm.outletPressure
          production = this.addForm.production
          elevation = this.addForm.elevation
          x = this.addForm.x
          y = this.addForm.y
          this.$axios
            .post('/addStation', {
              elementId: 5,
              elementName: '站场',
              projectId: this.pid,
              name: name,
              inletPressure: inletPressure,
              outletPressure: outletPressure,
              production: production,
              elevation: elevation,
              x: x,
              y: y
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status === 200) {
                that.$message('新增站场成功！')
                that.cancel()
                that.getStation()
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
          inletPressure = this.editForm.inletPressure
          outletPressure = this.editForm.outletPressure
          production = this.editForm.production
          elevation = this.editForm.elevation
          x = this.editForm.x
          y = this.editForm.y
          this.$axios
            .post('/setStation', {
              elementId: 5,
              elementName: '站场',
              projectId: this.pid,
              modelId: this.editForm.modelId,
              id: id,
              name: name,
              inletPressure: inletPressure,
              outletPressure: outletPressure,
              production: production,
              elevation: elevation,
              x: x,
              y: y
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status === 200) {
                that.cancel()
                that.$message('修改成功！')
                this.getStation()
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
    getStation () {
      this.$axios
        .post('/getStation', {
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
    this.getStation()
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
        inletPressure: '',
        outletPressure: '',
        production: '',
        elevation: '',
        x: '',
        y: ''
      },
      addForm: {
        name: '',
        inletPressure: '',
        outletPressure: '',
        production: '',
        elevation: '',
        x: '',
        y: ''
      },
      editRules: {
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        elevation: [{ required: true, message: '请输入海拔', trigger: 'change' }],
        inletPressure: [{ required: true, message: '请输入进场压力', trigger: 'change' }],
        outletPressure: [{ required: true, message: '请输入出场压力', trigger: 'change' }],
        production: [{ required: true, message: '请输入产率', trigger: 'change' }],
        name: [{ required: true, message: '请输入元件名称', trigger: 'change' }]
      },
      addRules: {
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        elevation: [{ required: true, message: '请输入海拔', trigger: 'change' }],
        inletPressure: [{ required: true, message: '请输入进场压力', trigger: 'change' }],
        outletPressure: [{ required: true, message: '请输入出场压力', trigger: 'change' }],
        production: [{ required: true, message: '请输入产率', trigger: 'change' }],
        name: [{ required: true, message: '请输入元件名称', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>
</style>
