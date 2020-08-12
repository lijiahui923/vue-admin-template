import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken, removeUserName } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// 路由手卫
/**只要路由发生改变就会进入beforeEach
 * to进入的页面
 * from离开的页面
 * next();是空的时候就是直接执行了to这个操作
 */
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {// 判断是否有token
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      removeToken();
      removeUserName();
      store.commit("user/SET_TOKEN", '');
      store.commit("user/SET_NAME", '');
      next({ path: '/' });
      NProgress.done();
    } else {
      // const hasGetUserInfo = store.getters.name;
      // if (hasGetUserInfo) {// 判断当前用户是否已拉取完user_info信息
      //   next()
      // } else {
        // try {
          // 获取用户的色
          // 动态分配路由权限
          /**
           * 1、什么时候处理动态路由
           * 2、以什么条件处理
           * roles[]
           */
          // get user info
          // await store.dispatch('user/getInfo') // 拉取info
          // 获取用户的信息例如角色什么的
          // store.dispatch('user/getInfo').then(res => { // 拉取user_info
          //   const roles = res.roles
          //    store.dispatch("GetMenu").then(data => {
          //      initMenu(router, data);
          //    });
          // next()
          if(store.getters.roles.length === 0) {
            store.dispatch('permission/GetRoles').then(response => {
                let role = response.role;
                // let button = response.button;
                let btnPerm = response.btnPerm;
                store.commit("user/SET_ROLES", role);
                store.commit("user/SET_BUTTON", btnPerm);
                // 存储角色 
                store.dispatch('permission/createRouter', role).then( _ => {
                  let addRouters = store.getters.addRouters;
                  let allRouters = store.getters.allRouters;
                  // console.log(addRouters);
                    // 路由更新
                    router.options.routes = allRouters;
                    // 添加动态路由
                    router.addRoutes(addRouters)
                    next({ ...to, replace: true});
                })
            });
          }else{
              next();
          }
        // } catch (error) {
        //   // remove token and go to login page to re-login
        //   await store.dispatch('user/resetToken')
        //   Message.error(error || 'Has Error')
        //   next(`/login?redirect=${to.path}`)
        //   NProgress.done()
        // }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)  // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
