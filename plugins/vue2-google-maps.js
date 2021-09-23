import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBXCM7ykgOWUPxDj29CVftzir5yC_sAQyQ',
    libraries: 'places',
  },
})
