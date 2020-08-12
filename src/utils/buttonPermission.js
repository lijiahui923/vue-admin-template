import store from "../store/index";
export function buttonPermission(permission){
    const button = store.getters["app/buttonPermission"];
    return button.indexOf(permission) != -1; //
}
// 2.0
// 第一种按钮权限控制
// 定义一个全局方法，配合v-if实现