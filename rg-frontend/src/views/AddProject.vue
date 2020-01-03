<template>
  <material-card
    :color="color"
    title="Specify project name and elasticsearch parameters">
    <v-container grid-list-lg>
      <v-layout
        row
        wrap>
        <v-text-field
          v-model="project.name"
          label="Project name"
          clearable
          class="pa-2"/>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-text-field
          v-model="project.description"
          label="Project description"
          clearable
          class="pa-2"/>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-text-field
          v-model="project.elasticUrl"
          label="Elasticsearch url"
          clearable
          class="pa-2"/>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-text-field
          v-model="project.elasticIndex"
          label="Elasticsearch index"
          clearable
          class="pa-2"/>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-spacer/>
        <v-btn
          :color="color"
          @click="checkStepOne"
        >
          Continue
        </v-btn>
        <v-spacer/>
      </v-layout>
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
    project: {},
    number: 0
  }),
  computed: {
    ...mapState(['color'])
  },
  methods: {
    checkStepOne () {
      if (!this.project.name || !this.project.description || !this.project.elasticUrl || !this.project.elasticIndex) {
        event.$emit('notification', {
          color: 'error',
          text: 'Please specify all the fields first'
        })
        return
      }
      axios.post('/projects', this.project)
        .then(resp => {
          event.$emit('notification', {
            color: 'success',
            text: 'New project has been created'
          })
          localStorage.setItem('currentProject', JSON.stringify(resp.data))
          this.$router.push('/edit/projects/' + resp.data._id + '/templates/new')
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.message
          })
        })
    }
  }
}
</script>
