// 创建一个vue实例，让兄弟公用同一个事件机制
// 传递数据方，通过一个事件触发bus.$emit('方法名'，传递的数据)
// 接收方，通过mounted() {}触发bus.$on(方法名，function(接收的参数){用该参数的数据接收传递过来的数据})此时函数中的this已经发生了改变了，可以使用就箭头函数
import Vue from 'vue';
export default new Vue;