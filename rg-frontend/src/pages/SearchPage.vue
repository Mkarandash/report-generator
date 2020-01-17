<template>
  <div>
    <v-card
      style="position: fixed; top: 5%; right: 2%; z-index: 2;">
      <v-btn
        :disabled="disabled"
        v-if="success"
        icon
        @click.stop="success = false"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-card>
    <v-fade-transition>
      <v-card
        v-if="!success"
        class="pl-4 pr-4 pb-4">
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
                  :disabled="disabled"
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
                    :disabled="disabled"
                    v-model="field.from"
                    :label="field.displayName ? field.displayName + ': from' : field.name + ': from'"
                    type="number"
                    min="1"
                    clearable
                    class="pa-3"
                  />
                  <v-text-field
                    :disabled="disabled"
                    v-model="field.to"
                    :label="field.displayName ? field.displayName + ': to' : field.name + ': to'"
                    type="number"
                    min="1"
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
                    :disabled="disabled"
                    v-model="field.from"
                    :label="field.displayName ? field.displayName + ': from' : field.name + ': from'"
                    :id="field._id"
                    format="YYYY-MM-DDTHH:mm:ss"
                    class="pa-3"
                  />
                  <date-time-picker
                    :disabled="disabled"
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
                  :disabled="disabled"
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
          <v-btn
            :loading="disabled"
            color="success"
            @click="search"
          >
            Search
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-fade-transition>
    <results-table
      :headers="headers"
      :results="results"
      :success="success"
      :values="values"
      :charts="template.charts"
    ></results-table>
  </div>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'
import Autocomplete from '@/components/Autocomplete.vue'
import ResultsTable from '@/components/ResultsTable.vue'

export default {
  components: {
    'text-autocomplete': Autocomplete,
    'results-table': ResultsTable
  },
  data () {
    return {
      disabled: false,
      items: [],
      headers: [],
      values: [],
      template: {
        fields: []
      },
      results: [],
      success: false
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
    search () {
      this.disabled = true
      let data = { size: this.template.size, fields: this.template.fields}
      Axios.post('/projects/' + this.$router.currentRoute.params.projectId +'/search', data)
        .then(resp => {
          this.headers = this.template.fields
            .filter(x => x.isDisplayable === true)
            .map(f => { 
              return {
                sortable: true, text: f.displayName ? f.displayName : f.name,
                value: f.name
              }
            })
          this.values = this.template.fields.filter(x => x.isDisplayable === true).map(f => f.name)
          this.results = resp.data
          this.success = true
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
