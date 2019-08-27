import Vue from 'vue'
import App from './App.vue'
import APlayer from '@moefe/vue-aplayer';
//ajax
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
