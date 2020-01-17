<template>
  <v-card >
    <v-card-title class="justify-center">Specify project name and elasticsearch parameters</v-card-title>
    <v-container grid-list-lg>
      <v-layout
        row
        wrap
      >
        <v-text-field
          :disabled="disabled"
          v-model="project.name"
          label="Project name"
          clearable
          class="pa-2"
        />
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-text-field
          :disabled="disabled"
          v-model="project.description"
          label="Project description"
          clearable
          class="pa-2"
        />
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-text-field
          :disabled="disabled"
          v-model="project.elasticUrl"
          label="Elasticsearch url"
          clearable
          class="pa-2"
        />
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-text-field
          :disabled="disabled"
          v-model="project.elasticIndex"
          label="Elasticsearch index"
          clearable
          class="pa-2"
        />
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="success"
        :loading="disabled"
        @click="createProject"
      >
        Create project
      </v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'

export default {
  data () {
    return {
      project: {},
      disabled: false
    }
  },
  methods: {
    createProject () {
      if (!this.project.name || !this.project.description || !this.project.elasticUrl || !this.project.elasticIndex) {
        event.$emit('notification', {
          color: 'error',
          text: 'Please specify all the fields first'
        })
        return
      }
      this.disabled = true
      Axios.post('/projects', this.project)
        .then(resp => {
          event.$emit('notification', {
            color: 'success',
            text: 'New project has been created'
          })
          this.$router.push({ path: '/administration/' + resp.data._id})
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
        .finally(() => {
          this.disabled = false
        })
    }
  }
}
</script>
