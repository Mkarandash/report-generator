<template>
  <v-card>
    <v-card-title class="justify-center">Edit template</v-card-title>
    <v-container grid-list-lg>
      <v-layout
        wrap
        row
      >
        <v-text-field
          :disabled="disabled"
          v-model="template.name"
          class="pa-3"
          label="Template name"/>
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          :disabled="disabled"
          v-model="template.description"
          class="pa-3"
          label="Template description"/>
      </v-layout>
      <v-layout
        wrap
        row
      >
        <v-text-field
          :disabled="disabled"
          v-model="template.size"
          class="pa-3"
          label = "Default number of returned documents"
        />
      </v-layout>
      <v-data-table
        :disabled="disabled"
        :headers="headers"
        :items="template.fields"
        :loading="loading"
        loading-text="Loading... Please wait"
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
    <v-container 
      v-for="(chart, i) in template.charts"
      :key=i
      grid-list-lg
    >
      <v-layout
        v-if="chart.type == 'PieChart'"
        row
        wrap
      >
        <v-text-field 
          :disabled="disabled"
          v-model="chart.title"
          label="Title"
          class="pa-3"
        ></v-text-field>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-select
          :disabled="disabled"
          v-model="chart.countBy"
          :items="template.fields.map(x => x.name)"
          class="pa-3"
          label="Count number of each distinct value of entries"
        ></v-select>
      </v-layout>
      <v-layout
        v-if="chart.type == 'ColumnChart'"
        row
        wrap
      >
        <v-select
          :disabled="disabled"
          v-model="chart.separateBy"
          :items="template.fields.map(x => x.name)"
          class="pa-3"
          label="Separate values by"
        ></v-select>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        :disabled="disabled"
        class="pa-2 mr-2 mb-3"
        color="success"
        @click="updateTemplate"
      >
        Update template
      </v-btn>
      <v-btn
        :disabled="disabled"
        class="pa-2 ml-2 mb-3"
        color="error"
        @click="deleteTemplate"
      >
        Delete template
      </v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>

<script>
import { event } from '@/main'
import Axios from '@/plugins/axios'

export default {
  data () {
    return {
      loading: false,
      disabled: false,
      headers: [
        {
          sortable: true,
          text: 'Elastic name',
          value: 'name'
        },
        {
          sortable: true,
          text: 'Display name',
          value: 'displayName'
        },
        {
          sortable: true,
          text: 'Description',
          value: 'description'
        },
        {
          sortable: true,
          text: 'Type',
          value: 'type'
        },
        {
          sortable: true,
          text: 'Visible at search',
          value: 'isSearchable'
        },
        {
          sortable: true,
          text: 'Visible at results',
          value: 'isDisplayable'
        }
      ],
      template: {}
    }
  },
  mounted () {
    this.disabled = true
    this.loading = true
    Axios.get('/projects/' + this.$router.currentRoute.params.projectId + '/templates/' + this.$router.currentRoute.params.templateId)
      .then(resp => {
        this.template = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'erorr',
          text: err.response.data
        })
      })
      .finally(() => {
        this.loading = false
        this.disabled = false
      })
  },
  methods: {
    updateTemplate () {
      this.disabled = true;
      Axios.put('/projects/' + this.$router.currentRoute.params.projectId + '/templates/' + this.$router.currentRoute.params.templateId, this.template)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'Template updated'
          })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
        .finally(() => {
          this.disabled = false
        })
    },
    deleteTemplate () {
      this.disabled = true
      Axios.delete('/projects/' + this.$router.currentRoute.params.projectId + '/templates/' + this.$router.currentRoute.params.templateId)
        .then( () => {
          event.$emit('notification', {
            color: 'success',
            text: 'Template deleted'
          })
          this.$router.push({ path: '/administration/' + this.$router.currentRoute.params.projectId })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.response.data
          })
        })
        .finally(() => {
          this.disabled = false
        })
    }
  }
}
</script>
