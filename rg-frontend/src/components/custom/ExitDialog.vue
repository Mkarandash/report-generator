<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <material-card
      :color="color"
      full-width
      title="Confirm logout"
      text="All session data will be lost">
      <v-layout
        row
        wrap>
        <v-spacer/>
        <v-btn
          :color="color"
          @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          :color="color"
          @click="logout">
          Confirm
        </v-btn>
        <v-spacer/>
      </v-layout>
    </material-card>
  </v-dialog>
</template>

<script>
import { event, axios } from '@/main'
import { mapState } from 'vuex'
import Card from '@/components/material/Card'

export default {
  components: {
    'material-card': Card
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState(['color'])
  },
  created () {
    event.$on('exit', (state) => {
      this.dialog = state
    })
  },
  methods: {
    logout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      this.$store.commit('logout')
      delete axios.defaults.headers.common['x-access-token']
      this.dialog = false
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card.v-sheet.theme--light.elevation-2{
  margin-top: 24px !important;
  margin-bottom: 0px !important;
}
</style>
