<template>
  <div>
    <my-bread-menu></my-bread-menu>

    <!-- 列表区域 -->
    <el-card>
      <el-table :data="projectsLists" border stripe>
        <el-table-column type="index" width="80px" label="编号"></el-table-column>
        <el-table-column label="描述" prop="info" width="150px"></el-table-column>
        <el-table-column label="类型" prop="type" width="150px"></el-table-column>
        <el-table-column label="创建者" prop="author" width="150px"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" :formatter="dateFormat" width="180px"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime" :formatter="dateFormat" width="180px"></el-table-column>
        <el-table-column label="操作" fixed="right" width="270px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.pid)">编辑</el-button>
            <el-button size="mini" type="success" @click="simulate(scope.row.pid)">模拟</el-button>
            <el-popconfirm
              @onConfirm="deleteProject(scope.row.pid)"
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="确认删除该工程？">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件size-change每页上限 layout功能组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNumber"
        :page-sizes="[2, 5, 10]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {

      // 分页信息
      pageInfo: {
        pageNumber: 1,
        pageSize: 5
      },

      // 工程列表
      projectsLists: [],

      // 总记录数
      total: 0
    }
  },

  // 页面加载时刷新工程列表以及总数
  created () {
    this.getProjectsList()
    this.getCount()
  },

  methods: {

    // 删除工程信息
    async deleteProject (id) {
      const { data: res } = await this.$http.delete('/projects/' + id)
      if (res.status === 0) {
        this.$message.success('删除成功！')
        await this.getCount()
        await this.getProjectsList()
      } else {
        this.$message.error('删除出错！')
      }
    },

    // 编辑工程信息
    edit (id) {
      this.$router.push({
        path: '/editProject',
        query: {
          id: id
        }
      })
    },

    simulate (id) {
      this.$router.push({
        path: '/result',
        query: {
          id: id
        }
      })
    },

    // 修改分页信息
    handleSizeChange (newSize) {
      this.pageInfo.pageSize = newSize
      this.getProjectsList()
    },

    // 分页跳转
    handleCurrentChange (newPage) {
      this.pageInfo.pageNumber = newPage
      this.getProjectsList()
    },

    // 查询工程列表
    async getProjectsList () {
      const { data: res } = await this.$http.get('/projects', {
        params: {
          pageNumber: this.pageInfo.pageNumber,
          pageSize: this.pageInfo.pageSize
        }
      })
      this.projectsLists = res.data
    },

    // 工程总数
    async getCount () {
      const { data: res } = await this.$http.get('/projects/count')
      this.total = res.data
    },

    // 日期格式化
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="less" scoped>

.el-table {
  max-width: 1161px;
}

</style>
