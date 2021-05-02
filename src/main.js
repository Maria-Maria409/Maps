import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueGeolocation);
Vue.config.productionTip = false
import * as VueGoogleMaps from 'vue2-google-maps'
import vuetify from './plugins/vuetify';
Vue.use(VueGoogleMaps);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
