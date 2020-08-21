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
        >新增属性</el-button>
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
      <el-table-column prop="pressure" label="压力(MPa)" width="150"></el-table-column>
      <el-table-column prop="pressure_state" label="压力是否已知" :formatter="formatBoolean" width="150"></el-table-column>
      <el-table-column prop="loads" label="载荷(Sm³/d)" width="150"></el-table-column>
      <el-table-column prop="load_state" label="载荷是否已知" :formatter="formatBoolean" width="200"></el-table-column>
      <el-table-column prop="elevation" label="海拔" width="200"></el-table-column>
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

    <el-dialog title="新增属性" width="30%" :visible.sync="addFormVisible" @close="closeDialog">
      <!-- 在el-dialog中进行嵌套el-form实现弹出表格的效果 -->
      <el-form :rules="addEditRules" :model="addEditForm" ref="addEditForm">
        <el-form-item label="元件id" label-width="100px" prop="element_id">
          <el-input v-model="addEditForm.element_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="压力(MPa)" label-width="100px" prop="pressure">
          <el-input v-model="addEditForm.pressure" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="压力是否已知" label-width="100px" prop="pressure_state">
          <el-input v-model="addEditForm.pressure_state" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="载荷(Sm³/d)" label-width="100px" prop="loads">
          <el-input v-model="addEditForm.loads" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="载荷是否已知" label-width="100px" prop="load_state">
          <el-input v-model="addEditForm.load_state" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="海拔" label-width="100px" prop="elevation">
          <el-input v-model="addEditForm.elevation" auto-complete="off"></el-input>
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
        <el-form-item label="元件id" label-width="80px" prop="eid">
          <el-input v-model="editForm.eid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性名称" label-width="80px" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认值" label-width="80px" prop="value">
          <el-input v-model="editForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="80px" prop="unit">
          <el-input v-model="editForm.unit" auto-complete="off"></el-input>
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
var value
var eid
var unit
export default {
  name: 'attribute',
  inject: ['reload'],
  methods: {
    // 关闭弹框
    closeDialog () {
      this.addEditForm.id = ''
      this.addEditForm.eid = ''
      this.addEditForm.name = ''
      this.addEditForm.value = ''
      this.addEditForm.unit = ''
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
      id = row.id
      eid = row.eid
      name = row.name
      value = row.value
      unit = row.unit
      this.editFormVisible = true
    },
    // 删除
    handleDelete (row) {
      var that = this
      this.$confirm('永久删除此条属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        id = row.id
        that.$axios
          .post('/deleteAttribute', {
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
      this.$refs.addEditForm.validate((valid) => {
        if (valid) {
          var that = this
          id = this.addEditForm.id
          eid = this.addEditForm.eid
          name = this.addEditForm.name
          value = this.addEditForm.value
          unit = this.addEditForm.unit
          this.$axios
            .post('/graph/addAttributes', {
              id: id,
              eid: eid,
              name: name,
              value: value,
              unit: unit
            })
            .then((response) => {
              // eslint-disable-next-line eqeqeq
              if (response.status == 200) {
                that.$message('新增属性成功！')
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
          name = this.editForm.name
          value = this.editForm.value
          unit = this.editForm.unit
          eid = this.editForm.eid
          this.$axios
            .post('/graph/setAttributes', {
              id: id,
              eid: eid,
              name: name,
              value: value,
              unit: unit
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
        .get('/getAttribute')
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
        name: '',
        eid: '',
        value: '',
        unit: ''
      },
      addEditForm: {
        element_id: '',
        pressure: '',
        pressure_state: '',
        load_state: '',
        loads: '',
        elevation: ''
      },
      editRules: {
        name: [{ required: true, message: '请输入属性名称', trigger: 'change' }],
        eid: [{ required: true, message: '请输入元件id', trigger: 'change' }],
        value: [{ required: true, message: '请输入默认值', trigger: 'change' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'change' }]
      },
      addEditRules: {
        unit: [{ required: true, message: '请输入单位', trigger: 'change' }],
        value: [{ required: true, message: '请输入默认值', trigger: 'change' }],
        name: [{ required: true, message: '请输入属性名称', trigger: 'change' }],
        eid: [{ required: true, message: '请输入元件id', trigger: 'change' }],
        id: [{ required: true, message: '请输入属性id', trigger: 'change' }]
      }
    }
  }
}
</script>

<style scoped>
</style>
