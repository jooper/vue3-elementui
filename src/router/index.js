import Vue from 'vue'
import store from '@js/store'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
import layout from '@com/layout'

const imp = ((path,url) =>{
    if(url){
        return () =>import('@com/'+path)
    }else{
        return () =>import('@pon/'+path)
    }
})

Vue.use(Router)

const routes = [
    // {path: '/login',name: '登录',component: imp('login',1),meta:{r: true}},
    {path: '/index',name: '觅食',component: imp('views/index'),meta:{r: true}},
    {path: '/share',name: '觅食',component: imp('views/share'),meta:{r: true}},  
    // {path: '/shareFirst',name: '觅食',component: imp('views/shareFirst'),meta:{r: true}},   
    {path: '/dataShare',name: '我的大数据之家',component: imp('views/dataShare'),meta:{r: true}},
    {
        component: layout,
        path: '/home',
        children: [
            {path: '/home',name: '首页',component: imp('home',1)},
            {path: '/table/table1',name: '表格1',component: imp('table/table1')},
            {path: '/table/table2',name: '表格2',component: imp('table/table2')},
            {path: '/form/form1',name: '表单1',component: imp('form/form1')},
            {path: '/form/form2',name: '表单2',component: imp('form/form2')},
            {path: '/grop/grop1',name: '表组1',component: imp('grop/grop1')},
            {path: '/grop/grop2',name: '表组2',component: imp('grop/grop2')}
        ]
    },
    

    {path: '*/', redirect: '/home'}

]

const router = new Router({
    mode: 'history',    
    // base: '/platform',
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    if(!to.meta.r){
        if(store.getters.getInfo){
            next();
        }else{
            next({path: '/dataShare'})  //默认页面
        }
    }else{
        next();
    }
    if(to.name){
        // document.title = to.name + '-' + '传递身边美好的味道！'
    }
})

export default router