<template>
  <v-form>
    <v-container>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          :persistent="!isValid || loading"
          max-width="600px"
        >
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
          <v-form v-model="isValid">
            <v-card>
              <v-card-title>
                <span class="text-h5">ユーザー情報</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userName"
                        label="ユーザーネーム*"
                        hint="落とし物を見つけた方にのみ表示するものです"
                        persistent-hint
                        required
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="userEmail"
                        label="Eメール*"
                        hint="落とし物を見つけた際に連絡のために使います"
                        persistent-hint
                        required
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                      <p v-show="!isValid">元のEメール: {{ initial_email }}</p>
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
                  :disabled="!isValid || loading"
                  :loading="loading"
                  color="blue darken-1"
                  text
                  @click="closeDialog"
                >
                  閉じる
                </v-btn>
                <v-btn
                  :disabled="!isValid || loading"
                  :loading="loading"
                  color="blue darken-1"
                  text
                  @click="saveSettings"
                >
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      isValid: false,
      loading: false,
      dialog: false,
      name: '',
      email: '',
      initial_email: '',
      introduction: '',
      rules: {
        required: (value) =>
          !!value ||
          '落とし物を見つけた際に連絡のための連絡先となりますのでご入力していただきますようお願いします',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '有効なEメールを入力してください'
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
    async saveSettings() {
      await axios
        .patch(
          'http://localhost:3000/api/v1/users',
          {
            user: {
              name: this.name,
              introduction: this.introduction,
              initial: false,
              email: this.email,
            },
          },
          {
            headers: { Authorization: 'Bearer ' + this.$auth0.getIdToken() },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.updated) {
            console.log('成功')
            this.closeDialog()
            this.$store.dispatch('user/getUser')
          } else {
            console.log('失敗')
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
