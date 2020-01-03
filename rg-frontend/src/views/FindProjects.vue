<template>
  <material-card
    :color="color"
    title="Available projects"
  >
    <v-container grid-list-lg>
      <v-list-tile
        v-for="project in allProjects"
        :key="project.id"
        :active-class="color"
        class="v-list-item"
      >
        <v-list-tile-title
          v-text="project.name"
        />
        <v-list-tile-action>
          <v-btn
            :color="color"
            class="pa-2"
            @click="openReqeustAccessPopup(project.id)"
          >
            Request an access
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-container>
  </material-card>
</template>

<script>
import Card from '@/components/material/Card'
import { mapState } from 'vuex'
import { event, axios } from '@/main'

export default {
  components: {
    'material-card': Card
  },
  data: () => ({
    allProjects: []
  }),
  computed: {
    ...mapState(['color'])
  },
  mounted: function () {
    axios.get('/projects')
      .then(resp => {
        this.allProjects = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.message
        })
      })
  }
}
</script>
