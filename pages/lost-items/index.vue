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
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="foundLocation"
            label="見つけた場所"
            class="centered-input"
            :hide-details="true"
            placeholder="渋谷のマクドナルド..."
          />
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-text-field
            v-model="itemDestination"
            label="落とし物の現在地"
            class="centered-input"
            :hide-details="true"
            placeholder="〇〇の交番、見つけた場所にある"
          />
        </v-col>
      </v-row>
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
      <v-row justify="end">
        <v-btn @click="postNotification"
          ><v-icon left>mdi-account-arrow-left</v-icon>持ち主に知らせる!</v-btn
        >
      </v-row>
    </v-form>
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
      marker:{
        title: '忘れ物場所',
        position: { lat: 0, lng: 0 },
      }
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
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    postNotification() {
      this.$store.dispatch('lost_item/postNotification', {
        lostItemData: {
          foundLocation: this.foundLocation,
          itemDestination: this.itemDestination,
          email: this.lost_item.user.email,
          user_name: this.lost_item.user.name,
          item_name: this.lost_item.item.name,
        },
      })
    },
  },
}
</script>
