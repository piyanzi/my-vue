<template>
  <div>

    <my-bread-menu></my-bread-menu>

    <el-dialog
      :visible="pipeVisible"
      title="修改管道数据"
      width="30%">
      <el-form :model="pipe" label-width="100px">
        <el-form-item label="管道名称">
          <el-input v-model="pipe.name"></el-input>
        </el-form-item>
        <el-form-item label="起始节点">
          <el-select v-model="pipe.startId" @change="selectStart" placeholder="请选择节点">
            <el-option
              v-for="item in bases"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
          <el-select v-model="pipe.startConnection" placeholder="请选择连接点">
            <el-option
              v-for="item in startConnections"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="终止节点">
          <el-select v-model="pipe.endId" @change="selectEnd" placeholder="请选择节点">
            <el-option
              v-for="item in bases"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
          <el-select v-model="pipe.endConnection" placeholder="请选择连接点">
            <el-option
              v-for="item in endConnections"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管道内径">
          <el-input v-model="pipe.diameter"></el-input>
        </el-form-item>
        <el-form-item label="管壁粗糙度">
          <el-input v-model="pipe.roughness"></el-input>
        </el-form-item>
        <el-form-item label="管道长度">
          <el-input v-model="pipe.length"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="pipeVisible = false;isPipeCreate = false">取消</el-button>
        <el-button @click="alterPipe">确定</el-button>
      </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="工程信息" name="projects">
        <el-card body-style="width: 300px">
          <el-form :model="project" label-width="80px" label-position="left">
            <el-form-item label="工程信息">
              <el-input placeholder="请输入工程描述信息" v-model="project.info" maxlength="30" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="模拟类型">
              <el-select v-model="project.type" placeholder="请选择模拟类型" disabled>
                <el-option v-for="item in type" :label="item.name" :value="item.name" :key="item.tid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="project.author" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" round size="small">修改</el-button>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="节点数据" name="nodes">
        <el-tabs @tab-click="nodeClick">
          <el-tab-pane label="普通节点数据" name="node">
            <el-card>
              <nodeList ref="nodeList" style="width: 100%;height: 82vh;"></nodeList>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="生产井数据" name="well">
            <el-card>
              <wellList ref="wellList" style="width: 100%;height: 82vh;"></wellList>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="引射器数据" name="ejector">
            <el-card>
              <ejectorList ref="ejectorList" style="width: 100%;height: 82vh;"></ejectorList>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="压缩机数据" name="compressor">
            <el-card>
              <compressorList ref="compressorList" style="width: 100%;height: 82vh;"></compressorList>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="站场数据" name="station">
            <el-card>
              <stationList ref="stationList" style="width: 100%;height: 82vh;"></stationList>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="管道数据" name="pipes">
        <el-card>
          <el-button size="small" type="primary" round @click="createPipe">添加管道</el-button>
          <el-table :data="pipes" border stripe>
            <el-table-column label="名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="起点" prop="startName" width="120px"></el-table-column>
            <el-table-column label="终点" prop="endName" width="120px"></el-table-column>
            <el-table-column label="内径(m)" prop="diameter" width="100px"></el-table-column>
            <el-table-column label="长度(m)" prop="length" width="100px"></el-table-column>
            <el-table-column label="粗糙度(m)" prop="roughness" width="120px"></el-table-column>
            <el-table-column label="连接起点" prop="startConnectionName" width="80px"></el-table-column>
            <el-table-column label="连接终点" prop="endConnectionName" width="80px"></el-table-column>
            <el-table-column label="操作" flex="right" width="180px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editPipe(scope.row.id)">编辑</el-button>
                <el-popconfirm
                  confirmButtonText='好的'
                  cancelButtonText='不用了'
                  icon="el-icon-info"
                  iconColor="red"
                  @onConfirm="deletePipe(scope.row.id)"
                  title="确认删除该管道？">
                  <el-button slot="reference" size="mini" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="pageInfo.pageNumber"
            :page-sizes="[2, 5, 10]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"></el-pagination>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="气体组分" name="gas">
        <el-card body-style="width: 441px">
          <el-table :data="gas" border stripe show-summary>
            <el-table-column type="index" label="id" width="80px"></el-table-column>
            <el-table-column label="名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="化学式" prop="formula" width="120px"></el-table-column>
            <el-table-column label="摩尔百分比" prop="percentage" width="120px"></el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="绘制界面" name="graph">
          <graph style="width: 100%;height: 82vh;"></graph>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from 'moment'
