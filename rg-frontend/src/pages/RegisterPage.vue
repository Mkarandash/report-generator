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
        xs12
        sm8
        md6
        lg4
      >
        <v-card>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-chip
                class="ma-2"
                outlined
                to="/login"
                style="position: absolute; right: 10px; top: 10px; cursor: pointer;"
                v-on="on"
                color="#ffffff"
              >
                <v-icon>mdi-repeat</v-icon>
              </v-chip>
            </template>
            <span>Switch to login form</span>
          </v-tooltip>
          <v-card-title
            class="justify-center white--text"
            style="background-color: #2196f3;"
          >
            Sign up
          </v-card-title>
          <v-form>
            <v-container py-4>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.name"
                    label="User Name"
                    class="pa-3"
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
                    class="pa-3"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.confirmPassword"
                    :loading="loading"
                    label="Confirm password"
                    type="password"
                    class="pa-3"
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-layout
                    row
                    wrap
                  >
                    <v-spacer/>
                    <v-btn
                      color="info"
                      @click="register"
                    >
                      Register
                    </v-btn>
                    <v-spacer/>
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
        password: undefined,
        confirmPassword: undefined
      },
      loading: false
    }
  },
  methods: {
    register: function () {
      if (!this.user.name || !this.user.password || !this.user.confirmPassword) {
        event.$emit('notification', {
          color: 'error',
          text: 'Please fill all the fields first'
        })
        return
      }
      if (this.user.password !== this.user.confirmPassword) {
        event.$emit('notification', {
          color: 'error',
          text: 'Password doesn\'t match'
        })
        return
      }
      this.loading = true
      Axios.post('/users/register', this.user)
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
