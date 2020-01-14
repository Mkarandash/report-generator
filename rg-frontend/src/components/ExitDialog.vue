<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <v-card>
      <v-card-title class="justify-center">Are you sure you want to leave?</v-card-title>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          @click="logout">
          Confirm
        </v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { event } from '@/main'

export default {
  data () {
    return {
      dialog: false
    }
  },
  created () {
    event.$on('exit', () => {
      this.dialog = true
    })
  },
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.$store.commit('removeValues')
      this.dialog = false
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
