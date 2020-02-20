<template>
  <v-dialog
    v-model="dialog"
    persistent 
    width="500">
    <v-card v-if="!deleting">
      <v-card-title
        class="justify-center pa-3 white--text"
        style="background-color: #2196f3;"
      >
        Are you sure you want to delete this project?
      </v-card-title>
      <v-card-text class="pa-3">
        <div>
          <p class="text-center">All templates will be deleted too</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="info"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          color="error"
          @click="deleteProject"
        >
          Confirm
        </v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-text class="pa-3">
        <div>
          <p class="text-center">Deleting...</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { event } from '@/main'
import Axios from '@/plugins/axios'

export default {
  data () {
    return {
      dialog: false,
      deleting: false
    }
  },
  created () {
    event.$on('deleteProject', () => {
      this.dialog = true
    })
  },
  methods: {
    deleteProject () {
      this.deleting = true
      Axios.delete('/projects/' + this.$router.currentRoute.params.projectId)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'Project has been deleted'
          })
          this.$router.push({ path: '/administration' })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
        .finally(() => {
          this.deleting = false
          this.dialog = false
        })
    },
  }
}
</script>

<style>
</style>
