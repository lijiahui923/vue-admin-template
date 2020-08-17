import { Login, Logout } from '@/api/user';
import { getToken, setToken, removeToken, setUserName, removeUserName } from '@/utils/auth';
// import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        buttonPermission: []
    };
};
const state = getDefaultState();

const mutations = { // 必须的  同步 没有回调处理事情
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES(state, value){
        state.roles = value;
    },
    SET_BUTTON(state, value){
        state.buttonPermission = value;
    }
};

const actions = { // 可以回调处理事情 
    login({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            Login(repuestData).then( (response) => {
                let data = response.data;
                // 解构的
                commit('SET_TOKEN', data.token);
                commit('SET_NAME',data.username);
                commit('SET_AVATAR','https://yanxuan.nosdn.127.net/889e0eec756ae0c1c4d05074393fcb5d.png');
                setToken(data.token);
                setUserName(data.username);
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    // 退出
    logout({ commit }){
        return new Promise((resolve, reject) => {
            Logout().then(response => {
                removeToken();
                removeUserName();
                commit('SET_TOKEN', '');
                commit('SET_NAME', '');
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    // 获取用户信息
    GetInfo({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const data = response.data;
                if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                    commit('SET_ROLES', data.roles);
                } else {
                    reject('getInfo: roles must be a non-null array !');
                }
                commit('SET_NAME', data.sysUser.username);
                commit('SET_AVATAR', data.sysUser.avatar);
                commit('SET_PERMISSIONS', data.permissions);
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

