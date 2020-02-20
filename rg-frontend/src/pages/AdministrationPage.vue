<template>
  <v-container
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
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="ml-3 mt-3"
            style="cursor: pointer;"
            @click="createNewProject"
            :elevation="hover ? 15 : 1"
          >
            <v-card-title>Create new project</v-card-title>
            <v-card-text>Create new project from scratch</v-card-text>
          </v-card>
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
        <v-hover v-slot:default="{ hover }">
          <v-card
            class="ml-3 mt-3"
            style="cursor: pointer;"
            @click="editProject(project._id)"
            :elevation="hover ? 15 : 1"
          >
            <v-card-title>{{ project.name }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
          </v-card>
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

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>