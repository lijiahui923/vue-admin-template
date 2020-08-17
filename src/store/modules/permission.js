import { defaultRoutesMap, asnycRouterMap } from '@/router/index';
import { GetUserRoles } from '@/api/user';
// 判断是否有权限访问该菜单
function hasPermission (roles, router) {
    if (router.meta && router.meta.role) {
        return roles.some(item => router.meta.role.indexOf(item) >= 0);
    }
}

const state = {
    allRouters: defaultRoutesMap,
    addRouters: []
};

const mutations = {
    SET_ROUTER(state, router) {
        state.addRouters = router;
        console.log(state.addRouters);
        state.allRouters = defaultRoutesMap.concat(router);
    }
};

const actions = {
    // 获取用户的角色
    GetRoles ({commit}, repusetData) {
        return new Promise((resolve, reject) => {
            GetUserRoles().then((response) => {
                let data = response.data;
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    // 创建动态路由
    createRouter({ commit }, data){
        return new Promise((resolve) => {
            let role = data;
            // 超管的状态
            let addRouters = [];
            if(role.includes('admin')) {
                addRouters = asnycRouterMap;
            }else{ // 普通管理员 
                addRouters = asnycRouterMap.filter(item => {
                    if(hasPremission(role, item)) {
                        // 优先判断 
                        if(item.children && item.children.length > 0) {
                            item.children = item.children.filter(child => {
                                if(hasPremission(role, child)){
                                    return child;
                                }
                            });
                            return item;
                        }
                        return item;
                    }
                });
                addRouters.push(asnycRouterMap[asnycRouterMap.length - 1]);
            }
            // 更新路由
            commit('SET_ROUTER', addRouters);
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
