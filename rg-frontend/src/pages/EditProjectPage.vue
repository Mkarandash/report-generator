<template>
  <div>
    <v-card>
      <v-card-title class="justify-center">Edit project</v-card-title>
      <v-container grid-list-lg>
        <v-layout
          row
          wrap
        >
          <v-text-field
            :disabled="disabled"
            v-model="project.name"
            label="Project name"
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
            class="pa-2"
          />
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="success"
          class="mr-3"
          :disabled="disabled"
          @click="updateProject"
        >
          Update
        </v-btn>
        <v-btn
          color="error"
          class="ml-3"
          :disabled="disabled"
          @click="deleteProject"
        >
          Delete
        </v-btn>
        <v-spacer/>
      </v-card-actions>
      <v-card-title class="justify-center mt-4">Available templates</v-card-title>
      <v-container grid-list-lg>
        <v-layout
          v-for="template in templates"
          :key="template._id"
          class="pa-2"
          row
          wrap
        >
          {{ template.name }}
          <v-spacer />
          <v-btn
            class="mr-3"
            color="info"
            @click="editTemplate(template._id)"
          >
            Edit template
          </v-btn>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          :disabled="disabled"
          @click="createNewTemplate"
          class="mb-3"
          color="info"
        >
          Create new template
        </v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'

export default {
  data () {
    return {
      project: {},
      templates: []
    }
  },
  mounted: function () {
    Axios.get('/projects/' + this.$router.currentRoute.params.projectId + '/templates')
      .then(resp => {
        this.templates = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.response.data
        })
      })
    Axios.get('/projects/' + this.$router.currentRoute.params.projectId)
      .then(resp => {
        this.project = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.response.data
        })
      })
  },
  methods: {
    updateProject () {
      this.disabled = true
      Axios.put('/projects/' + this.$router.currentRoute.params.projectId, this.project)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'Project has been updated'
          })
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
    },
    deleteProject () {
      this.disabled = true
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
          this.disabled = false
        })
    },
    createNewTemplate () {
      this.$router.push('/administration/' + this.$router.currentRoute.params.projectId + '/new')
    },
    editTemplate (templateId) {
      this.$router.push('/administration/' + this.project._id + '/' + templateId)
    }
  }
}
</script>
