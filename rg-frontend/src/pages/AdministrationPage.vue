<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        xl3
        lg4
        md6
        sm12
        xs12
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              style="cursor: pointer;"
              @click="createNewProject"
            >
              <v-card-title>Create new project</v-card-title>
              <v-card-text>Create new project from scratch</v-card-text>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#036358"
                >
                  <v-btn>Open</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-flex>
      <v-flex
        v-for="project in projects"
        :key="project._id"
        xl3
        lg4
        md6
        sm12
        xs12
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              style="cursor: pointer;"
              @click="editProject(project._id)"
            >
              <v-card-title>{{ project.name }}</v-card-title>
              <v-card-text>{{ project.description }}</v-card-text>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#036358"
                >
                  <v-btn>Edit</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { event } from '@/main'
import Axios from '@/plugins/axios'

export default {
  data () {
    return {
      projects: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted: function () {
    Axios.get('/projects/user/' + this.userId)
      .then(resp => {
        this.projects = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.response.data
        })
      })
  },
  methods: {
    createNewProject() {
      this.$router.push({ path: '/administration/new'})
    },
    editProject (projectId) {
      this.$router.push({ path: '/administration/' + projectId })
    }
  }
}
</script>
