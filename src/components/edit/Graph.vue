<template>
  <div id="graph">
    <div class="main-div">
      <div id="headContainer" class="head-container">
        <el-row style="margin-left: 120px">
          <el-button-group>
            <el-button type="primary" size="small" @click="readModel" icon="el-icon-refresh">刷新模型</el-button>
            <el-button type="primary" size="small" @click="saveModel" icon="el-icon-upload">保存模型</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" @click="zoomOut" icon="el-icon-zoom-out">缩小</el-button>
            <el-button type="primary" size="small" @click="zoomIn" icon="el-icon-zoom-in">放大</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" @click="selectAll" icon="el-icon-thumb">全选</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="danger" size="small" @click="remove" icon="el-icon-delete-solid">删除</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" @click="undo" icon="el-icon-back">撤销</el-button>
            <el-button type="primary" size="small" @click="redo" icon="el-icon-right">重做</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" @click="scaleRaw">原始大小</el-button>
            <el-button type="primary" size="small" @click="scaleBest">最佳大小</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="primary" size="small" @click="checkGraph" icon="el-icon-document-checked">检查项目</el-button>
            <el-button type="primary" size="small" @click="handlePath" icon="el-icon-document-checked">最短路径</el-button>
          </el-button-group>
        </el-row>
        <el-row style="margin-left: 120px;margin-top: 2px;">
          <el-button-group>
            <el-button type="success" size="small" @click="_import" icon="el-icon-download">导入XML</el-button>
            <el-button type="success" size="small" @click="exportXML" icon="el-icon-upload2">导出XML</el-button>
            <el-button type="success" size="small" @click="viewXML" icon="el-icon-monitor">展示XML</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="success" size="small" @click="_importJSON" icon="el-icon-download">导入JSON</el-button>
            <el-button type="success" size="small" @click="exportJSON" icon="el-icon-upload2">导出JSON</el-button>
            <el-button type="success" size="small" @click="viewJSON" icon="el-icon-monitor">展示JSON</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="success" size="small" @click="exportPDF" icon="el-icon-picture-outline">导出PDF</el-button>
          </el-button-group>
          <el-button-group>
            <el-button type="danger" v-if="!ifRoot" size="small" @click="returnLast">返回上一层</el-button>
          </el-button-group>
        </el-row>
      </div>
      <div id="tbContainer" class="left-container"></div>
      <div id="container" class="main-container"></div>
      <div id="rightContainer" class="right-container"></div>
    </div>

    <input type="file" id="importXML" @change="handle_file($event)" accept=".xml" style="display: none;"/>
    <input type="file" id="importJSON" @change="handle_file2($event)" accept=".json" style="display: none;"/>

<!--    <el-dialog title="新增元件赋值" :visible.sync="dialogFormVisible" width="40%" @close="closeDialog" center>-->
<!--      <el-form ref="form" :model="form" :rules="rules" :inline="true">-->
<!--        <el-form-item label="元件名称" label-width="120px" prop="itemName">-->
<!--          <el-input v-model="form.itemName" placeholder="请输入元件名称" style="width: 376.48px"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="压力(MPa)" label-width="120px" prop="pressure">-->
<!--          <el-radio-group v-model="form.pressureState">-->
<!--            <el-radio :label="true">Fixed</el-radio>-->
<!--            <el-radio :label="false">Estimated</el-radio>-->
<!--          </el-radio-group>-->
<!--          <el-input v-model="form.pressure" placeholder="请输入压力"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="载荷(Sm³/d)" label-width="120px" prop="loads">-->
<!--          <el-radio-group v-model="form.loadState">-->
<!--            <el-radio :label="true">Fixed</el-radio>-->
<!--            <el-radio :label="false">Estimated</el-radio>-->
<!--          </el-radio-group>-->
<!--          <el-input v-model="form.loads" placeholder="请输入载荷"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="海拔" label-width="120px" prop="elevation">-->
<!--          <el-input v-model="form.elevation" placeholder="请输入海拔" style="width: 376.48px"></el-input>-->
<!--        </el-form-item>-->
<!--        <div v-for="(item2, index2) in form.connections" :key="'2'+index2">-->
<!--          <el-form-item label="横坐标0-1" label-width="120px" :prop="'connections.' + index2 + '.x'"-->
<!--                        :rules="[-->
<!--              {pattern: /^(1|0(\.\d{1,2})?)$/, message: '请输入0-1之间的两位小数', trigger: 'change'},-->
<!--              {required: true, message: '横坐标不能为空', trigger: 'change'}, ]">-->
<!--            <el-input v-model="item2.x" placeholder="请输入横坐标"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="纵坐标0-1" label-width="120px" :prop="'connections.' + index2 + '.y'"-->
<!--                        :rules="[-->
<!--              {pattern: /^(1|0(\.\d{1,2})?)$/, message: '请输入0-1之间的两位小数', trigger: 'change'},-->
<!--              {required: true, message: '纵坐标不能为空', trigger: 'change'}, ]">-->
<!--            <el-input v-model="item2.y" placeholder="请输入纵坐标"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <i class="el-icon-delete" @click="delCurConnection(index2)"></i>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button id="addConnection" @click="addConnection">新增连接点</el-button>-->
<!--        <el-button id="delConnection" @click="delConnection">删除连接点</el-button>-->
<!--        <el-button type="primary" @click="addNewElement('form')">提交</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

    <el-dialog title="编辑连接线" :visible.sync="editFormVisible" width="30%" @close="close" center>
      <el-form ref="editForm" :model="editForm" :rules="editRules">
        <el-form-item label="连接线名称" label-width="120px" prop="eid">
          <el-input v-model="editForm.eid" placeholder="请输入连接线名称"></el-input>
        </el-form-item>
        <el-form-item label="内径(m)" label-width="120px" prop="diameter">
          <el-input v-model="editForm.diameter" placeholder="请输入内径"></el-input>
        </el-form-item>
        <el-form-item label="长度(m)" label-width="120px" prop="length">
          <el-input v-model="editForm.length" placeholder="请输入长度"></el-input>
        </el-form-item>
        <el-form-item label="粗糙度(m)" label-width="120px" prop="roughness">
          <el-input v-model="editForm.roughness" placeholder="请输入粗糙度"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="寻找最短路径" :visible.sync="findPathFormVisible" width="30%" @close="allNodes = [];pathNode.node = ''" center>
      <el-form ref="pathNode" :model="pathNode">
        <el-form-item label="选择节点" label-width="100px">
          <el-select v-model="pathNode.node" placeholder="请选择节点">
            <el-option
              v-for="item in allNodes"
              :key="item.value.attributes[0].value"
              :label="item.value.attributes[0].value"
              :value="item.value.attributes[0].value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="shortPath(pathNode.node)">查询</el-button>
    </el-dialog>

    <el-dialog title="最短路径" :visible.sync="pathFormVisible" width="30%">
      <el-table
        :data="tablePathForm.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        border
        ref="tablePathForm"
        style="width: 100%"
      >
        <el-table-column prop="key" label="元件名称" width="180"></el-table-column>
        <el-table-column prop="value" label="路径长度" width="200"></el-table-column>
      </el-table>

      <div class="tabListPage">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </div>

    </el-dialog>

  </div>
