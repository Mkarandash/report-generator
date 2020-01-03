<template>
  <material-card
    :color="color"
    title="Select template"
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
            @click="openTemplate(template._id)"
          >
            Search
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-container>
  </material-card>
</template>

<script>
import Card from '@/components/material/Card'
import { mapState } from 'vuex'
import { axios, event } from '@/main'

export default {
  components: {
    'material-card': Card
  },
  data () {
    return {
      projectId: undefined,
      templates: []
    }
  },
  computed: {
    ...mapState(['color'])
  },
  mounted () {
    this.projectId = this.$router.currentRoute.params.projectId
    axios.get('/projects/' + this.projectId + '/templates')
      .then(resp => {
        this.templates = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.message
        })
      })
  },
  methods: {
    openTemplate: function (templateId) {
      this.$router.push('/search/projects/' + this.projectId + '/templates/' + templateId)
    }
  }
}
</script>
