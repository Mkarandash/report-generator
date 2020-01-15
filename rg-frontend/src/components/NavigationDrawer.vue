<template>
  <v-card>
    <v-navigation-drawer
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="@/assets/rapid_reports.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>Raid reports</v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          key="Logout"
          @click="exit">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <exit-dialog></exit-dialog>
  </v-card>
</template>

<script>
import { event } from '@/main'
import ExitDialog from '@/components/ExitDialog.vue'

export default {
  components: {
    'exit-dialog': ExitDialog
  },
  data () {
    return {
      mini: false,
      items: [
        { title: 'Search', icon: 'mdi-file-find', to: '/projects' },
        { title: 'Administration', icon: 'mdi-pencil-box', to: '/administration' },
        { title: 'My profile', icon: 'mdi-account-circle', to: '/user' },
        { title: 'Settings', icon: 'mdi-settings', to: '/settings' }
      ]
    }
  },
  methods: {
    exit() {
      event.$emit('exit')
    }
  }
}
</script>