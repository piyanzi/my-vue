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
              v-for="item in nodes"
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
              v-for="item in nodes"
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

    <el-dialog
      width="30%"
      title="修改管网元素"
      :visible="nodeVisible">
      <el-form :model="node">
        <el-form-item label="节点名称" label-width="100px">
          <el-input v-model="node.name"></el-input>
        </el-form-item>
        <el-form-item label="节点类型" label-width="100px">
          <el-select v-model="node.elementId" placeholder="请选择节点">
            <el-option
              v-for="item in elements"
              :key="item.id"
              :label="item.name"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点压力" label-width="100px">
          <el-radio-group v-model="node.pressureState">
            <el-radio :label="true">Fixed</el-radio>
            <el-radio :label="false">Estimated</el-radio>
          </el-radio-group>
          <el-input v-model="node.pressure"></el-input>
        </el-form-item>
        <el-form-item label="节点载荷" label-width="100px">
          <el-radio-group v-model="node.loadState">
            <el-radio :label="true">Fixed</el-radio>
            <el-radio :label="false">Estimated</el-radio>
          </el-radio-group>
          <el-input v-model="node.loads"></el-input>
        </el-form-item>
        <el-form-item label="节点海拔" label-width="100px">
          <el-input v-model="node.elevation"></el-input>
        </el-form-item>
        <el-form-item label="横坐标" label-width="100px">
          <el-input v-model="node.x"></el-input>
        </el-form-item>
        <el-form-item label="纵坐标" label-width="100px">
          <el-input v-model="node.y"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="nodeVisible = false;isNodeCreate = false">取消</el-button>
        <el-button @click="alterNode">确定</el-button>
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
        <el-card>
          <el-button size="small" type="primary" round @click="createNode">添加节点</el-button>
          <el-table :data="nodes" border stripe>
            <el-table-column label="名称" prop="name" width="120px"></el-table-column>
            <el-table-column label="元件类型" prop="elementName" width="120px"></el-table-column>
            <el-table-column label="压力(MPa)" prop="pressure" width="100px"></el-table-column>
            <el-table-column label="载荷(Sm³/d)" prop="loads" width="120px"></el-table-column>
            <el-table-column label="压力是否已知" :formatter="formatBoolean" prop="pressureState" width="80px"></el-table-column>
            <el-table-column label="载荷是否已知" :formatter="formatBoolean" prop="loadState" width="80px"></el-table-column>
            <el-table-column label="海拔" prop="elevation" width="80px"></el-table-column>
            <el-table-column label="横坐标" prop="x" width="80px"></el-table-column>
            <el-table-column label="纵坐标" prop="y" width="80px"></el-table-column>
            <el-table-column label="操作" flex="right" width="180px">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editNode(scope.row.id)">编辑</el-button>
                <el-popconfirm
                  confirmButtonText='好的'
                  cancelButtonText='不用了'
                  icon="el-icon-info"
                  iconColor="red"
                  @onConfirm="deleteNode(scope.row.id)"
                  title="确认删除该节点？">
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
import Graph from './Graph'
export default {
  data () {
    return {
      // 节点参数
      node: {
        id: 0,
        modelId: 0,
        projectId: 0,
        elementId: 0,
        elementName: '',
        name: '',
        pressure: 0.0,
        loads: 0.0,
        pressureState: false,
        loadState: false,
        elevation: 0.0,
        x: 0,
        y: 0
      },
      isNodeCreate: false,
      nodeVisible: false,
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
      nodes: [],

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
    graph: Graph
  },
  methods: {
    // 获取所有节点，用于设置连接关系
    async getAllNodes () {
      const { data: res } = await this.$http.get('/project/' + this.pid + '/nodes')
      this.nodes = res.data
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

    // 新增节点
    async createNode () {
      // 清空属性
      Object.keys(this.node).forEach(key => (
        this.node[key] = ''
      ))
      this.$set(this.node, 'projectId', this.pid)
      this.isNodeCreate = true
      await this.getElements()
      // const { data: res } = await this.$http.post('/nodes', this.node)
      // this.node = res.data
      this.nodeVisible = true
    },

    // 编辑节点数据
    async editNode (id) {
      const { data: res } = await this.$http.get('/nodes/' + id)
      this.node = res.data
      await this.getElements()
      this.nodeVisible = true
    },

    // 获取start_connection
    async selectStart () {
      let elementId
      for (var index in this.nodes) {
        if (this.nodes[index].id === this.pipe.startId) {
          elementId = this.nodes[index].elementId
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
      for (var index in this.nodes) {
        if (this.nodes[index].id === this.pipe.endId) {
          elementId = this.nodes[index].elementId
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

    // 提交节点修改
    async alterNode () {
      if (!this.isNodeCreate) {
        const { data: res } = await this.$http.put('/nodes', this.node)
        this.nodeVisible = false
        await this.getNodes(this.pageInfo)
        if (res.status === 0) {
          this.$message.success('修改成功！')
        } else {
          this.$message.error('修改出错！')
        }
      } else {
        this.isNodeCreate = false
        const { data: res } = await this.$http.post('/nodes', this.node)
        this.nodeVisible = false
        await this.getNodes(this.pageInfo)
        if (res.status === 0) {
          this.$message.success('新建成功！')
        } else {
          this.$message.error('新建出错！')
        }
      }
    },

    // 删除节点
    async deleteNode (id) {
      const { data: res } = await this.$http.delete('/nodes/' + id)
      if (res.status === 0) {
        this.$message.success('删除成功！')
        await this.getNodeCount()
        await this.getNodes(this.pageInfo)
      } else {
        this.$message.error('删除出错！')
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
        await this.getNodeCount()
        await this.getNodes(this.pageInfo)
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

    // 获取节点总数
    async getNodeCount () {
      const { data: res } = await this.$http.get('/project/nodes/count/' + this.pid)
      this.total = res.data
    },

    // 获取节点数据,需要分页
    async getNodes (pageInfo) {
      // 节点数据分页查询
      const { data: res } = await this.$http.get('/project/nodes/' + this.pid, {
        params: {
          pageNumber: pageInfo.pageNumber,
          pageSize: pageInfo.pageSize
        }
      })
      this.nodes = res.data
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
