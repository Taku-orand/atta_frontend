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
    <ValidationObserver ref="lostItemForm">
      <v-form @submit.prevent="submit">
        <v-row row justify-center align-center>
          <v-col cols="12" class="justify-center">
            <v-row>
              <v-col>
                <v-btn v-if="!showMap" @click="showMapAction"
                  ><v-icon left>mdi-account-arrow-left</v-icon>Google
                  Mapを使う</v-btn
                >
                <v-btn v-else-if="showMap" @click="closeMapAction"
                  ><v-icon left>mdi-account-arrow-left</v-icon>Google
                  Mapを使わない</v-btn
                >
              </v-col>
            </v-row>
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
                :hint="foundLocation"
                persistent-hint
                required
                :error-messages="errors"
              />
            </ValidationProvider>
          </v-col>
          <v-row justify="end">
            <v-col cols="6">
              <v-btn @click="inputCurrentAddress"
                ><v-icon left>mdi-account-arrow-left</v-icon
                >現在地から入力</v-btn
              >
            </v-col>
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
        <v-row justify="end">
          <v-btn @click="sameWithCurrentAddress"
            ><v-icon left>mdi-account-arrow-left</v-icon
            >見つけた場所に同じ</v-btn
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
        <div v-if="showMap">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6">
              <v-card>
                <v-card-text>
                  Mapから場所を指定することもできます。<br />
                  クリックorタッチすると指定できます。
                </v-card-text>
                <GmapMap
                  map-type-id="roadmap"
                  :center="maplocation"
                  :zoom="zoom"
                  :style="styleMap"
                  :options="mapOptions"
                  @click="placeMarker($event)"
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
        </div>
        <v-row justify="center">
          <v-col cols="6">
            <v-btn color="primary" type="submit"
              ><v-icon left>mdi-account-arrow-left</v-icon
              >持ち主に知らせる!</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      foundLocation: '',
      itemDestination: '',
      maplocation: { lng: 0, lat: 0 },
      currentLocation: { lng: 0, lat: 0 },
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
      toggle_exclusive: undefined,
      dlg: {
        msg: '',
        isOpen: true,
        mode: '',
      },
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
  mounted() {
    this.$store.commit('setShowUserInfo', false)
  },
  methods: {
    async showMapAction() {
      if (
        // 以前に位置情報を取得したことがあるか
        this.currentLocation.lat !== 0 ||
        this.currentLocation.lng !== 0
      ) {
        // ある
        this.maplocation = this.currentLocation
      } else if (
        // 位置情報があるか
        this.maplocation.lat === 0 ||
        this.maplocation.lng === 0
      ) {
        // ない
        const currentPosTmp = await this.getCurrentPosition()
        const currentPos = {
          lat: currentPosTmp.coords.latitude,
          lng: currentPosTmp.coords.longitude,
        }
        this.maplocation = currentPos
        this.currentLocation = currentPos
      }
      this.showMap = true
    },
    closeMapAction() {
      // バックエンドに送らないようにするために、undefind
      this.maplocation.lat = 0
      this.maplocation.lng = 0
      this.showMap = false
    },
    async inputCurrentAddress() {
      const CurrentPosTmp = await this.getCurrentPosition()
      const CurrentPos = {
        lat: CurrentPosTmp.coords.latitude,
        lng: CurrentPosTmp.coords.longitude,
      }
      const Address = await this.getAddress(CurrentPos)
      this.foundLocation = Address
      this.maplocation = CurrentPos
      this.marker.position = CurrentPos
    },
    async placeMarker(event) {
      if (event) {
        this.maplocation.lat = event.latLng.lat()
        this.maplocation.lng = event.latLng.lng()
      }
      this.foundLocation = await this.getAddress(this.maplocation)
      this.marker.position = this.maplocation
    },
    async getAddress(location) {
      let requestURL =
        'https://maps.googleapis.com/maps/api/geocode/json?language=ja&sensor=false'
      requestURL += '&latlng=' + location.lat + ',' + location.lng
      requestURL += `&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      // + process.env.VUE_APP_GOOGLE_API_KEY
      const Response = await this.$axios.$get(requestURL)
      return Response.results[0].formatted_address
    },
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    sameWithCurrentAddress() {
      this.itemDestination = this.foundLocation
    },
    submit() {
      this.$refs.lostItemForm.validate().then(async (success) => {
        if (!success) {
          return null
        }
        await this.$store.dispatch('lost_item/postNotification', {
          lostItemData: {
            foundLocation: this.foundLocation,
            itemDestination: this.itemDestination,
            itemDestinationDetails: this.itemDestinationDetails,
            mapLocationLat: this.maplocation.lat,
            mapLocationLng: this.maplocation.lng,
            email: this.lost_item.user.email,
            user_name: this.lost_item.user.name,
            item_name: this.lost_item.item.name,
          },
        })
      })
    },
  },
}
</script>
