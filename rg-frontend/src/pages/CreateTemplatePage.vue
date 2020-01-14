<template>
  <v-card>
    <v-card-title class="justify-center">Create template</v-card-title>
    <v-container grid-list-lg>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="template.name"
          class="pa-3"
          label="Template name"/>
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="template.description"
          class="pa-3"
          label="Template description"/>
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          v-model="template.size"
          type="number"
          class="pa-3"
          label = "Default number of returned documents"
        />
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="template.fields"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>
                <v-text-field v-model="item.displayName"></v-text-field>
              </td>
              <td>
                <v-text-field v-model="item.description"></v-text-field>
              </td>
              <td>{{ item.type }}</td>
              <td>
                <v-checkbox v-model="item.isSearchable"></v-checkbox>
              </td>
              <td>
                <v-checkbox v-model="item.isDisplayable"></v-checkbox>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-container>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        class="pa-2"
        @click="createTemplate">
        Create template
      </v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'

export default {
  data () {
    return {
      value2: true,
      headers: [
        {
          text: 'Elastic name',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Display name',
          value: 'displayName'
        },
        {
          sortable: false,
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Visible at search',
          value: 'isSearchable'
        },
        {
          text: 'Visible at results',
          value: 'isDisplayable'
        }
      ],
      template: {
        fields: [],
        projectId: undefined
      }
    }
  },
  mounted () {
    this.template.projectId = this.$router.currentRoute.params.projectId
    Axios.get('/projects/' + this.template.projectId + '/search/index')
      .then(resp => {
        this.template.fields = resp.data.filter(function (el) {
          return el != null
        })
      }).catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.response.data
        })
      })
  },
  methods: {
    createTemplate () {
      Axios.post('/projects/' + this.template.projectId + '/templates', this.template)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'New template has been created'
          })
          this.$router.push({ path: '/administration/' + this.template.projectId })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
    }
  }
}
</script>
