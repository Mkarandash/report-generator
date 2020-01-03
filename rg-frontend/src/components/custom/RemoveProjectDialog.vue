<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <material-card
      :color="color"
      full-width
      title="Delete project"
      text="Are you sure you want to delete this project?">
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
          @click="removeProject">
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
      dialog: false,
      projectId: undefined
    }
  },
  computed: {
    ...mapState(['color'])
  },
  created () {
    event.$on('removeProject', (id) => {
      this.projectId = id
      this.dialog = true
    })
  },
  methods: {
    removeProject: function () {
      axios.delete('/projects/' + this.projectId)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'Project has been deleted'
          })
          this.$router.push('/search/projects')
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

<style lang="scss" scoped>
.v-card.v-sheet.theme--light.elevation-2{
  margin-top: 24px !important;
  margin-bottom: 0px !important;
}
</style>
