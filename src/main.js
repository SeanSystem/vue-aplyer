import Vue from 'vue'
import App from './App.vue'
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
