<template>
  <v-card>
    <v-card-title class="justify-center">Create template</v-card-title>
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
          type="number"
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
    <v-container grid-list-lg>
      <v-layout
        row
        wrap
      >
        <v-checkbox
          :disabled="disabled"
          v-model="includePieChart"
          label="Add Pie chart?"
          class="pa-3"
        ></v-checkbox>
      </v-layout>
      <div v-if="includePieChart">
        <v-layout
          row
          wrap
        >
          <v-text-field
            :disabled="disabled"
            v-model="pieChart.title"
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
            v-model="pieChart.countBy"
            :items="template.fields.map(x => x.name)"
            class="pa-3"
            label="Count number of each distinct value of entries"
          ></v-select>
        </v-layout>
      </div>
    </v-container>
    <v-container grid-list-lg>
      <v-layout
        row
        wrap
      >
        <v-checkbox
          :disabled="disabled"
          v-model="includeColumnChart"
          label="Add Column chart?"
          class="pa-3"
        ></v-checkbox>
      </v-layout>
      <div v-if="includeColumnChart">
        <v-layout
          row
          wrap
        >
          <v-text-field
            :disabled="disabled"
            v-model="columnChart.title"
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
            v-model="columnChart.countBy"
            :items="template.fields.map(x => x.name)"
            class="pa-3"
            label="Count number of each distinct value of entries"
          ></v-select>
        </v-layout>
        <v-layout
          row
          wrap
        >
          <v-select
            :disabled="disabled"
            v-model="columnChart.separateBy"
            :items="template.fields.map(x => x.name)"
            class="pa-3"
            label="Separate entries by"
          ></v-select>
        </v-layout>
      </div>
    </v-container>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        :disabled="disabled"
        color="success"
        class="pa-3 mb-3"
        @click="createTemplate"
      >
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
      pieChart: {},
      columnChart: {},
      includePieChart: false,
      includeColumnChart: false,
      loading: false,
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
        charts: [],
        projectId: undefined
      }
    }
  },
  mounted () {
    this.template.projectId = this.$router.currentRoute.params.projectId
    this.loading = true
    Axios.get('/projects/' + this.template.projectId + '/search/index')
      .then(resp => {
        this.template.fields = resp.data.filter(function (el) {
          return el != null
        })
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'error',
          text: err.response.data
        })
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    createTemplate () {
      if (this.includePieChart) {
        this.template.charts.push({
          type: 'PieChart',
          title: this.pieChart.title,
          countBy: this.pieChart.countBy
        })
      }

      if (this.includeColumnChart) {
        this.template.charts.push({
          type: 'ColumnChart',
          title: this.columnChart.title,
          countBy: this.columnChart.countBy,
          entries: this.columnChart.entries
        })
      }

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
