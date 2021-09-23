<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-subtitle>落とし物詳細情報</v-card-subtitle>
          <v-card-text> 持ち主: {{ lost_item.user.name }} </v-card-text>
          <v-card-text> 落とし物: {{ lost_item.item.name }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-form>
      <v-row row justify-center align-center>
        <v-col cols="12" class="justify-center">
          <ValidationProvider
            v-slot="{ errors }"
            name="見つけた場所"
            rules="required"
          >
            <v-text-field
              v-model="foundLocation"
              label="見つけた場所"
              class="centered-input"
              clearable
              placeholder="渋谷のマクドナルド..."
              autofocus
              :hint="foundLocation"
              persistent-hint
              required
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
        <v-row justify="end">
          <v-btn @click="getCurrentAddress"
            ><v-icon left>mdi-account-arrow-left</v-icon
            >現在地から入力する</v-btn
          >
        </v-row>
        <v-col cols="12" class="justify-center">
          <ValidationProvider
            v-slot="{ errors }"
            name="見つけた場所"
            rules="required"
          >
            <v-text-field
              v-model="itemDestination"
              label="落とし物の現在地"
              class="centered-input"
              clearable
              placeholder="〇〇の交番、見つけた場所にある"
              :hint="itemDestination"
              persistent-hint
              required
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
    <v-row justify="end">
      <v-btn @click="sameWithCurrentAddress"
        ><v-icon left>mdi-account-arrow-left</v-icon>見つけた場所に同じ</v-btn
      >
    </v-row>
    <v-row row justify-center align-center>
      <v-col cols="12" class="d-flex justify-center">
        <v-textarea
          v-model="itemDestinationDetails"
          label="落とし物の詳細位置情報"
          class="centered-input"
          :hide-details="true"
          auto-grow
          clearable
          rows="3"
          outlined
          placeholder="マクドの２階の窓側席... 、〇〇の近くにあるよ"
        />
      </v-col>
    </v-row>
    <v-form v-if="showMap">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <GmapMap
              map-type-id="roadmap"
              :center="maplocation"
              :zoom="zoom"
              :style="styleMap"
              :options="mapOptions"
            >
              <GmapMarker
                :title="marker.title"
                :position="marker.position"
                :clickable="true"
                :draggable="false"
                :icon="marker.pinicon"
              />
            </GmapMap>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <v-row justify="center">
      <v-col cols="6">
        <v-btn color="primary" @click="postNotification"
          ><v-icon left>mdi-account-arrow-left</v-icon>持ち主に知らせる!</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      foundLocation: '',
      itemDestination: '',
      maplocation: { lng: 0, lat: 0 },
      zoom: 15,
      styleMap: {
        width: '100%',
        height: '400px',
      },
      mapOptions: {
        streetViewControl: false,
        styles: [],
      },
      marker: {
        title: '忘れ物場所',
        position: { lat: 0, lng: 0 },
      },
      showMap: false,
      itemDestinationDetails: '',
    }
  },
  async fetch({ store }) {
    const Key = localStorage.getItem('my-key')
    const Item = await JSON.parse(Key)
    await store.dispatch(
      'lost_item/getLostItem',
      Item.lost_item.lostItemData.item.id
    )
  },
  computed: {
    lost_item() {
      return this.$store.getters['lost_item/lostItemDataGetter']
    },
  },
  async mounted() {
    const currentPosTmp = await this.getCurrentPosition()
    const currentPos = {
      lat: currentPosTmp.coords.latitude,
      lng: currentPosTmp.coords.longitude,
    }
    this.marker.position = currentPos
    this.maplocation = currentPos
    this.$store.commit('setShowUserInfo', false)
  },
  methods: {
    async getCurrentAddress() {
      let requestURL =
        'https://maps.googleapis.com/maps/api/geocode/json?language=ja&sensor=false'
      requestURL +=
        '&latlng=' + this.maplocation.lat + ',' + this.maplocation.lng
      requestURL += '&key=AIzaSyBXCM7ykgOWUPxDj29CVftzir5yC_sAQyQ'
      // + process.env.VUE_APP_GOOGLE_API_KEY
      const Response = await this.$axios.$get(requestURL)
      // console.log(Response)
      const FormattedAddress = Response.results[0].formatted_address
      this.foundLocation = FormattedAddress
      this.showMap = true
    },
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    sameWithCurrentAddress() {
      this.itemDestination = this.foundLocation
    },
    postNotification() {
      this.$store.dispatch('lost_item/postNotification', {
        lostItemData: {
          foundLocation: this.foundLocation,
          itemDestination: this.itemDestination,
          itemDestinationDetails: this.itemDestinationDetails,
          email: this.lost_item.user.email,
          user_name: this.lost_item.user.name,
          item_name: this.lost_item.item.name,
        },
      })
    },
  },
}
</script>
