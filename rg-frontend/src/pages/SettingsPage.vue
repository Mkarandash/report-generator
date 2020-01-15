<template>

</template>

<script>
export default {
  components: {
    'pie-chart': DefinePieChart
  },
  data () {
    return {
      chart:{},
      results: [
        {
          testName: 'first test',
          durationSec: 20,
          resultStr: 'Passed',
          timeStamp: '2019-10-10T10:10:10.1111111Z'
        },
        {
          testName: 'second test',
          durationSec: 10,
          resultStr: 'Failed',
          timeStamp: '2019-11-11T11:11:11.2222222Z'
        },
        {
          testName: 'third test',
          durationSec: 30,
          resultStr: 'Failed',
          timeStamp: '2019-11-11T11:11:11.2222222Z'
        }
      ],
      fields: [
        {
          displayName: 'Test name',
          name: 'testName'
        },
        {
          displayName: 'Duration (seconds)',
          name: 'durationSec'
        },
        {
          displayName: 'Result',
          name: 'resultStr'
        },
        {
          displayName: 'Date',
          name: 'timeStamp'
        }
      ]
    }
  },
  methods: {
    log () {
      console.log(this.chart)
    }
  }
}
</script>