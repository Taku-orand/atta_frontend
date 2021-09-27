<template>
  <v-container>
    <!-- アイテム情報 -->
    <v-row class="justify-center">
      <v-col>
        <div @click="doEdit">
          名前:
          <div v-if="!edit" @click="doEdit" v-text="item.name"></div>
          <v-text-field v-if="edit" v-model="tempName" type="text" outlined />
          内容:
          <div v-if="!edit" @click="doEdit" v-html="item.content"></div>
          <v-textarea
            v-if="edit"
            v-model="tempContent"
            type="text"
            auto-grow
            clearable
            rows="2"
            outlined
          />
        </div>
        <div v-if="!edit">
          <v-btn small class="error" @click="deleteItem">削除</v-btn>
        </div>
        <div v-if="edit">
          <v-row class="justify-end">
            <v-col>
              <v-btn small @click="updateItem">保存</v-btn>
              <v-btn small @click="doneEdit">キャンセル</v-btn>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!-- QRコード生成ボタン -->
    <v-row class="justify-end">
      <v-col>
        <v-text-field v-model="wid" label="サイズ" height="17"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="qrCodeUpdateConfirm">
          QRCodeを
          <span v-if="!item.qr_code">作成</span>
          <span v-else>アップデート</span>
        </v-btn>
        <v-dialog v-model="qrCodeUpdateDialog" max-width="800px">
            <v-card>
              <v-card-title class="text-h5"
                >QRコードが書き変わります。よろしいですか？</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="qrCodeUpdateDialog = false"
                  >キャンセル</v-btn
                >
                <v-btn color="blue darken-1" text @click="createQRCode(wid)"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </v-col>
    </v-row>

    <!-- QRCODE -->
    <v-row class="justify-center">
      <div v-if="item.qr_code">
        <img :src="item.qr_code" />
      </div>
    </v-row>

    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="lostItemInfomationsTemp"
      class="elevation-3"
      disable-sort
      mobile-breakpoint="100"
      :items-per-page="4"
      no-data-text="記録はまだありません"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>落とし物記録</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="lostItemInfoDialogDelete" max-width="800px">
            <v-card>
              <v-card-title class="text-h5"
                >記録が削除されます。よろしいですか？</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >キャンセル</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >削除</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small @click="deleteLostItemInfomation(item)">
          mdi-delete
        </v-icon>
      </template>
      <template #[`item.created_at`]="{ item }">
        {{ item.created_at.slice(0, 4) }}/{{ item.created_at.slice(5, 7) }}/{{
          item.created_at.slice(8, 10)
        }}
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
import QRCode from 'qrcode'

export default {
  data() {
    return {
      qrCode: '',
      isCreated: false,
      wid: 100,
      edit: false,
      tempName: '',
      tempContent: '',
      headers: [
        { text: '日付', value: 'created_at', width: '0%' },
        { text: '削除', value: 'actions', width: '5%' },
        { text: '落とした場所', value: 'found_location', width: '10%' },
        { text: '詳細な場所', value: 'item_destination_details', width: '10%' },
      ],
      dialog: false,
      lostItemInfoDialogDelete: false,
      infoId: 999999,
      lostItemInfomationsTemp: [],
      qrCodeUpdateDialog: false
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('user/getUser')
    await store.dispatch('item/getItem', params.id)
    await store.dispatch(
      'lost_item_infomation/getLostItemInfomations',
      params.id
    )
  },
  computed: {
    item() {
      return this.$store.getters['item/itemGetter']
    },
  },

  mounted() {
    this.$store.commit('isLoggedIn')
    this.lostItemInfomationsTemp =
      this.$store.getters['lost_item_infomation/lostItemInfomationsGetter']
  },

  methods: {
    doEdit() {
      this.tempName = this.item.name
      this.tempContent = this.item.content
      this.edit = true
    },
    closeDelete() {
      this.infoId = 999999
      this.lostItemInfoDialogDelete = false
    },
    deleteItemConfirm() {
      this.$store.dispatch(
        'lost_item_infomation/deleteLostItemInfomation',
        this.infoId
      )
      this.$store.dispatch('lost_item_infomation/getLostItemInfomations')
      this.lostItemInfomationsTemp.some((v, i) => {
        if (v.id === this.infoId) this.lostItemInfomationsTemp.splice(i, 1)
        return null
      })
      this.closeDelete()
    },
    deleteLostItemInfomation(info) {
      this.infoId = info.id
      this.lostItemInfoDialogDelete = true
    },
    deleteItem() {
      this.$store.dispatch('item/deleteItem', this.$route.params.id)
      this.$router.push('/items')
    },
    async updateItem() {
      await this.$store.dispatch('item/updateItem', {
        itemId: this.$route.params.id,
        item: { name: this.tempName, content: this.tempContent },
      })
      this.doneEdit()
    },
    editItem() {
      this.tempName = this.item.name
      this.tempContent = this.item.content
      this.edit = true
    },
    doneEdit() {
      this.tempName = ''
      this.tempContent = ''
      this.edit = false
    },
    qrCodeUpdateConfirm(){
      this.qrCodeUpdateDialog = true
    },
    createQRCode(wid) {
      QRCode.toDataURL(
        process.env.VUE_APP_ATTA_FRONTEND +
          `/lost-items/${this.$route.params.id}/${this._uid}`,
        { width: wid }
      )
        .then(async (qrCode) => {
          // QRcodeをimgタグのsrcに入れる
          this.qrCode = qrCode
          await this.$store.dispatch('item/updateItem', {
            itemId: this.$route.params.id,
            item: {
              qr_code: this.qrCode,
              verification_id: this._uid,
            },
          })
          await this.$store.dispatch('item/getItem', this.$route.params.id)
          this.qrCodeUpdateDialog = false
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