</template>

<script>
/* eslint-disable */
import {UnionSet} from '../../plugins/UnionSet'

var graph
var model
var tbContainer
var headContainer
var container
var rightContainer
var undoManager
var xml
var doc
// 存储工具栏信息
var elementInfo = []
var curElement = {}
var elementAttrList = []
// 新增元件相关全局变量
var curX
var curY
var curFile
// 元件连接点位置信息
var elementConnectionsList = []
// 元件命名计数信息
var elementNameCountList = []
// 存储获得的底层节点
var child

export default {
  name: 'graph',
  data () {
    return {
      form: {
        itemName: '',
        pressure: '',
        loads: '',
        pressureState: '',
        loadState: '',
        elevation: '',
        connections: []
      },
      projectId: '',
      ifRoot: true,
      rules: {
        itemName: [
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z].*$/,
            message: '不能以数字或特殊字符开头',
            trigger: 'change'
          },
          { required: true, message: '元件名称不能为空', trigger: 'change' }
        ]
      },
      tablePathForm: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [10, 20, 30, 50],
      // 默认每页显示的条数（可修改）
      PageSize: 10,
      dialogFormVisible: false,
      editFormVisible: false,
      pathFormVisible: false,
      findPathFormVisible: false,
      allNodes: [],
      pathNode: {
        node: ''
      },
      editForm: {
        eid: '',
        diameter: '',
        length: '',
        roughness: ''
      },
      editRules: {
        eid: [
          {
            pattern: /^[\u4E00-\u9FA5A-Za-z].*$/,
            message: '不能以数字或特殊字符开头',
            trigger: 'change'
          },
          { required: true, message: '请输入连接线名称', trigger: 'change' }]
      }
    }
  },
  created() {
    this.projectId = this.$route.query.id;
  },
  methods: {
    // 关闭Edge
    close () {
      this.editForm.eid = ''
      this.editForm.diameter = 0
      this.editForm.length = 0
      this.editForm.roughness = 0
      var cell2 = graph.getSelectionCell()
      if(cell2.value === null) {
        var list = []
        list.push(cell2)
        graph.removeCells(list)
      }

    },
    // 更新Edge
    update () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          var doc = mxUtils.createXmlDocument()
          var type = doc.createElement(this.editForm.eid)
          type.setAttribute("内径", this.editForm.diameter)
          type.setAttribute("长度", this.editForm.length)
          type.setAttribute("粗糙度", this.editForm.roughness)
          var cell2 = graph.getSelectionCell()
          console.log(cell2)
          if (cell2 !== null) {
            cell2.setValue(type)
            graph.refresh(cell2)
          }
          this.editFormVisible = false
          this.editForm.eid = ''
          this.editForm.diameter = 0
          this.editForm.length = 0
          this.editForm.roughness = 0
        }
      })
    },
    // 放大
    zoomIn () {
      graph.zoomIn()
      this.$message('放大到' + (graph.view.scale * 100).toString() + '%')
    },
    // 缩小
    zoomOut () {
      graph.zoomOut()
      this.$message('缩小到' + (graph.view.scale * 100).toString() + '%')
    },
    // 全选
    selectAll () {
      graph.selectAll()
    },
    // 删除
    remove () {
      if (graph.isEnabled()) {
        graph.removeCells(graph.getSelectionCells())
      }
    },
    // 撤销
    undo () {
      undoManager.undo()
    },
    // 重做
    redo () {
      undoManager.redo()
    },
    // 最佳大小
    scaleBest () {
      graph.selectAll()
      if (graph.getSelectionCells().length == 0) {
        this.$message('当前画布没有内容！')
        graph.clearSelection()
        return
      }
      graph.clearSelection()
      var bounds = graph.getGraphBounds()
      var t = graph.view.translate
      var s = graph.view.scale
      bounds.width /= s
      bounds.height /= s
      bounds.x = bounds.x / s - t.x
      bounds.y = bounds.y / s - t.y
      var cw = graph.container.clientWidth - 10
      var ch = graph.container.clientHeight - 10
      var scale =
        Math.floor(20 * Math.min(cw / bounds.width, ch / bounds.height)) / 20
      graph.zoomTo(scale)
      this.$message(
        '自动调整比例到' + (graph.view.scale * 100).toString() + '%'
      )
      if (mxUtils.hasScrollbars(graph.container)) {
        graph.container.scrollTop =
          (bounds.y + t.y) * scale -
          Math.max((ch - bounds.height * scale) / 2, 0)
        graph.container.scrollLeft =
          (bounds.x + t.x) * scale -
          Math.max((cw - bounds.width * scale) / 2, 0)
      }
    },
    // 原始大小
    scaleRaw () {
      var scale = 1
      graph.zoomTo(scale)
      this.$message('还原到' + (graph.view.scale * 100).toString() + '%')
    },
    // 导入XML
    _import () {
      document.getElementById('importXML').click()
    },
    // 导入JSON
    _importJSON () {
      document.getElementById('importJSON').click()
    },
    // 导出PDF
    exportPDF () {
      var autoOrigin = true
      var printScale = 1
      printScale *= 0.75
      var pf = graph.pageFormat
      var scale = 1 / graph.pageScale
      if (autoOrigin) {
        var pageCount = 1
        if (!isNaN(pageCount)) {
          scale = mxUtils.getScaleForPageCount(pageCount, graph, pf)
          console.log(scale)
        }
      }
      var gb = graph.getGraphBounds()
      var border = 0
      var x0 = 0
      var y0 = 0
      pf = mxRectangle.fromRectangle(pf)
      pf.width = Math.ceil(pf.width * printScale)
      pf.height = Math.ceil(pf.height * printScale)
      scale *= printScale
      var preview = this.createPrintPreview(
        graph,
        scale,
        pf,
        border,
        x0,
        y0,
        autoOrigin
      )
      preview.open()
      if (print) {
        this.printPreview(preview)
      }
    },
    // 生成预览
    createPrintPreview (graph, scale, pf, border, x0, y0, autoOrigin) {
      var preview = new mxPrintPreview(graph, scale, pf, border, x0, y0)
      preview.printBackgroundImage = true
      preview.autoOrigin = autoOrigin
      var bg = '#ffffff'
      preview.backgroundColor = bg
      var writeHead = preview.writeHead
      preview.writeHead = function (doc) {
        writeHead.apply(this, arguments)
        doc.writeln('<style type="text/css">')
        doc.writeln('@media screen {')
        doc.writeln('  body > div { padding:30px;box-sizing:content-box; }')
        doc.writeln('}')
        doc.writeln('</style>')
      }
      return preview
    },
    // 打印预览
    printPreview (preview) {
      try {
        if (preview.wnd != null) {
          var printFn = function () {
            preview.wnd.focus()
            preview.wnd.print()
            preview.wnd.close()
          }
          window.setTimeout(printFn, 500)
          printFn()
        }
      } catch (e) {}
    },
    // 展示JSON
    viewJSON () {
      var enc = new mxCodec(mxUtils.createXmlDocument())
      var node = enc.encode(graph.getModel())
      var file = mxUtils.getXml(node)
      // var jsonObj = JSON.stringify(this.$x2js.xml2js(file));
      // mxUtils.popup(jsonObj, true);
      mxUtils.popup(
        JSON.stringify(this.$x2js.xml2js(file), null, 2).trim(),
        true
      )
    },
    // 导出JSON
    exportJSON () {
      var enc = new mxCodec(mxUtils.createXmlDocument())
      var node = enc.encode(graph.getModel())
      var file = mxUtils.getXml(node)
      var jsonObj = JSON.stringify(this.$x2js.xml2js(file))
      // 下载文件方法
      var funDownload = function (content, filename) {
        var eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        // 字符内容转变成blob地址
        var blob = new Blob([content])
        eleLink.href = URL.createObjectURL(blob)
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      }
      // 从浏览器保存文件
      if ('download' in document.createElement('a')) {
        funDownload(jsonObj, 'model.json')
      } else {
        this.$message('浏览器不支持导出文件!')
      }
      // mxUtils.popup(jsonObj, true);
    },
    // 展示XML
    viewXML () {
      var enc = new mxCodec(mxUtils.createXmlDocument())
      var node = enc.encode(graph.getModel())
      mxUtils.popup(mxUtils.getPrettyXml(node), true)
    },
    // 导出XML
    exportXML () {
      var enc = new mxCodec(mxUtils.createXmlDocument())
      var node = enc.encode(graph.getModel())
      var file = mxUtils.getXml(node)
      // 同时存入全局变量
      xml = node
      // 下载文件方法
      var funDownload = function (content, filename) {
        var eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        // 字符内容转变成blob地址
        var blob = new Blob([content])
        eleLink.href = URL.createObjectURL(blob)
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      }
      // 从浏览器保存文件
      if ('download' in document.createElement('a')) {
        funDownload(file, 'model.xml')
      } else {
        this.$message('浏览器不支持导出文件!')
      }
    },
    // 创建节点类型
    createElement (name) {
      for (var index in elementAttrList) {
        var s = new XMLSerializer()
        if (
          s.serializeToString(elementAttrList[index]).startsWith('<' + name)
        ) {
          return elementAttrList[index]
        }
      }
      var eletype = doc.createElement(name)
      elementAttrList.push(eletype)
      return eletype
    },
    // 处理上传的xml文件
    handle_file (event) {
      var files = event.target.files
      if (files != null) {
        var file = files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
          var data = e.target.result
          var model = mxUtils.parseXml(data)
          var dec = new mxCodec(model)
          dec.decode(model.documentElement, graph.getModel())
        }
        reader.readAsText(file)
      }
    },
    // 处理上传的json文件
    handle_file2 (event) {
      var _this = this
      var files = event.target.files
      if (files != null) {
        var file = files[0]
        var reader = new FileReader()
        reader.onload = function (e) {
          var data2 = e.target.result
          // alert(data2);
          var data = _this.$x2js.js2xml(JSON.parse(data2))
          // alert(data);
          // mxUtils.popup(data, true);
          var model = mxUtils.parseXml(data)
          var dec = new mxCodec(model)
          dec.decode(model.documentElement, graph.getModel())
        }
        reader.readAsText(file)
      }
    },
    // 动态新增connection
    addConnection () {
      this.form.connections.push({
        x: '',
        y: ''
      })
    },
    // 删除最后一个connection
    delConnection () {
      this.form.connections.splice(-1, 1)
    },
    // 删除当前connection
    delCurConnection (index) {
      this.form.connections.splice(index, 1)
    },
    // 拖拽新增节点类型
    addNewElement (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var type = this.$options.methods.createElement(this.form.itemName)
          var eid = elementNameCountList.length
          console.log(eid)
          elementNameCountList[eid] = 1
          type.setAttribute("压力",this.form.pressure)
          type.setAttribute("载荷",this.form.loads)
          type.setAttribute("压力已知",this.form.pressureState)
          type.setAttribute("载荷已知",this.form.loadState)
          type.setAttribute("海拔",this.form.elevation)
          var curConnection = {}
          curConnection.id = eid
          var connect = []
          for (var index in this.form.connections) {
            var pair = {}
            pair.x = this.form.connections[index].x
            pair.y = this.form.connections[index].y
            pair.perimeter = true
            connect.push(pair)
          }
          curConnection.connections = connect
          elementConnectionsList.push(curConnection)
          this.handleDrop(graph, curFile, curX, curY, type, eid)
          this.dialogFormVisible = false
          this.form.itemName = ''
          this.form.connections = []
          this.form.pressure = ''
          this.form.pressureState = ''
          this.form.loadState = ''
          this.form.loads = ''
          this.form.elevation = ''
        } else {
          return false
        }
      })
    },
    // 关闭弹框
    closeDialog () {
      this.form.itemName = ''
      this.form.connections = []
      this.form.pressure = ''
      this.form.pressureState = ''
      this.form.loadState = ''
      this.form.loads = ''
      this.form.elevation = ''
    },
    // 保存模型到服务器
    saveModel () {
      let parent;
      let i;
      var _this = this
      var enc = new mxCodec(mxUtils.createXmlDocument())
      var node = enc.encode(graph.getModel())
      var evaluator = new XPathEvaluator();
      // 带id的collapsed会导致重复ID
      var expression = evaluator.createExpression("//*[@as='collapsed']")
      var removes = expression.evaluate(node, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE)
      for (i = 0; i < removes.snapshotLength; ++i) {
        parent = removes.snapshotItem(i).parentNode;
        parent.removeChild(removes.snapshotItem(i))
        parent.setAttribute('collapsed', '1')
      }
      // 若站场没有带collapsed，则通过边界找出并全部设成收起状态
      var expression2 = evaluator.createExpression("//*[@as='alternateBounds']")
      var children = expression2.evaluate(node, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE)
      for (i = 0; i < children.snapshotLength; ++i) {
        parent = children.snapshotItem(i).parentNode.parentNode;
        parent.setAttribute('collapsed', '1')
      }
      var file = mxUtils.getXml(node)
      this.$axios
        .put('/model', {
          pid: _this.projectId,
          model: file
        })
        .then(function (response) {
          if (response.status === 200) {
            _this.$message('保存成功！')
          } else {
            _this.$message('保存模型失败，请重试！')
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.$message('保存模型失败，请重试！')
        })
    },
    // 从服务器读取模型
    readModel () {
      var _this = this
      if (this.$route.query.id === '') {
        this.$message('未指定项目，请选择项目后再刷新！')
        return
      }
      this.$axios
        .post('/model/' + this.$route.query.id)
        .then(function (response) {
          if (response.status === 200) {
            var model = mxUtils.parseXml(response.data.data["model"])
            var dec = new mxCodec(model)
            dec.decode(model.documentElement, graph.getModel())
            // graph.selectAll()
            // var cells = graph.getSelectionCells()
            // var list = []
            // for (var index in cells) {
            //   if (cells[index].value.nodeName === '站场') {
            //     list.push(cells[index])
            //   }
            // }
            // graph.foldCells(list)
            // graph.clearSelection()
            _this.$message('模型加载完成！')
          } else {
            _this.$message('获取模型文件错误，请重试！')
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.$message('获取模型文件错误，请重试！')
        })
    },
    // 检查是否存在未连通元件
    checkGraph () {
      graph.selectAll()
      var cells = graph.getSelectionCells()
      var vertexList = []
      var edgeList = []
      var list = []
      var finalSet = new Set()
      for (var i = 0; i < cells.length; ++i) {
        if (cells[i].isVertex()) {
          vertexList.push(cells[i].id)
        } else {
          var pair = {}
          pair.source = cells[i].source.id
          pair.target = cells[i].target.id
          edgeList.push(pair)
        }
      }
      const set = new UnionSet(vertexList)
      for (var index in edgeList) {
        set.union(edgeList[index].source, edgeList[index].target)
      }
      for (let i = 0; i < set.arr.length; ++i) {
        var root = set.find(set.arr[i])
        finalSet.add(root)
      }
      if (finalSet.size > 2) {
        this.$message((finalSet.size - 2) + '处未连通')
      } else {
        this.$message('所有元件已连通！')
      }
      graph.clearSelection()
    },
    // 返回上一级画布
    returnLast() {
      graph.exitGroup()
      graph.foldCells(graph.getDefaultParent())
      console.log(graph.getCurrentRoot())
      if (graph.getCurrentRoot() === null) {
        this.ifRoot = true
      }
    },
    handlePath () {
      graph.selectAll()
      var cells = graph.getSelectionCells()
      for (var i = 0; i < cells.length; ++i) {
        if (cells[i].isVertex()) {
          this.allNodes.push(cells[i])
        }
      }
      this.findPathFormVisible = true
      graph.clearSelection()
    },
    // 最短路径
    shortPath (startName) {
      graph.selectAll()
      var cells = graph.getSelectionCells()
      var vertexList = []
      var edgeList = []
      var id = 0
      var disList = new Map()
      var idName = new Map()
      var visit = new Map()
      for (var i = 0; i < cells.length; ++i) {
        if (cells[i].isVertex()) {
          vertexList.push(cells[i].id)
          disList.set(cells[i].id, Number.MAX_VALUE)
          visit.set(cells[i].id, 0)
          idName.set(cells[i].id, cells[i].value.attributes[0].value)
          if (cells[i].value.attributes[0].value == startName) id = cells[i].id;
        }
        else {
          var pair = {}
          pair.source = cells[i].source.id
          pair.target = cells[i].target.id
          pair.value = cells[i].value.attributes[1].nodeValue
          edgeList.push(pair)
        }
      }
      //以第一个元件为起点
      disList.set(id, 0)
      var min,minVertex
      for (var i = 0; i < vertexList.length; ++i) {
        min = Number.MAX_VALUE
        for (var j = 0; j < vertexList.length; ++j) {
          if (visit.get(vertexList[j]) == 0 && disList.get(vertexList[j]) < min) {
            min = disList.get(vertexList[j])
            minVertex = vertexList[j]
          }
        }
        visit.set(minVertex,1)
        for(var index in edgeList) { //寻找此时最短路径的点可到的点 并更新该点的最短路径
          if (edgeList[index].source == minVertex) {
            var target = edgeList[index].target
            var value = parseFloat(edgeList[index].value)
            if (visit.get(target) == 0 && disList.get(target) > disList.get(minVertex) + value) {
              disList.set(target, disList.get(minVertex) + value)
            }
          }
        }
      }
      var tmpList = []
      this.findPathFormVisible = false
      this.pathFormVisible = true
      disList.forEach(function(value,key){
        var pair = {}
        pair.key = idName.get(key)
        if(value == Number.MAX_VALUE)pair.value = "不可达"
        else pair.value = value
        tmpList.push(pair)
      });
      this.tablePathForm = tmpList
      this.totalCount = tmpList.length
      graph.clearSelection()
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
    // 旋转
    mxVertexHandler.prototype.rotationEnabled = true

    doc = mxUtils.createXmlDocument()
    var _this = this

    tbContainer = document.getElementById('tbContainer')
    container = document.getElementById('container')
    headContainer = document.getElementById('headContainer')
    rightContainer = document.getElementById('rightContainer')
    var cellInfo = document.createElement('div')
    cellInfo.id = 'cellInfo'
    rightContainer.appendChild(cellInfo)

    model = new mxGraphModel()
    graph = new mxGraph(container, model)
    // 设置节点间可以连接
    graph.setConnectable(true)
    // 在container中禁用浏览器右键菜单，用于编写自定义菜单
    mxEvent.disableContextMenu(container)
    // 允许两个节点间出现双向连接
    graph.setMultigraph(true)
    //连接点允许误差
    graph.setTolerance(10)
    // 从中心/左上缩放
    graph.centerZoom = true
    // 自定义菜单
    graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
      return createPopupMenu(graph, menu, cell, evt)
    }
    // 按键响应
    const keyHandler = new mxKeyHandler(graph)
    // 按delete键删除元素
    keyHandler.bindKey(46, function (evt) {
        graph.removeCells()
    })
    // 应用自定义规则
    judgeConnection(graph)
    // 设置连接线为折线
    graph.connectionHandler.createEdgeState = function (me) {
      var edge = graph.createEdge(
        null,
        null,
        null,
        null,
        null,
        'edgeStyle=orthogonalEdgeStyle'
      )
      return new mxCellState(
        this.graph.view,
        edge,
        this.graph.getCellStyle(edge)
      )
    }
    // 设置边缘连接
    graph.getAllConnectionConstraints = function (terminal) {
      // if (terminal != null && this.model.isVertex(terminal.cell)) {
      //   return [
      //     //new mxConnectionConstraint(new mxPoint(0, 0), true),
      //     //new mxConnectionConstraint(new mxPoint(0.5, 0), true),
      //     //new mxConnectionConstraint(new mxPoint(1, 0), true),
      //     new mxConnectionConstraint(new mxPoint(0, 0.5), true),
      //     new mxConnectionConstraint(new mxPoint(1, 0.5), true),
      //     //new mxConnectionConstraint(new mxPoint(0, 1), true),
      //     //new mxConnectionConstraint(new mxPoint(0.5, 1), true),
      //     //new mxConnectionConstraint(new mxPoint(1, 1), true)
      //   ];
      // }
      if (terminal !== null && this.model.isVertex(terminal.cell)) {
        const cell = terminal.cell
        const constraints = cell.constraints

        if (constraints instanceof Array && constraints.length > 0) {
          return constraints.map((constraint) => {
            return new mxConnectionConstraint(
              new mxPoint(constraint.x, constraint.y),
              constraint.perimeter
            )
          })
        }
        // else {
        //   if (terminal.shape.stencil) {
        //     return terminal.shape.stencil.constraints
        //   } else if (terminal.shape.constraints) {
        //     return terminal.shape.constraints
        //   }
        // }
      }
      return null
    }
    // 修正
    mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
      return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point)
    }
    // 设置只有连接点可以连接
    if (graph.connectionHandler.connectImage == null) {
      graph.connectionHandler.isConnectableCell = function (cell) {
        return false
      }
      mxEdgeHandler.prototype.isConnectableCell = function (cell) {
        return graph.connectionHandler.isConnectableCell(cell)
      }
    }
    // 右键可以移动选中节点
    graph.setPanning(true)
    // 显示导航线（用于对齐）
    mxGraphHandler.prototype.guidesEnabled = true
    // 不允许没有连接元件的线存在
    graph.setAllowDanglingEdges(false)
    // 允许左键框选多个节点移动
    new mxRubberband(graph)
    // 折叠监听函数
    var foldingHandler = function (sender, evt) {
      var cells = evt.getProperty('cells')
      for (var i = 0; i < cells.length; i++) {
        var geo = graph.model.getGeometry(cells[i])
        geo.width = 64
        geo.height = 64
      }
    }
    graph.addListener(mxEvent.FOLD_CELLS, foldingHandler)
    // 点击时直接点到底层元素
    const getInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
    mxGraphHandler.prototype.getInitialCellForEvent = function (me) {
      child = me.getCell()
      return getInitialCellForEvent.apply(this, arguments)
    }
    const selectCellForEvent = mxGraph.prototype.selectCellForEvent;
    mxGraph.prototype.selectCellForEvent = function (cell) {
      cell = child
      selectCellForEvent.call(this, cell)
      return
    }
    // 元件重命名重写
    graph.convertValueToString = function (cell) {
      if (cell.isVertex()) {
        return cell.getAttribute('名称')
      } else {
        if (cell.value != null) {
          return cell.value.nodeName
        }
      }
    }
    graph.cellLabelChanged = function (cell, newValue, autoSize) {
      if (cell.isVertex()) {
        cell.value.setAttribute('名称', newValue)
        graph.refresh(cell)
      } else {
        if (cell.value != null) {
          var newType = doc.createElement(newValue)
          for (var i = 0; i < cell.value.attributes.length; ++i) {
            newType.setAttribute(cell.value.attributes[i].nodeName, cell.value.attributes[i].nodeValue)
          }
          cell.value = newType
          graph.refresh(cell)
        }
      }
    }
    // 撤销重做
    undoManager = new mxUndoManager()
    var listener = function (sender, evt) {
      undoManager.undoableEditHappened(evt.getProperty('edit'))
    }
    graph.getModel().addListener(mxEvent.UNDO, listener)
    graph.getView().addListener(mxEvent.UNDO, listener)
    getElements(graph)
    // 从浏览器外拖拽至graph内生成节点的监听函数
    mxEvent.addListener(container, 'dragover', function (evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation()
        evt.preventDefault()
      }
    })
    mxEvent.addListener(container, 'drop', function (evt) {
      if (graph.isEnabled()) {
        evt.stopPropagation()
        evt.preventDefault()

        // 取得落点坐标
        var pt = mxUtils.convertPoint(
          graph.container,
          mxEvent.getClientX(evt),
          mxEvent.getClientY(evt)
        )
        var tr = graph.view.translate
        var scale = graph.view.scale
        var x = pt.x / scale - tr.x
        var y = pt.y / scale - tr.y

        // 因为弹框限制，一次只能处理一个元件
        var filesArray = event.dataTransfer.files
        curFile = filesArray[0]
        curX = x
        curY = y
        _this.dialogFormVisible = true
        document.getElementById('addAttr').click()
        document.getElementById('addConnection').click()
      }
    })
    // 添加监听函数
    graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {
      selectionChanged(graph)
    })
    getModel(graph);
    // 连线时强制弹框填写参数
    var cellsAdded = graph.cellsAdded
    graph.cellsAdded = function(cells, parent, index, source, target, absolute, constrain, extend) {
      if(cells[0].isVertex() === false) {
        _this.editForm.eid = ''
        _this.editForm.diameter = 0
        _this.editForm.length = 0
        _this.editForm.roughness = 0
        _this.editFormVisible = true
      }
        cellsAdded.apply(this,arguments)
    }


    // 自定义规则
    function judgeConnection (graph) {
      // graph.multiplicities.push(new mxMultiplicity(
      //   true, '分输站', null, null, 0, 0, null,
      //   '分输站不允许连接到其他元件！',
      //   '分输站不允许连接到其他元件！', true))
      // graph.multiplicities.push(new mxMultiplicity(
      //   true, '离心压缩机', null, null, 1, 2, ['油库'],
      //   '离心压缩机必须指向1或2个油库！',
      //   '离心压缩机必须指向油库！', true))
      // graph.multiplicities.push(new mxMultiplicity(
      //   false, '站场', null, null, 1, 1, ['油库'],
      //   '站场只能有一个来源元件！',
      //   '站场不能被油库指向！', false))
    }

    // 创建自定义菜单（删除,全选）
    function createPopupMenu (graph, menu, cell, evt) {
      if (cell != null) {
        menu.addItem('删除', null, function () {
          graph.removeCells()
        })
        if(!cell.isVertex()) {
          menu.addItem('属性', null, function () {
            var cell2 = graph.getSelectionCell()
            if (cell2.value == null) {
              _this.editForm.eid = ''
              _this.editForm.diameter = 0
              _this.editForm.length = 0
              _this.editForm.roughness = 0
            } else {
              _this.editForm.eid = cell2.value.nodeName
              _this.editForm.diameter = cell2.value.attributes[0].nodeValue
              _this.editForm.length = cell2.value.attributes[1].nodeValue
              _this.editForm.roughness = cell2.value.attributes[2].nodeValue
            }
            _this.editFormVisible = true
          })
        }
        if (cell.value.nodeName === '站场') {
          menu.addItem('进入', null, function () {
            graph.enterGroup(cell)
            _this.ifRoot = false
          })
        }
        // menu.addItem("旋转", null, function () {
        //   graph.rotate90();
        // });
      } else {
        menu.addItem('全选', null, function () {
          graph.selectAll()
        })
      }
    }

    // 请求所有elements
    function getElements (graph) {
      _this.$axios
        .get('/getElements')
        .then(function (response) {
          if (response.status === 200) {
            elementInfo = response.data.data
            var basePath = 'http://localhost:8081'
            for (var index in elementInfo) {
              curElement = elementInfo[index]
              var image = document.createElement('img')
              image.id = curElement.id
              image.src = basePath + curElement.path
              if (image.height > 110) {
                image.style = 'height: 50px;'
              }
              else {
                image.style = 'width: 100px;'
              }
              // image.style = 'transform:scale(0.5);'
              var center = document.createElement('center')
              center.appendChild(image)
              tbContainer.appendChild(center)
              var type = createElement(curElement.name)
              getAttributes(graph, curElement.id, type)
              getConnections(graph, curElement, type)
              customFunct(graph, image, type, curElement.id)
              elementNameCountList[curElement.id] = 1
            }
          } else {
            _this.$message('获取管道元件信息错误，请重试！')
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.$message('获取管道元件信息错误，请重试！')
        })
    }

    // 获取模型文件
    function getModel (graph) {
      if (_this.projectId === '') {
        _this.$message('未指定项目，请选择项目后再刷新！')
        return
      }
      _this.$axios
        .post('/model/' + _this.projectId)
        .then(function (response) {
          if (response.status === 200) {
            var model = mxUtils.parseXml(response.data.data["model"])
            var dec = new mxCodec(model)
            dec.decode(model.documentElement, graph.getModel())
            // graph.selectAll()
            // var cells = graph.getSelectionCells()
            // var list = []
            // for (var index in cells) {
            //   if (cells[index].value.nodeName === '站场') {
            //     list.push(cells[index])
            //   }
            // }
            // graph.foldCells(list)
            // graph.clearSelection()
            _this.$message('模型加载完成！')
          } else {
            _this.$message('获取模型文件错误，请重试！')
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.$message('获取模型文件错误，请重试！')
        })
    }

    // 创建节点类型
    function createElement (name) {
      for (var index in elementAttrList) {
        var s = new XMLSerializer()
        if (s.serializeToString(elementAttrList[index]).startsWith('<' + name)) {
          return elementAttrList[index]
        }
      }
      var eletype = doc.createElement(name)
      elementAttrList.push(eletype)
      return eletype
    }

    // 自定义拖拽函数的动作
    function customFunct (graph, image, type, id) {
      var funct = function (graph, evt, cell, x, y) {
        addCell(graph, image, x, y, type, id)
      }
      mxUtils.makeDraggable(image, graph, funct, null)
    }

    // toolbar拖拽添加节点
    function addCell (graph, image, x, y, type, id) {
      console.log(graph.getDefaultParent().id)
      if (graph.getDefaultParent().id !== '1' && type.nodeName === '站场') {
        _this.$message("站场内不能再插入站场！")
        return
      }
      var width = image.naturalWidth / 2
      var height = image.naturalHeight / 2
      var style =
        'shape=image;image=' +
        image.src +
        ';verticalLabelPosition=bottom;verticalAlign=top'
      var constraints = []
      // 自动命名
      var name = ''
      if (elementNameCountList[id] < 10) {
        name = type.nodeName + '0' + elementNameCountList[id]
        elementNameCountList[id]++
      } else {
        name = type.nodeName + elementNameCountList[id]
        elementNameCountList[id]++
      }
      // 根据命名复制类型
      var newType = doc.createElement(type.nodeName)
      newType.setAttribute('名称', name)
      for (var i = 0; i < type.attributes.length; ++i) {
        newType.setAttribute(type.attributes[i].nodeName, type.attributes[i].nodeValue)
      }
      // 添加连接点
      for (var index in elementConnectionsList) {
        if (elementConnectionsList[index].id == id) {
          constraints = elementConnectionsList[index].connections
          break
        }
      }
      var parent = graph.getDefaultParent()
      graph.getModel().beginUpdate()
      try {
        var vertex = graph.insertVertex(parent, null, newType, x, y, width, height, style)
        vertex.constraints = constraints
      } finally {
        graph.getModel().endUpdate()
      }
    }

    // 根据elementID请求attr
    function getAttributes (graph, elementID, type) {
      _this.$axios
        .post('/findAttributeById', {
          element_id: elementID
        })
        .then(function (response) {
          if (response.status === 200) {
            var attributes = response.data.data
              type.setAttribute("压力", attributes["pressure"])
              type.setAttribute("载荷", attributes["loads"])
              type.setAttribute("压力已知", attributes["pressure_state"])
              type.setAttribute("载荷已知", attributes["load_state"])
              type.setAttribute("海拔", attributes["elevation"])
          } else {
            _this.$message('获取' + elementID + '号元件属性错误，请重试！')
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.$message('获取' + elementID + '号元件属性错误，请重试！')
        })
    }

    // 根据elementID请求connection
    function getConnections (graph, curElement, type) {
      var elementID = curElement.id
      _this.$axios
        .post('/findConnectionByEid', {
          element_id: elementID
        })
        .then(function (response) {
          if (response.status === 200) {
            var connections = response.data.data
            var curConnection = {}
            curConnection.id = elementID
            var connect = []
            for (var index in connections) {
              var temp = connections[index]
              var pair = {}
              pair.x = temp.x
              pair.y = temp.y
              pair.perimeter = true
              connect.push(pair)
            }
            curConnection.connections = connect
            elementConnectionsList.push(curConnection)
          } else {
            _this.$message('获取' + elementID + '号元件连接点错误，请重试！')
          }
        })
        .catch(function (error) {
          console.log(error)
          _this.$message('获取' + elementID + '号元件连接点错误，请重试！')
        })
    }

    // 拖拽生成节点，将该图片加入侧边工具栏
    _this.handleDrop = function (graph, file, x, y, type, eid) {
      if (file.type.substring(0, 5) == 'image') {
        // 生成节点
        var reader = new FileReader()
        reader.onload = function (e) {
          var data = e.target.result
          var img = new Image()
          img.onload = function () {
            var w = Math.max(1, img.width / 2)
            var h = Math.max(1, img.height / 2)
            var semi = data.indexOf(';')
            if (semi > 0) {
              data =
                data.substring(0, semi) +
                data.substring(data.indexOf(',', semi + 1))
            }
            var name = ''
            if (elementNameCountList[eid] < 10) {
              name = type.nodeName + '0' + elementNameCountList[eid]
              elementNameCountList[eid]++
            } else {
              name = type.nodeName + elementNameCountList[eid]
              elementNameCountList[eid]++
            }
            var newType = doc.createElement(type.nodeName)
            newType.setAttribute('名称', name)
            for (var i = 0; i < type.attributes.length; ++i) {
              newType.setAttribute(type.attributes[i].nodeName, type.attributes[i].nodeValue)
            }
            var constraints = []
            for (var index in elementConnectionsList) {
              if (elementConnectionsList[index].id == eid) {
                constraints = elementConnectionsList[index].connections
                break
              }
            }
            var parent = graph.getDefaultParent()
            var vertex = graph.insertVertex(parent, null, newType, x, y, w, h,
              'shape=image;image=' + data + ';verticalLabelPosition=bottom;verticalAlign=top'
            )
            vertex.constraints = constraints
          }
          img.src = data
          var item = document.createElement('img')
          item.src = img.src
          item.width = 100
          item.height = 50
          var center = document.createElement('center')
          center.appendChild(item)
          tbContainer.appendChild(center)
          addedCustomFunct(graph, item, type, eid)
        }
        reader.readAsDataURL(file)
      }
    }

    // 新添加图片（data格式）拖拽函数的动作
    function addedCustomFunct (graph, image, type, eid) {
      var funct = function (graph, evt, cell, x, y) {
        addDataCell(graph, image, x, y, type, eid)
      }
      mxUtils.makeDraggable(image, graph, funct, null)
    }

    // toolbar拖拽添加data格式节点
    function addDataCell (graph, image, x, y, type, eid) {
      var data = image.src
      var img = new Image()
      img.onload = function () {
        var w = Math.max(1, img.width / 2)
        var h = Math.max(1, img.height / 2)
        var semi = data.indexOf(';')
        if (semi > 0) {
          data =
            data.substring(0, semi) +
            data.substring(data.indexOf(',', semi + 1))
        }
        var name = ''
        if (elementNameCountList[eid] < 10) {
          name = type.nodeName + '0' + elementNameCountList[eid]
          elementNameCountList[eid]++
        } else {
          name = type.nodeName + elementNameCountList[eid]
          elementNameCountList[eid]++
        }
        var newType = doc.createElement(type.nodeName)
        newType.setAttribute('名称', name)
        for (var i = 0; i < type.attributes.length; ++i) {
          newType.setAttribute(type.attributes[i].nodeName, type.attributes[i].nodeValue)
        }
        var constraints = []
        for (var index in elementConnectionsList) {
          if (elementConnectionsList[index].id == eid) {
            constraints = elementConnectionsList[index].connections
            break
          }
        }
        var parent = graph.getDefaultParent()
        var vertex = graph.insertVertex(parent, null, newType, x, y, w, h,
          'shape=image;image=' + data + ';verticalLabelPosition=bottom;verticalAlign=top'
        )
        vertex.constraints = constraints
      }
      img.src = data
    }

    // 动态新增右侧文本框
    function createTextField (graph, form, cell, attribute) {
      var tr = document.createElement('tr')
      var name = document.createElement('td')
      name.innerText = attribute.nodeName + ':'
      tr.appendChild(name)
      var tdInput = document.createElement('td')
      var input = document.createElement('input')
      input.type = 'text'
      input.style = 'width: 130px;'
      input.value = attribute.nodeValue
      tdInput.appendChild(input)
      tr.appendChild(tdInput)
      var unit = document.createElement('td')
      if(attribute.nodeName === "压力") {
        unit.innerText = "MPa"
      }
      else if(attribute.nodeName === "载荷") {
        unit.innerText = "Sm³/d"
      }
      else if(attribute.nodeName === "海拔" || attribute.nodeName === "内径" ||
              attribute.nodeName === "长度" || attribute.nodeName === "粗糙度") {
        unit.innerText = "m"
      }
      else {
        unit.innerText = ""
      }
      tr.appendChild(unit)
      form.appendChild(tr)
      var applyHandler = function () {
        var newValue = input.value || ''
        var oldValue = cell.getAttribute(attribute.nodeName, '')
        if (newValue !== oldValue) {
          graph.getModel().beginUpdate()
          try {
            cell.setAttribute(attribute.nodeName, newValue)
            graph.refresh()
          } finally {
            graph.getModel().endUpdate()
          }
        }
      }
      mxEvent.addListener(input, 'keypress', function (evt) {
        if (evt.keyCode === /* enter */ 13 && !mxEvent.isShiftDown(evt)) {
          input.blur()
        }
      })

      if (mxClient.IS_IE) {
        mxEvent.addListener(input, 'focusout', applyHandler)
      } else {
        mxEvent.addListener(input, 'blur', applyHandler)
      }
    }

    // 更新rightbar内容
    function selectionChanged (graph) {
      var div = document.getElementById('cellInfo')
      graph.container.focus()
      div.innerHTML = ''
      var cell = graph.getSelectionCell()
      if (cell == null) {
        const center = document.createElement('center')
        mxUtils.writeln(center, '未选中元件！')
        div.appendChild(center)
      } else if (cell.value == null) {
        const center = document.createElement('center')
        mxUtils.writeln(center, '未命名')
        div.appendChild(center)
      } else {
        var center = document.createElement('center')
        mxUtils.writeln(center, cell.value.nodeName)
        var table = document.createElement('table')
        var form = document.createElement('tbody')
        var attrs = cell.value.attributes
        for (var i = 0; i < attrs.length; i++) {
          createTextField(graph, form, cell, attrs[i])
        }
        var br = document.createElement('br')
        center.appendChild(br)
        table.appendChild(form)
        center.appendChild(table)
        div.appendChild(center)
      }
    }
  }
}
</script>

<style scoped>
#graph {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.main-div {
  height: 100%;
  width: 100%;
}

.head-container {
  overflow: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 70px;
  background-color: #f2f6fc;
}

.left-container {
  overflow: auto;
  position: absolute;
  background-color: #f2f6fc;
  left: 0;
  top: 40px;
  bottom: 10px;
  width: 120px;
}

.main-container {
  overflow: auto;
  position: absolute;
  top: 70px;
  left: 120px;
  right: 300px;
  bottom: 10px;
  border: thin solid #2e2d3c;
  background-image: url("../../assets/bg.svg");
}

.right-container {
  overflow: auto;
  position: absolute;
  background-color: #f2f6fc;
  width: 300px;
  right: 0;
  bottom: 10px;
  top: 40px;
}
</style>
