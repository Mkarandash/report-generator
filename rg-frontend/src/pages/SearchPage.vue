<template>
  <div>
    <v-card
      style="position: fixed; top: 5%; right: 2%; z-index: 2;">
      <v-btn
        v-if="searchSuccessful"
        icon
        @click.stop="success = !success"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-card>
    <v-fade-transition>
    <v-card v-if="!success">
      <v-card-title class="justify-center">{{ template.name }}</v-card-title>
      <v-container grid-list-lg>
        <v-layout column>
          <v-layout
            v-for="(field, i) in template.fields.filter(function (field) { return field.isSearchable == true})"
            :key="i"
            row
            wrap
          >
            <v-flex v-if="field.type == 'text'">
              <text-autocomplete
                v-model="field.value"
                :name="field.name"
                :label="field.displayName ? field.displayName : field.name"
              ></text-autocomplete>
            </v-flex>
            <v-flex v-else-if="field.type == 'long'">
              <v-layout
                row
                wrap
              >
                <v-text-field
                  v-model="field.from"
                  :label="field.displayName ? field.displayName + ': from' : field.name + ': from'"
                  type="number"
                  clearable
                  class="pa-3"
                />
                <v-text-field
                  v-model="field.to"
                  :label="field.displayName ? field.displayName + ': to' : field.name + ': to'"
                  type="number"
                  clearable
                  class="pa-3"
                />
              </v-layout>
            </v-flex>
            <v-flex v-else-if="field.type == 'date'">
              <v-layout
                row
                wrap
              >
                <date-time-picker
                  v-model="field.from"
                  :label="field.displayName ? field.displayName + ': from' : field.name + ': from'"
                  :id="field._id"
                  format="YYYY-MM-DDTHH:mm:ss"
                  class="pa-3"
                />
                <date-time-picker
                  v-model="field.to"
                  :label="field.displayName ? field.displayName + ': to' : field.name + ': to'"
                  format="YYYY-MM-DDTHH:mm:ss"
                  class="pa-3"
                />
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout
            row
            wrap
          >
            <v-flex>
              <v-text-field
                v-model="template.size"
                type="number"
                class="pa-3"
                lable="Number of returned documents"
              />
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="search">Search</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
    </v-fade-transition>
    <v-fade-transition>
    <div v-if="success">
      <GChart
        :data="cahrtData"
        :options="chartOptions"
        type="PieChart" />
      <v-card>
        <v-card-title class="justify-center">Search results</v-card-title>
        <v-data-table
          :headers="headers"
          :items="results"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items"
                :key="item.name"
              >
              <td
                v-for="value in values"
                :key="value">
                {{ item[value] }}
              </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer/>
            <v-btn @click="success = false">Return</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </div>
    </v-fade-transition>
  </div>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'
import Autocomplete from '@/components/Autocomplete.vue'

export default {
  components: {
    'text-autocomplete': Autocomplete
  },
  data () {
    return {
      items: [],
      template: {
        fields: []
      },
      results: [],
      success: false,
      searchSuccessful: false,
      cahrtData: [],
      chartOptions: {
        title: 'Tests passrate'
      }
    }
  },
  mounted: function () {
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
  },
  methods: {
    convertToChartData (results) {
      let result = [['Result', 'Number of tests']]
      let allValues = results.map(x => x.resultStr)
      let uniqueValues = allValues.filter((v, i, a) => a.indexOf(v) === i)
      uniqueValues.map(v => {
        let number = results.filter(x => x.resultStr === v).length
        result.push([v, number])
      })
      return result
    },
    search () {
      let data = { size: this.template.size, fields: this.template.fields}
      Axios.post('/projects/' + this.$router.currentRoute.params.projectId +'/search', data)
        .then(resp => {
          this.headers = this.template.fields
            .filter(x => x.isDisplayable === true)
            .map(f => { return { sortable: true, text: f.displayName ? f.displayName : f.name, value: f.name } })
          this.values = this.template.fields.filter(x => x.isDisplayable === true).map(f => f.name)
          this.results = resp.data
          this.cahrtData = this.convertToChartData(this.results)
          this.success = true
          this.searchSuccessful = true
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
