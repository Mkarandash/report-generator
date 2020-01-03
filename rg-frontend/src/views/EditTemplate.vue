<template>
  <material-card
    :color="color"
    title="Create template">
    <v-layout
      wrap
      row>
      <v-text-field
        v-model="template.name"
        class="pa-3"
        label="Template name"/>
    </v-layout>
    <v-layout
      wrap
      row>
      <v-text-field
        v-model="template.description"
        class="pa-3"
        label="Template description"/>
    </v-layout>
    <v-layout
      wrap
      row>
      <v-text-field
        v-model="template.size"
        class="pa-3"
        label = "Default number of returned documents" />
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="template.fields"
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
        <td>
          {{ item.name }}
        </td>
        <td>
          <v-text-field
            v-model="item.prettyName"/>
        </td>
        <td>
          <v-text-field
            v-model="item.description"/>
        </td>
        <td>
          {{ item.type }}
        </td>
        <td>
          <v-checkbox
            v-model="item.isSearchable"/>
        </td>
        <td>
          <v-checkbox
            v-model="item.isDisplayable"/>
        </td>
      </template>
    </v-data-table>
    <v-layout
      wrap
      row>
      <v-spacer/>
      <v-btn
        :color="color"
        class="pa-2"
        @click="updateTemplate">
        Update template
      </v-btn>
      <v-spacer/>
    </v-layout>
  </material-card>
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
    headers: [
      {
        sortable: true,
        text: 'Elastic name',
        value: 'name'
      },
      {
        sortable: true,
        text: 'Display name',
        value: 'prettyName'
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
  }),
  computed: {
    ...mapState(['color'])
  },
  mounted: function () {
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
    updateTemplate: function () {
      axios.put('/projects/' + this.$router.currentRoute.params.projectId + '/templates/' + this.$router.currentRoute.params.templateId, this.template)
        .then(() => {
          event.$emit('notification', {
            color: 'success',
            text: 'Template updated'
          })
        })
        .catch(err => {
          event.$emit('notification', {
            color: 'error',
            text: err.message
          })
        })
    }
  }
}
</script>
