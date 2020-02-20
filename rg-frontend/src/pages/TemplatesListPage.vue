<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-layout
      v-if="templates.length < 1"
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
            @click="createNewTemplate"
            :elevation="hover ? 15 : 1"
          >
            <v-card-title>Oops!..</v-card-title>
            <v-card-text>You dont have any templates yet. Try creating one</v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      wrap
    >
      <v-flex
        v-for="template in templates"
        :key="template._id"
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
            @click="openTemplate(template._id)"
            :elevation="hover ? 15 : 1"
          >
            <v-card-title>{{ template.name }}</v-card-title>
            <v-card-text>{{ template.description }}</v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'

export default {
  data () {
    return {
      templates: []
    }
  },
  mounted () {
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
  },
  methods: {
    openTemplate (templateId) {
      this.$router.push({ path: '/projects/' + this.$router.currentRoute.params.projectId + '/' + templateId })
    },
    createNewTemplate () {
      this.$router.push({ path: '/administration/' + this.$router.currentRoute.params.projectId + '/new'})
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