<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
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
              @click="openProject(project._id)"
            >
              <v-card-title>{{ project.name }}</v-card-title>
              <v-card-text></v-card-text>
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
    }
  }
}
</script>
