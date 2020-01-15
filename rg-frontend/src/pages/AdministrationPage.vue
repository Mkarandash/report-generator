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
            style="cursor: pointer;"
            @click="createNewProject"
          >
            <v-card-title>Create new project</v-card-title>
            <v-card-text>Create new project from scratch</v-card-text>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out indigo darken-1 v-card--reveal display-3 white--text"
                style="height: 100%;"
              ></div>
            </v-expand-transition>
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
            style="cursor: pointer;"
            @click="editProject(project._id)"
          >
            <v-card-title>{{ project.name }}</v-card-title>
            <v-card-text>{{ project.description }}</v-card-text>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out indigo darken-1 v-card--reveal display-3 white--text"
                style="height: 100%;"
              ></div>
            </v-expand-transition>
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