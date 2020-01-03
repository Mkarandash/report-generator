<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md8
      >
        <material-card
          :color="color"
          title="Edit Profile"
          text="Complete your profile"
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
                    v-model="user.email"
                    label="Email Address"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="user.firstName"
                    label="First Name"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    v-model="user.lastName"
                    label="Last Name"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md12
                >
                  <v-text-field
                    v-model="user.occupation"
                    label="Occupation"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-text-field
                    v-model="user.country"
                    label="Country"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  md6>
                  <v-text-field
                    v-model="user.city"
                    label="City"
                    class="purple-input"/>
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    :color="color"
                    class="mx-0 font-weight-light"
                    @click="updateUser"
                  >
                    Update Profile
                  </v-btn>
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
import { axios, event } from '@/main'

export default {
  components: {
    'material-card': Card
  },
  data: () => ({
    user: {}
  }),
  computed: {
    ...mapState(['color'])
  },
  mounted: function () {
    axios.get('/users/' + localStorage.getItem('id'))
      .then(resp => {
        this.user = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.message
        })
      })
  },
  methods: {
    updateUser: function () {
      axios.put('/users/' + localStorage.getItem('id'), this.user)
        .then(resp => {
          this.user = resp.data
          event.$emit('notification', {
            color: 'success',
            text: 'User has been successfuly updated'
          })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.message
          })
        })
    }
  }
}
</script>
