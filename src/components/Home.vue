<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="6" class="logo">
          <img src="../assets/cup.png" alt="#" class="logo">
        </el-col>
        <el-col :span="4" :offset="14">
          <el-menu mode="horizontal" class="user-nav">
            <el-submenu index="1">
              <template slot="title">{{ user.username }}</template>
              <el-menu-item index="1-1">设置</el-menu-item>
            </el-submenu>
            <el-menu-item @click="logout">退出</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <aside class="aside">
        <el-radio-group v-model="isCollapse">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>

        <!-- 导航菜单 -->
        <el-menu class="el-menu-vertical"
           :router="true"
          :collapse="isCollapse"
          unique-opened
          :default-active=this.$store.state.activePath.path>
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="it.path+''"
              v-for="it in item.submenus"
              :key="it.id"
              @click="savePath(it.path, item.title, it.title)">{{ it.title }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>{{ footer }}</el-footer>
      </el-container>
    </el-container>

  </el-container>

</template>

<script>

export default {

  data () {
    return {
      // 当前用户
      user: {
        username: ''
      },

      // footer
      footer: 'CopyRight © 2020 cup.edu.cn',

      // 左侧导航菜单列表
      menuList: [],

      // 导航菜单折叠状态
      isCollapse: false
    }
  },

  methods: {

    // 解决刷新重置导航菜单
    savePath (path, parent, child) {
      this.$store.commit('changePath', {
        path: path,
        parent: parent,
        child: child
      })
    },

    // 退出登录
    logout () {
      console.log('退出登录')
      window.sessionStorage.clear()
      this.$router.push('/login')
    },

    // 获取登录用户
    getUser () {
      const userEntity = JSON.parse(window.sessionStorage.getItem('user'))
      this.user.username = userEntity.username
    },

    // 获取导航菜单列表
    async getMenuList () {
      const { data: res } = await this.$http.get('/menus')
      if (res.status !== 0) return this.$message.error(res.message)
      this.menuList = res.data
      console.log(this.menuList)
    }
  },

  created () {
    this.getUser()
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}

</script>

<style lang="less" scoped>

.aside {
  align-items: center;
}

.el-container {
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

.el-header {
  /*height: 100%;*/
  border-bottom: solid 1px #DCDFE6;
}

.logo {
  height: 60px;
}

.el-footer {
  text-align: center;
  padding: 20px;
  border-top: solid 1px #DCDFE6;
  border-left: solid 1px #DCDFE6;
}

.el-main {
  border-left: solid 1px #DCDFE6;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-radio-group {
  margin-bottom: 20px;
  margin-top: 10px;
}

.user-nav {
  float: right;
}

.el-menu {
  border: none;
}

</style>
