import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@js/store'

// 引入样式和公共js
// import '@styl/app.styl'
// import '@js/index.js'

// import './assets/css/bootstrap.min.css'
// import './assets/css/bootstrap-theme.min.css'
// import './assets/css/fontAwesome.css'
// import './assets/css/tooplate-style.css'  

// 按需引入组件
import element from '@js/element'
Vue.use(element)

import ElementUI from 'element-ui';
Vue.use(ElementUI);

// 水波纹
// import waves from '@pon/directive/waves'

// toast提示
import Toast from 'vue2-toast';
import 'vue2-toast/lib/toast.css';
// Vue.use(Toast)
Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '150px'
});

Vue.config.productionTip = false

SandVS = new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
}).$mount('#app')
