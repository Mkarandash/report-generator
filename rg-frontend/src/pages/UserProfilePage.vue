<template>
  <v-card>
    <v-card-title class="justify-center">My profile</v-card-title>
    <v-container grid-list-lg>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.name"
          class="pa-3"
          label="User name"/>
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.email"
          class="pa-3"
          label="Email"/>
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.fitstName"
          class="pa-3"
          label = "First name"
        />
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.lastName"
          class="pa-3"
          label = "Last name"
        />
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.occupation"
          class="pa-3"
          label = "Occupation"
        />
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.country"
          class="pa-3"
          label = "Country"
        />
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="user.city"
          class="pa-3"
          label = "City"
        />
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="updateProfile">Update profile</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
import { event } from '@/main'
import Axios from '@/plugins/axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      user: {
        name: undefined,
        email: undefined,
        fitstName: undefined,
        lastName: undefined,
        occupation: undefined,
        country: undefined,
        city: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    updateProfile () {
      Axios.put('/users/' + this.userId, this.user)
        .then(resp => {
          this.user = resp.data
          event.$emit('notification', {
            color: 'success',
            text: 'User data updated'
          })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
    }
  },
  mounted() {
    Axios.get('/users/' + this.userId)
      .then(resp => {
        this.user = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.response.data
        })
      })
  }
}
</script>