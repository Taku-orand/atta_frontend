import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

export default ({app}) =>{
  Vue.use(VueGoogleMaps, {
    load: {
      key: app.$config.VUE_APP_GOOGLE_API_KEY,
      libraries: 'places',
    },
  })
}