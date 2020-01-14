<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs10
        sm6
        md4
        lg4
      >
        <v-card>
          <v-card-title class="justify-center">Sign in</v-card-title>
          <v-form>
            <v-container pa-4>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.name"
                    label="User Name"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right>
                  <v-layout
                    row
                    wrap>
                    <v-spacer />
                    <v-btn
                      color="info"
                      @click="login"
                    >
                      Login
                    </v-btn>
                    <v-spacer />
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'

export default {
  data () {
    return {
      user: {
        name: undefined,
        password: undefined
      },
      loading: false
    }
  },
  methods: {
    login: function () {
      if (!this.user.name || !this.user.password) {
        event.$emit('notification', {
          color: 'error',
          text: 'Please fill all the fields first'
        })
        return
      }
      this.loading = true
      Axios.post('http://localhost:3000/api/users/login', this.user)
        .then((res) => {
          localStorage.setItem('userId', res.data.userId)
          localStorage.setItem('token', res.data.token)
          this.$store.commit('setValues', { token: res.data.token, userId: res.data.userId})
          this.$router.push({ path: '/'})
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
