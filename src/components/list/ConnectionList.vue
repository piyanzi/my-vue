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
      <el-table-column prop="element_id" label="元件id" width="150"></el-table-column>
      <el-table-column prop="x" label="连接点x" width="150"></el-table-column>
      <el-table-column prop="y" label="连接点y" width="150"></el-table-column>
      <el-table-column prop="name" label="备注名称" width="200"></el-table-column>
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

    <el-dialog title="新增连接点" width="30%" :visible.sync="addFormVisible" @close="closeDialog">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :rules="addEditRules" :model="addEditForm" ref="addEditForm">
        <el-form-item label="元件id" label-width="80px" prop="element_id">
          <el-input v-model="addEditForm.element_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="连接点x" label-width="80px" prop="x">
          <el-input v-model="addEditForm.x" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="连接点y" label-width="80px" prop="y">
          <el-input v-model="addEditForm.y" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注名称" label-width="80px" prop="name">
          <el-input v-model="addEditForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="addEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" width="30%" :visible.sync="editFormVisible">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :rules="editRules" :model="editForm" ref="editForm">
        <el-form-item label="元件id" label-width="80px" prop="element_id">
          <el-input v-model="editForm.element_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="连接点x" label-width="80px" prop="x">
          <el-input v-model="editForm.x" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="连接点y" label-width="80px" prop="y">
          <el-input v-model="editForm.y" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 设置触发更新的方法 -->
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
var id
var name
// eslint-disable-next-line camelcase,no-unused-vars
var element_id
var x
var y
export default {
  name: 'connection',
  inject: ['reload'],
  methods: {
    // 关闭弹框
    closeDialog () {
      this.addEditForm.element_id = ''
      this.addEditForm.x = ''
      this.addEditForm.y = ''
      this.addEditForm.name = ''
    },
    cancel () {
      this.reload()
      // 取消的时候直接设置对话框不可见即可
      this.editFormVisible = false
      this.addFormVisible = false
    },
    // 编辑
    handleEdit (row) {
      this.editForm = row
      // eslint-disable-next-line camelcase
      element_id = row.element_id
      x = row.x
      y = row.y
      name = row.name
      this.editFormVisible = true
    },
    // 删除
    handleDelete (row) {
      var that = this
      this.$confirm('永久删除此连接点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        id = row.id
        that.$axios
          .post('/deleteConnection', {
            id: id
          })
          .then((response) => {
            // eslint-disable-next-line eqeqeq
            if (response.status == 200) {
              that.cancel()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
    addEdit () {
      this.$refs.addEditForm.validate((valid) => {
        if (valid) {
          var that = this
          id = this.addEditForm.id
          // eslint-disable-next-line camelcase
          element_id = this.addEditForm.element_id
          name = this.addEditForm.name
          x = this.addEditForm.x
          y = this.addEditForm.y
          this.$axios
            .post('/addConnection', {
              id: id,
              element_id: element_id,
              x: x,
              y: y,
              name: name
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status == 200) {
                that.$message('新增连接点成功！')
                that.cancel()
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
          // eslint-disable-next-line camelcase
          element_id = this.editForm.element_id
          x = this.editForm.x
          y = this.editForm.y
          name = this.editForm.name
          this.$axios
            .post('/setConnection', {
              id: id,
              element_id: element_id,
              x: x,
              y: y,
              name: name
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status == 200) {
                that.cancel()
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
      this.addFormVisible = true
    },
    getAttribute () {
      this.$axios
        .get('/getConnection')
        .then((response) => {
          // eslint-disable-next-line eqeqeq
          if (response.status == 200) {
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
    this.getAttribute()
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
      editFormVisible: false,
      addFormVisible: false,
      editForm: {
        element_id: '',
        x: '',
        y: '',
        name: ''
      },
      addEditForm: {
        element_id: '',
        x: '',
        y: '',
        name: ''
      },
      editRules: {
        element_id: [{ required: true, message: '请输入元件id', trigger: 'change' }],
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        name: [{ required: true, message: '请输入备注名称', trigger: 'change' }]
      },
      addEditRules: {
        element_id: [{ required: true, message: '请输入元件id', trigger: 'change' }],
        x: [{ required: true, message: '请输入x', trigger: 'change' }],
        y: [{ required: true, message: '请输入y', trigger: 'change' }],
        name: [{ required: true, message: '请输入备注名称', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>
</style>
