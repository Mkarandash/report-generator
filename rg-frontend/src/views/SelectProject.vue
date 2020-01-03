<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      v-if="myProjects != false"
      wrap>
      <v-flex
        v-for="project in myProjects"
        :key="project._id"
        md12
        lg6
        sm12
        xs12>
        <material-card
          :title="project.name"
          :text="project.description"
          :color="color"
          style="cursor: pointer;"
          icon="mdi-arrow-right-bold-circle-outline"
          @click="openProject(project._id)"
        />
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      wrap>
      Oops!.. You don't have any projects. Try to add one in 'Manage projects' section
    </v-layout>
  </v-container>
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
    myProjects: []
  }),
  computed: {
    ...mapState(['color'])
  },
  mounted: function () {
    axios.get('/projects/user/' + localStorage.getItem('id'))
      .then(resp => {
        this.myProjects = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.message
        })
        this.$router.go(-1)
      })
  },
  methods: {
    openProject: function (projectId) {
      this.$router.push('/search/projects/' + projectId + '/templates')
    }
  }
}
</script>