import NodeList from '../list/NodeList'
import WellList from '../list/WellList'
import EjectorList from '../list/EjectorList'
import StationList from '../list/StationList'
import CompressorList from '../list/CompressorList'
import Graph from './Graph'
export default {
  data () {
    return {
      // 节点参数
      base: {
        id: 0,
        modelId: 0,
        projectId: 0,
        elementId: 0,
        elementName: '',
        name: '',
        elevation: 0.0,
        x: 0,
        y: 0
      },
      // 管道参数
      pipe: {
        id: 0,
        projectId: 0,
        modelId: 0,
        startId: 0,
        endId: 0,
        name: '',
        startName: '',
        endName: '',
        diameter: '',
        length: '',
        roughness: '',
        startConnection: '',
        endConnection: '',
        startConnectionName: '',
        endConnectionName: ''
      },
      isPipeCreate: false,
      pipeVisible: false,

      // 元件信息
      element: {
        id: 0,
        name: ''
      },
      elements: [],

      // 连接点信息
      connection: {
        id: 0,
        name: ''
      },
      startConnections: [],
      endConnections: [],
      connections: [],

      // 工程信息
      project: {},

      // 类型
      type: [],

      // 节点数据
      bases: [],

      // 管道数据
      pipes: [],

      // 气体数据
      gas: [],

      // 工程id
      pid: '',

      // 激活标签
      activeName: 'projects',

      // 分页信息
      pageInfo: {
        pageNumber: 1,
        pageSize: 5
      },

      // 总记录数
      total: 0
    }
  },
  components: {
    wellList: WellList,
    ejectorList: EjectorList,
    stationList: StationList,
    compressorList: CompressorList,
    graph: Graph,
    nodeList: NodeList
  },
  methods: {
    // 获取所有节点，用于设置连接关系
    async getAllNodes () {
      const { data: res } = await this.$http.get('/project/' + this.pid + '/bases')
      this.bases = res.data
    },
    // 新增管道
    async createPipe () {
      // 清空属性
      Object.keys(this.pipe).forEach(key => (
        this.pipe[key] = ''
      ))
      this.$set(this.pipe, 'projectId', this.pid)
      this.isPipeCreate = true
      await this.getAllNodes()
      // const { data: res } = await this.$http.post('/pipes', this.pipe)
      // this.pipe = res.data
      this.pipeVisible = true
    },

    // 编辑管道信息
    async editPipe (id) {
      const { data: res } = await this.$http.get('/pipes/' + id)
      this.pipe = res.data
      this.pipeVisible = true
      await this.getAllNodes()
      await this.selectStart()
      await this.selectEnd()
    },

    // 提交管道修改
    async alterPipe () {
      if (!this.isPipeCreate) {
        const { data: res } = await this.$http.put('/pipes', this.pipe)
        this.pipeVisible = false
        await this.getPipes(this.pageInfo)
        if (res.status === 0) {
          this.$message.success('修改成功！')
        } else {
          this.$message.error('修改出错！')
        }
      } else {
        this.isPipeCreate = false
        const { data: res } = await this.$http.post('/pipes', this.pipe)
        this.pipeVisible = false
        await this.getPipes(this.pageInfo)
        if (res.status === 0) {
          this.$message.success('新建成功！')
        } else {
          this.$message.error('新建出错！')
        }
      }
    },

    // 获取start_connection
    async selectStart () {
      let elementId
      for (var index in this.bases) {
        if (this.bases[index].id === this.pipe.startId) {
          elementId = this.bases[index].elementId
          break
        }
      }
      const { data: res } = await this.$http.post('/findConnectionByEid', {
        element_id: elementId
      })
      this.startConnections = res.data
      if (this.isPipeCreate) {
        this.pipe.startConnection = ''
      }
    },

    // 获取end_connection
    async selectEnd () {
      let elementId
      for (var index in this.bases) {
        if (this.bases[index].id === this.pipe.endId) {
          elementId = this.bases[index].elementId
          break
        }
      }
      console.log(elementId)
      const { data: res } = await this.$http.post('/findConnectionByEid', {
        element_id: elementId
      })
      this.endConnections = res.data
      if (this.isPipeCreate) {
        this.pipe.endConnection = ''
      }
    },

    // 删除管道
    async deletePipe (id) {
      const { data: res } = await this.$http.delete('/pipes/' + id)
      if (res.status === 0) {
        this.$message.success('删除成功！')
        await this.getPipeCount()
        await this.getPipes(this.pageInfo)
      } else {
        this.$message.error('删除出错！')
      }
    },

    // 获取模拟类型
    async getType () {
      const { data: res } = await this.$http.get('/types')
      this.type = res.data
    },

    // 修改分页信息
    handleSizeChange (newSize) {
      this.pageInfo.pageSize = newSize
      this.getNodes(this.pageInfo)
    },

    // 分页跳转
    handleCurrentChange (newPage) {
      this.pageInfo.pageNumber = newPage
      this.getNodes(this.pageInfo)
    },
    // 修改分页信息
    handleSizeChange1 (newSize) {
      this.pageInfo.pageSize = newSize
      this.getPipes(this.pageInfo)
    },

    // 分页跳转
    handleCurrentChange1 (newPage) {
      this.pageInfo.pageNumber = newPage
      this.getPipes(this.pageInfo)
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

    // 日期格式化
    dateFormat: function (row, column) {
      const date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    // tab标签切换
    async handleClick (tab) {
      // 工程信息不需要查
      if (tab.name === 'projects') return
      // 气体信息不需要分页查
      if (tab.name === 'gas') {
        // 获取气体信息
        const { data: res } = await this.$http.get('/projects/gas/' + this.pid)
        this.gas = res.data
      }
      if (tab.name === 'pipes') {
        await this.getPipeCount()
        await this.getPipes(this.pageInfo)
      }
      if (tab.name === 'nodes') {
        await this.$refs.nodeList.getNode()
      }
    },

    // node tab标签切换
    async nodeClick (tab) {
      if (tab.name === 'node') {
        await this.$refs.nodeList.getNode()
      }
      if (tab.name === 'well') {
        await this.$refs.wellList.getWell()
      }
      if (tab.name === 'ejector') {
        await this.$refs.ejectorList.getEjector()
      }
      if (tab.name === 'station') {
        await this.$refs.stationList.getStation()
      }
      if (tab.name === 'compressor') {
        await this.$refs.compressorList.getCompressor()
      }
    },

    // 获取工程信息
    async getProject () {
      const { data: res } = await this.$http.get('/projects/' + this.pid)
      this.project = res.data
    },

    // 获取管道总数
    async getPipeCount () {
      const { data: res } = await this.$http.get('/project/pipes/count/' + this.pid)
      this.total = res.data
    },

    // 获取管段数据，需要分页
    async getPipes (pageInfo) {
      const { data: res } = await this.$http.get('/project/pipes/' + this.pid, {
        params: {
          pageNumber: pageInfo.pageNumber,
          pageSize: pageInfo.pageSize
        }
      })
      this.pipes = res.data
    },

    // 加载时更改导航
    changeMenu () {
      this.$store.commit('changePath', {
        parent: '工程管理',
        child: '模拟信息',
        path: this.$store.state.activePath.path
      })
    },

    // 加载时获取元件
    async getElements () {
      const { data: res } = await this.$http.get('/getElements')
      this.elements = res.data
    },

    // 加载时获取连接点
    async getConnections () {
      const { data: res } = await this.$http.get('/getConnection')
      this.connections = res.data
    }

  },

  created () {
    // 从路由中获取工程id
    this.pid = this.$route.query.id
    // 加载时获取工程信息
    this.getProject()
    // 加载时获取类型
    this.getType()
    // 加载时更改导航
    this.changeMenu()
    // 加载时获取所有元件信息
    this.getElements()
    // 加载时获取所有连接点信息
    this.getConnections()
  }
}
</script>

<style lang="less" scoped>

</style>
