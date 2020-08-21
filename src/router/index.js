import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import ProjectList from '../components/list/ProjectList.vue'
import EditProject from '../components/edit/EditProject'
import Error from '../components/system/Error'
import Wait from '../components/system/Wait'
import welcome from '../components/system/Welcome'
import NewProject from '../components/new/NewProject'
import NewGas from '../components/new/NewGas'
import GasList from '../components/list/GasList'
import EditGas from '../components/edit/EditGas'
import Result from '../components/results/Result'
import ElementList from '../components/list/ElementList'
import AttributeList from '../components/list/AttributeList'
import ConnectionList from '../components/list/ConnectionList'

Vue.use(Router)

// 处理重复路径
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        // 系统页
        { path: '/welcome', component: welcome },
        { path: '/error', component: Error },
        // 列表页
        { path: '/projectList', component: ProjectList },
        { path: '/gasList', component: GasList },
        { path: '/ejectorList', component: Wait },
        { path: '/elementList', component: ElementList },
        { path: '/attributeList', component: AttributeList },
        { path: '/connectionList', component: ConnectionList },
        // 编辑页
        { path: '/editGas', component: EditGas },
        { path: '/editProject', component: EditProject },
        // 新建页
        { path: '/newProject', component: NewProject },
        { path: '/newGas', component: NewGas },
        // 结果页
        { path: '/run', component: Wait },
        { path: '/results', component: Wait },
        { path: '/result', component: Result }
      ]
    }
  ]
})

// 挂载导航卫士
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const userFlag = window.sessionStorage.getItem('user')

  if (!userFlag) return next('/login')

  next()
})

export default router
