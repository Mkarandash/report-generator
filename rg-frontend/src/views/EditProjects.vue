<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      wrap>
      <v-flex
        md12
        lg6
        sm12
        xs12>
        <material-card
          :color="color"
          title="Add a project"
          text="Create new or request an access to existing project"
          icon="mdi-plus-box"
          style="cursor: pointer;"
          @click="addNewProject"
        />
      </v-flex>
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
          icon="mdi-pencil-box-outline"
          style="cursor: pointer;"
          @click="editProject(project._id)"
        />
      </v-flex>
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
  data () {
    return {
      myProjects: []
    }
  },
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
      })
  },
  methods: {
    addNewProject: function () {
      event.$emit('newProject', true)
    },
    editProject: function (projectId) {
      this.$router.push('/edit/projects/' + projectId)
    }
  }
}
</script>
