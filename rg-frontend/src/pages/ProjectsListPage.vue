<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-layout
      v-if="projects.length < 1"
      wrap
    >
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
            <v-card-title>Oops!..</v-card-title>
            <v-card-text>You dont have any projects yet. Try creating one</v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      wrap
    >
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
            @click="openProject(project._id)"
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
import Axios from '@/plugins/axios'
import { event } from '@/main'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      projects: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mounted () {
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
    openProject (projectId) {
      this.$router.push({ path: '/projects/' + projectId })
    },
    createNewProject () {
      this.$router.push({ path: '/administration/new' })
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