import Vue from "vue";
import store from "../store/index.js";
// 自定义指令
Vue.directive("btnPerm",{
    // 父级未渲染
    bind:function(el, bingind, vnode){
        console.log(el);
        console.log(bingind);
        console.log(vnode);
        // el 绑定的对象 DOM，原生JS处理
        // 操作DOM
        if(bingind.def.hasBtnPerm(bingind.value)) {
            el.className = el.className + " show-button";
        }
    },
    // 操作父节点
    inserted:function(el){
        console.log(el);
    },
    update:function(){},
    componentUpdated:function(){},
    unbind:function(){},
    hasBtnPerm:function(permission){
        const button = store.getters["app/buttonPermisson"]; // 请求到的数据权限
        const roles = store.getters["app/roles"]; // 获取角色 
        // 如果是超级管理员
        if(roles.includes("admin")) { return true; }
        return button.indexOf(permission) != -1; //i
    }
});
// 操作dom元素（类似原生js）   vue里面时操作数据驱动   使用v-btnPer
// Vue.directive("btnPer",{
//     // 只调用一次，指令第一次绑定到元素时候调用，可以定义一个绑定时执行一次的初始化动作
//     bind:function (el, bingind, vnode) {},
//     // 被绑定的元素插入父节点的时候调用
//     inserted: function () {},
//     // 被绑定与元素所在模板更新时调用
//     update: function () {},
//     // 被绑定的元素所在模板完成一次更新更新周期的时候调用
//     componentUpdated: function() {},
//     // 只会调用一一次就是在元素解绑的时候调用
//     unbind: function() {},
//     // 可以定义一些自己的方法
// })
