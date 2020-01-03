<template>
  <div>
    <material-card
      :color="color"
      title="Edit project">
      <v-container grid-list-lg>
        <v-layout
          row
          wrap>
          <v-text-field
            v-model="project.name"
            label="Project name"
            class="pa-2"/>
        </v-layout>
        <v-layout
          row
          wrap>
          <v-text-field
            v-model="project.description"
            label="Project description"
            class="pa-2"/>
        </v-layout>
        <v-layout
          row
          wrap>
          <v-text-field
            v-model="project.elasticUrl"
            label="Elasticsearch url"
            class="pa-2"/>
        </v-layout>
        <v-layout
          row
          wrap>
          <v-text-field
            v-model="project.elasticIndex"
            label="Elasticsearch index"
            class="pa-2"/>
        </v-layout>
        <v-layout
          row
          wrap>
          <v-spacer/>
          <v-btn
            :color="color"
            @click="updateProject">
            Update
          </v-btn>
          <v-btn
            :color="color"
            @click="removeProjectDialog">
            Delete
          </v-btn>
          <v-spacer/>
        </v-layout>
        <remove-dialog/>
      </v-container>
    </material-card>
    <material-card
      :color="color"
      title="Available templates"
    >
      <v-container grid-list-lg>
        <v-list-tile
          v-for="template in templates"
          :key="template._id"
          :active-class="color"
          class="v-list-item"
        >
          <v-list-tile-title
            v-text="template.name"
          />
          <v-list-tile-action>
            <v-btn
              :color="color"
              class="pa-2"
              @click="editTemplate(template._id)"
            >
              Edit template
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-layout
          wrap
          row>
          <v-spacer/>
          <v-btn
            :color="color"
            @click="addNewTemplate">
            Add new template
          </v-btn>
          <v-spacer/>
        </v-layout>
      </v-container>
    </material-card>
  </div>
</template>

<script>
import Card from '@/components/material/Card'
import { mapState } from 'vuex'
import { axios, event } from '@/main'
import RemoveProjectDialog from '@/components/custom/RemoveProjectDialog.vue'

export default {
  components: {
    'material-card': Card,
    'remove-dialog': RemoveProjectDialog
  },
  data: () => ({
    project: {},
    templates: []
  }),
  computed: {
    ...mapState(['color'])
  },
  mounted: function () {
    axios.get('/projects/' + this.$router.currentRoute.params.projectId + '/templates')
      .then(resp => {
        this.templates = resp.data
        console.log(resp.data)
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.message
        })
      })
    axios.get('/projects/' + this.$router.currentRoute.params.projectId)
      .then(resp => {
        this.project = resp.data
        localStorage.setItem('currentProject', JSON.stringify(resp.data))
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.message
        })
      })
  },
  methods: {
    updateProject: function () {
      axios.put('/projects/' + this.$router.currentRoute.params.projectId, this.project)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'Project has been updated'
          })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.message
          })
        })
    },
    removeProjectDialog: function () {
      event.$emit('removeProject', this.project._id)
    },
    addNewTemplate: function () {
      this.$router.push('/edit/projects/' + this.project._id + '/templates/new')
    },
    editTemplate: function (templateId) {
      this.$router.push('/edit/projects/' + this.project._id + '/templates/' + templateId)
    }
  }
}
</script>
