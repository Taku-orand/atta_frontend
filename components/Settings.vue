<template>
  <v-form>
    <Notification
      :msg="dlg.msg"
      :is-open="dlg.isOpen"
      :mode="dlg.mode"
    ></Notification>
    <v-container>
      <v-row justify="center">
        <v-dialog v-model="dialog" :persistent="!isValid" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-btn
              id="userInfo"
              color="primary"
              dark
              v-bind="attrs"
              @click="userInfoIsChanged"
              v-on="on"
            >
              <v-icon left> mdi-pencil </v-icon>
              ユーザー設定
            </v-btn>
          </template>
          <ValidationObserver ref="userForm" v-slot="{ invalid }">
            <v-form v-model="isValid" @submit.prevent="submit">
              <v-card>
                <v-card-title>
                  <span class="text-h5">ユーザー情報</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="ユーザーネーム"
                          rules="required"
                        >
                          <v-text-field
                            v-model="userName"
                            :error-messages="errors"
                            label="ユーザーネーム*"
                            hint="落とし物を見つけた方にのみ表示するものです"
                            persistent-hint
                            required
                            hide-details="auto"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Eメール"
                          rules="required|email"
                        >
                          <v-text-field
                            v-model="userEmail"
                            :error-messages="errors"
                            label="Eメール*"
                            hint="落とし物を見つけた際に連絡のために使います"
                            persistent-hint
                            required
                          ></v-text-field>
                        </ValidationProvider>
                        <p v-show="!isValid" @click="setOriginEmail">
                          <span class="blue--text">{{ initial_email }}</span
                          ><v-icon size="1.25rem"
                            >mdi-cursor-default-click-outline</v-icon
                          >
                        </p>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="introduction"
                          label="自己紹介*"
                          hint="特に公開はしません"
                          persistent-hint
                          required
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>* いつでも変更可能です。</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="invalid"
                    color="blue darken-1"
                    text
                    @click="closeDialog"
                  >
                    閉じる
                  </v-btn>
                  <v-btn type="submit" color="blue darken-1" text> 保存 </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </ValidationObserver>
        </v-dialog>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import Notification from './Notification.vue'
export default {
  components: {
    Notification,
  },
  data() {
    return {
      isValid: false,
      dialog: false,
      name: '',
      email: '',
      initial_email: '',
      introduction: '',
      dlg: {
        msg: '',
        isOpen: false,
        mode: '',
        doYes() {
          this.dlg.isOpen = false
        },
        doNo() {
          this.dlg.isOpen = false
        },
      },
    }
  },
  computed: {
    userName: {
      get() {
        return this.name
      },
      set(name) {
        this.name = name
      },
    },
    userEmail: {
      get() {
        return this.email
      },
      set(email) {
        this.email = email
      },
    },
    userIntroduction: {
      get() {
        return this.introduction
      },
      set(introduction) {
        this.introduction = introduction
      },
    },
  },
  methods: {
    setOriginEmail() {
      this.userEmail = this.initial_email
    },
    submit() {
      this.$refs.userForm.validate().then(async (success) => {
        if (!success) {
          return null
        }
        const Response = await this.$store.dispatch('saveUserInfo', {
          user: {
            name: this.name,
            introduction: this.introduction,
            email: this.email,
            initial: false,
          },
        })
        if (Response.updated) {
          this.dlg.msg = '設定が完了しました.'
          this.dlg.mode = 'success'
          this.dlg.isOpen = true
          await this.$store.dispatch('user/getUser')
          this.closeDialog()
        } else {
          this.dlg.msg = '保存に失敗しました. もう一度お試しください.'
          this.dlg.mode = 'error'
          this.dlg.isOpen = true
          this.dlg.mode = 'error'
        }
        setTimeout(() => {
          this.dlg.isOpen = false
        }, 800)
      })
    },
    async userInfoIsChanged() {
      const User = await this.$store.getters['user/userGetter']
      const LocalStorageUser = await JSON.parse(localStorage.getItem('user'))

      if (User.name) {
        this.name = User.name
      } else if (LocalStorageUser.given_name) {
        this.name = LocalStorageUser.given_name
      }

      if (User.email) {
        this.email = User.email
      } else if (LocalStorageUser.email) {
        this.email = LocalStorageUser.email
      }
      this.initial_email = this.email

      if (User.introduction) {
        this.introduction = User.introduction
      }
    },
    closeDialog() {
      this.dialog = false
    },
  },
}
</script>
