<template>
  <v-autocomplete
    :value="value"
    :name="name"
    :label="label"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    @input="$emit('input', $event)"
    placeholder="Start typing to get suggestions"
    hide-no-data
    clearable
    hide-selected
  ></v-autocomplete>
</template>

<script>
import Axios from '@/plugins/axios'
import { event } from '@/main'

export default {
  props: {
    value: {
      type: String
    },
    name: {
      type: String,
    },
    label: {
      type: String
    }
  },
  data () {
    return {
      items: [],
      isLoading: false,
      search: null,
    }
  },

  watch: {
    search () {
      if (!this.search || this.isLoading) return
        this.isLoading = true
        let data = {
          name: this.name,
          value: this.search
        }
        Axios.post('/projects/' + this.$router.currentRoute.params.projectId + '/search/field', data)
          .then(res => {
            this.items = res.data
          })
          .catch(err => {
            event.$emit('notification', {
              color: 'error',
              text: err.response.data
            })
          })
          .finally(() => {
            this.isLoading = false
          })
    }
  }
}
</script>