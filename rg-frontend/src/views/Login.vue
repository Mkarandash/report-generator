<template>
  <v-container
    fluid
    fill-height>
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs10
        sm6
        md4
        lg4>
        <material-card
          :color="color"
          title="Login"
          icon="mdi-account"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.name"
                    class="purple-input"
                    label="User Name"/>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.password"
                    label="Password"
                    type="password"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-layout
                    row
                    wrap
                  >
                    <v-btn
                      :color="color"
                      class="mx-0 font-weight-light"
                      @click="openRegisterComponent"
                    >
                      Don't have an account?
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                      :color="color"
                      class="mx-0 font-weight-light"
                      @click="login"
                    >
                      Login
                    </v-btn>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from '@/components/material/Card'
import { mapState } from 'vuex'
import { event } from '@/main'

export default {
  components: {
    'material-card': Card
  },
  data: () => ({
    user: {
      name: '',
      password: ''
    },
    loading: false
  }),
  computed: {
    ...mapState(['color'])
  },
  methods: {
    login: function () {
      let name = this.user.name
      let password = this.user.password
      if (!name || !password) {
        event.$emit('notification', {
          color: 'error',
          text: 'Please fill all fields first'
        })
        return
      }
      this.$store.dispatch('login', this.user)
        .then(() => {
          this.$router.push('/search/projects')
          this.$router.go()
        })
        .catch(err => event.$emit('notification', {
          color: 'error',
          text: err.message
        }))
    },
    openRegisterComponent: function () {
      this.$router.push('/register')
    }
  }
}
</script>
