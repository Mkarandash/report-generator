<template>
  <v-app>
    <v-content>
      <nav-drawer v-if="isLoggedIn"></nav-drawer>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
      <notification></notification>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from '@/components/Notification.vue'
import NavigationDrawer from '@/components/NavigationDrawer.vue'

export default {
  components: {
    'notification': Notification,
    'nav-drawer': NavigationDrawer
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>
