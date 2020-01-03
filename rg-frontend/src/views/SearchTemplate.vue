<template>
  <div>
    <material-card
      v-if="!success"
      :color="color"
      :title="template.name"
      :text="template.description"
    >
      <v-layout column>
        <v-layout
          v-for="(field, i) in template.fields.filter(function (field) { return field.isSearchable == true})"
          :key="i"
          row
          wrap>
          <v-flex v-if="field.type == 'text'">
            <v-combobox
              v-model="field.value"
              :label="field.prettyName ? field.prettyName : field.name"
              :items="items"
              :no-filter="true"
              clearable
              hide-selected
              hide-no-data
              class="pa-3"
              @focus="items = []"
              @update:searchInput="value => searchField(field.name, value, i)"/>
          </v-flex>
          <v-flex v-else-if="field.type == 'long'">
            <v-layout
              row
              wrap>
              <v-text-field
                v-model="field.from"
                :label="field.prettyName ? field.prettyName + ': from' : field.name + ': from'"
                clearable
                class="pa-3"/>
              <v-text-field
                v-model="field.to"
                :label="field.prettyName ? field.prettyName + ': to' : field.name + ': to'"
                clearable
                class="pa-3"/>
            </v-layout>
          </v-flex>
          <v-flex v-else-if="field.type == 'date'">
            <v-layout
              row
              wrap>
              <VueCtkDateTimePicker
                v-model="field.from"
                :label="field.prettyName + ': from'"
                :id="field._id"
                format="YYYY-MM-DDTHH:mm:ss"
                class="pa-3"/>
              <VueCtkDateTimePicker
                v-model="field.to"
                :label="field.prettyName + ': to'"
                format="YYYY-MM-DDTHH:mm:ss"
                class="pa-3"/>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap>
          <v-text-field
            v-model="template.size"
            class="pa-3"
            lable="Number of returned documents" />
        </v-layout>
      </v-layout>
      <v-layout
        row
        wrap>
        <v-spacer/>
        <v-btn
          :color="color"
          @click="search">
          Search
        </v-btn>
        <v-spacer/>
      </v-layout>
    </material-card>
    <material-card
      :color="color"
      title="Search results">
      <GChart
        :data="cahrtData"
        :options="chartOptions"
        type="ColumnChart" />
      <v-data-table
        :headers="template.fields.filter(x=>x.isDisplayable === true).map(f=> { return { sortable: true, text: f.prettyName ? f.prettyName : f.name, value: f.name}})"
        :items="results"
        hide-actions
      >
        <template
          slot="headerCell"
          slot-scope="{ header }"
        >
          <span
            class="subheading font-weight-light text-success text--darken-3"
            v-text="header.text"
          />
        </template>
        <template
          slot="items"
          slot-scope="{ item }"
        >
          <td
            v-for="(header, k) in template.fields.filter(x=>x.isDisplayable === true).map(f => f.name)"
            :key="k">
            {{ item[header] }}
          </td>
        </template>
      </v-data-table>
    </material-card>
    <v-layout
      v-if="success"
      wrap
      row>
      <v-spacer/>
      <v-btn
        :color="color"
        class="pa-2"
        @click="success = false">
        Return
      </v-btn>
      <v-spacer/>
    </v-layout>
  </div>
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
    items: [],
    template: {
      fields: []
    },
    results: [],
    success: false,
    cahrtData: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    cahrtOptions: {
      title: 'Chart 1',
      subtitle: 'Subtitle'
    }
  }),
  computed: {
    ...mapState(['color'])
  },
  mounted: function () {
    axios.get('/projects/' + this.$router.currentRoute.params.projectId)
      .then(resp => {
        this.project = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'erorr',
          text: err.message
        })
      })
    axios.get('/projects/' + this.$router.currentRoute.params.projectId + '/templates/' + this.$router.currentRoute.params.templateId)
      .then(resp => {
        this.template = resp.data
      })
      .catch(err => {
        event.$emit('notification', {
          color: 'erorr',
          text: err.message
        })
      })
  },
  methods: {
    searchField: function (name, value, i) {
      if (value === null) return
      let data = { project: this.project, field: { name: name, value: value } }
      axios.post('/search/field', data)
        .then(resp => {
          this.items = resp.data
        })
        .catch(() => {})
    },
    search () {
      let data = { project: this.project, template: this.template }
      axios.post('/search', data)
        .then(resp => {
          console.log(resp.data)
          this.results = resp.data
          this.success = true
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err
          })
        })
    }
  }
}
</script>
