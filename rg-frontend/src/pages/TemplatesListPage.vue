<template>
  <v-container
    fluid
    grid-list-xl
  >
    <v-layout wrap>
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
          >
            <v-card-title>{{ template.name }}</v-card-title>
            <v-card-text>{{ template.description }}</v-card-text>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out blue v-card--reveal display-3 white--text"
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
    openTemplate: function (templateId) {
      this.$router.push({ path: '/projects/' + this.$router.currentRoute.params.projectId + '/' + templateId })
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