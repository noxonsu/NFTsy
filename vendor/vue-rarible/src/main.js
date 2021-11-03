window.axios = require('axios');
import Vue from 'vue'
import App from './App.vue'
import store from './store';
window.vueGoogleMap = false

if(document.getElementById('v-app')) {
   // alert(2)
    Vue.prototype.API_URL = '/' //go_obj.site_url;
    new Vue({
        el: '#v-app',
      //  render: h => h(App),
        components: {
            App
        },
        store
    });
}
