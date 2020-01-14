<template>
  <v-container
    fill-height
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
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              style="cursor: pointer;"
              @click="openTemplate(template._id)"
            >
              <v-card-title>{{ template.name }}</v-card-title>
              <v-card-text>{{ template.description }}</v-card-text>
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
