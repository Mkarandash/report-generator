<template>
  <v-fade-transition v-if="success">
    <v-card>
      <v-container grid-list-lg>
        <v-layout
          v-for="chart in charts"
          :key="chart.title"
          row
          wrap
        >
          <v-spacer />
          <GChart
            v-if="chart.type == 'PieChart'"
            type="PieChart"
            :data="convertPieChartData (chart)"
            :options="convertOptions (chart)"
            style="height: 300px; width: 00px;"
          />
          <GChart
            v-else-if="chart.type == 'ColumnChart'"
            type="ColumnChart"
            :data="convertColumnChartData (chart)"
            :options="convertOptions (chart)"
            style="height: 500px; width: 1000px;"
          />
          <v-spacer />
        </v-layout>
      </v-container>
      <v-card-title class="justify-center">Search results</v-card-title>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="results"
        loading-text="Loading... Please wait"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr
              v-for="item in items"
              :key="item.name"
            >
              <td
                v-for="value in values"
                :key="value"
              >
                {{ item[value] }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </v-fade-transition>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array
    },
    results: {
      type: Array
    },
    success: {
      type: Boolean
    },
    values: {
      type: Array
    },
    loading: {
      type: Boolean
    },
    charts: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  methods: {
    convertOptions (chart) {
      let options = { chart: { title: chart.title } }
      console.log(options)
      return options
    },
    convertPieChartData (chart) {
      let result = [['', '']]
      let countBy = chart.countBy
      let countByDistinctValuesArray = this.results.map(x => x[countBy]).filter((v, i, a) => a.indexOf(v) === i)
      for (const countByDistinctValue of countByDistinctValuesArray) {
        let number = this.results.filter(x => x[countBy] == countByDistinctValue).length
        result.push([countByDistinctValue, number])
      }
      return result
    },
    convertColumnChartData (chart) {
      let countBy = chart.countBy
      let separateBy = chart.separateBy
      let countByDistinctValuesArray = this.results.map(x => x[countBy]).filter((v, i, a) => a.indexOf(v) === i)
      let separateByDistinctValuesArray = this.results.map(x => x[separateBy]).filter((v, i, a) => a.indexOf(v) === i)
      let result = []
      let headersRow = [countBy]
      for (const separateByDistinctValue of separateByDistinctValuesArray) {
        headersRow.push(separateByDistinctValue)
      }
      result.push(headersRow)
      for (const countByDistinctValue of countByDistinctValuesArray) {
        let dataRow = [countByDistinctValue]
        for (const separateByDistinctValue of separateByDistinctValuesArray) {
          let number = this.results.filter(x => x[countBy] == countByDistinctValue).filter(y => y[separateBy] == separateByDistinctValue).length
          dataRow.push(number)
        }
        result.push(dataRow)
      }
      return result
    }
  }
}
</script>