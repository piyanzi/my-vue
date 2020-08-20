<template>
  <div>
    <my-bread-menu></my-bread-menu>

    <el-card>
      <el-table :data="gas" border stripe>
        <el-table-column label="名称" prop="name" width="100px"></el-table-column>
        <el-table-column label="C1" prop="c1" width="100px"></el-table-column>
        <el-table-column label="C2" prop="c2" width="100px"></el-table-column>
        <el-table-column label="C3" prop="c3" width="100px"></el-table-column>
        <el-table-column label="iC4" prop="ic4" width="100px"></el-table-column>
        <el-table-column label="nC4" prop="nc4" width="100px"></el-table-column>
        <el-table-column label="iC5" prop="ic5" width="100px"></el-table-column>
        <el-table-column label="nC5" prop="nc5" width="100px"></el-table-column>
        <el-table-column label="C6" prop="c6" width="100px"></el-table-column>
        <el-table-column label="N₂" prop="n2" width="100px"></el-table-column>
        <el-table-column label="CO₂" prop="co2" width="100px"></el-table-column>
        <el-table-column label="操作" fixed="right" width="180px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">修改</el-button>
            <el-popconfirm
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              @onConfirm="deleteGas(scope.row.id);getCount;getGas"
              title="确认删除该组分？">
              <el-button slot="reference" size="mini" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
export default {
  data () {
    return {
      // 气体组分列表
      gas: [],

      // 组分总数
      total: 0,

      // 分页信息
      pageInfo: {
        pageNumber: 1,
        pageSize: 5
      }
    }
  },

  methods: {
    // 删除组分
    async deleteGas (id) {
      const { data: res } = await this.$http.delete('/components/' + id)
      if (res.status === 0) {
        await this.getCount()
        await this.getGas()
      }
    },

    // 修改
    edit (id) {
      this.$router.push({
        path: '/editGas',
        query: {
          id: id
        }
      })
    },

    handleSizeChange (newSize) {
      this.pageInfo.pageSize = newSize
      this.getGas()
    },

    handleCurrentChange (newPage) {
      this.pageInfo.pageNumber = newPage
      this.getGas()
    },

    // 获取气体组分列表
    async getGas () {
      const { data: res } = await this.$http.get('/components', {
        params: this.pageInfo
      })
      this.gas = res.data
    },

    // 获取组分总数
    async getCount () {
      const { data: res } = await this.$http.get('/components/count')
      this.total = res.data
    }
  },

  created () {
    this.getCount()
    this.getGas()
  }
}
</script>

<style lang="less" scoped>

.el-table {
  max-width: 1281px;
}

</style>
