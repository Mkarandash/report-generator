<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <material-card
      :color="color"
      full-width
      title="Please chose what do you want to do"
      text="You can create new project or request an access to existing one">
      <v-layout
        row
        wrap>
        <v-spacer/>
        <v-btn
          :color="color"
          @click="createNewProject">
          Create new
        </v-btn>
        <v-btn
          :color="color"
          @click="addExistingProject">
          Add existing
        </v-btn>
        <v-spacer/>
      </v-layout>
    </material-card>
  </v-dialog>
</template>

<script>
import { event } from '@/main'
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
    event.$on('newProject', (state) => {
      this.dialog = state
    })
  },
  methods: {
    createNewProject: function () {
      this.dialog = false
      this.$router.push('/add/projects/new')
    },
    addExistingProject: function () {
      this.dialog = false
      this.$router.push('/add/projects/find')
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
