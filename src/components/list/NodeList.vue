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
        >新增连接点</el-button>
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
      <el-table-column prop="pressure" label="压力" width="100"></el-table-column>
      <el-table-column prop="loads" label="载荷" width="100"></el-table-column>
      <el-table-column prop="pressureState" :formatter="formatBoolean" label="压力是否已知" width="150"></el-table-column>
      <el-table-column prop="loadState" :formatter="formatBoolean" label="载荷是否已知" width="150"></el-table-column>
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
        <el-form-item label="压力" label-width="100px" prop="pressure">
          <el-input v-model="editForm.pressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="载荷" label-width="100px" prop="loads">
          <el-input v-model="editForm.loads" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="压力是否已知" label-width="100px" prop="pressureState">
          <el-radio-group v-model="editForm.pressureState">
            <el-radio :label="true">Fixed</el-radio>
            <el-radio :label="false">Estimated</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="载荷是否已知" label-width="100px" prop="loadState">
          <el-radio-group v-model="editForm.loadState">
            <el-radio :label="true">Fixed</el-radio>
            <el-radio :label="false">Estimated</el-radio>
          </el-radio-group>
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
        <el-form-item label="压力" label-width="100px" prop="pressure">
          <el-input v-model="addForm.pressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="载荷" label-width="100px" prop="loads">
          <el-input v-model="addForm.loads" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="压力是否已知" label-width="100px" prop="pressureState">
          <el-radio-group v-model="addForm.pressureState">
            <el-radio :label="true">Fixed</el-radio>
            <el-radio :label="false">Estimated</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="载荷是否已知" label-width="100px" prop="loadState">
          <el-radio-group v-model="addForm.loadState">
            <el-radio :label="true">Fixed</el-radio>
            <el-radio :label="false">Estimated</el-radio>
          </el-radio-group>
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
var pressure
var loads
var pressureState
var loadState
var elevation
var x
var y
export default {
  name: 'nodeList',
  inject: ['reload'],
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
      pressure = row.pressure
      pressureState = row.pressureState
      loads = row.loads
      loadState = row.loadState
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
          .post('/deleteNode', {
            id: id
          })
          .then((response) => {
            // eslint-disable-next-line eqeqeq
            if (response.status === 200) {
              that.cancel()
              this.getNode()
            }
          })
          .catch(function (error) {
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
          pressure = this.addForm.pressure
          loads = this.addForm.loads
          pressureState = this.addForm.pressureState
          loadState = this.addForm.loadState
          elevation = this.addForm.elevation
          x = this.addForm.x
          y = this.addForm.y
          this.$axios
            .post('/addNode', {
              elementId: 1,
              elementName: '普通节点',
              projectId: this.pid,
              name: name,
              pressure: pressure,
              loads: loads,
              pressureState: pressureState,
              loadState: loadState,
              elevation: elevation,
              x: x,
              y: y
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status === 200) {
                that.$message('新增节点成功！')
                that.cancel()
                that.getNode()
              }
            })
            .catch(function (error) {
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
          pressure = this.editForm.pressure
          loads = this.editForm.loads
          pressureState = this.editForm.pressureState
          loadState = this.editForm.loadState
          elevation = this.editForm.elevation
          x = this.editForm.x
          y = this.editForm.y
          this.$axios
            .post('/setNode', {
              id: id,
              name: name,
              pressure: pressure,
              loads: loads,
              pressureState: pressureState,
              loadState: loadState,
              elevation: elevation,
              x: x,
              y: y
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status === 200) {
                that.cancel()
                this.getNode()
              }
            })
            .catch(function (error) {
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
    getNode () {
      this.$axios
        .post('/getNode', {
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
    this.getNode()
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
        pressure: '',
        pressureState: '',
        loads: '',
        loadState: '',
        elevation: '',
        x: '',
        y: ''
      },
      addForm: {
        name: '',
        pressure: '',
        pressureState: '',
        loads: '',
        loadState: '',
        elevation: '',
        x: '',
        y: ''
      },
      editRules: {
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        elevation: [{ required: true, message: '请输入海拔', trigger: 'change' }],
        pressure: [{ required: true, message: '请输入压力', trigger: 'change' }],
        loads: [{ required: true, message: '请输入载荷', trigger: 'change' }],
        name: [{ required: true, message: '请输入元件名称', trigger: 'change' }]
      },
      addRules: {
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        elevation: [{ required: true, message: '请输入海拔', trigger: 'change' }],
        pressure: [{ required: true, message: '请输入压力', trigger: 'change' }],
        loads: [{ required: true, message: '请输入载荷', trigger: 'change' }],
        name: [{ required: true, message: '请输入元件名称', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>
</style>
