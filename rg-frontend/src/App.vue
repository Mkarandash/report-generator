<template>
  <v-app>
    <CoreToolbar v-if="isLoggedIn"/>
    <CoreDrawer v-if="isLoggedIn"/>
    <CoreView v-if="isLoggedIn"/>
    <CoreAuth v-if="!isLoggedIn"/>
    <AddOrCreateProjectDialog />
    <ExitDialog />
    <Notification />
  </v-app>
</template>

<script>

import CoreAuth from '@/components/core/CoreAuth.vue'
import CoreDrawer from '@/components/core/CoreDrawer.vue'
import CoreToolbar from '@/components/core/CoreToolbar.vue'
import CoreView from '@/components/core/CoreView.vue'
import AddOrCreateProjectDialog from '@/components/custom/AddOrCreateProjectDialog.vue'
import ExitDialog from '@/components/custom/ExitDialog.vue'
import Notification from '@/components/custom/Notification.vue'
import { mapGetters } from 'vuex'
import { axios } from '@/main'

export default {
  components: {
    CoreAuth,
    CoreDrawer,
    CoreToolbar,
    CoreView,
    AddOrCreateProjectDialog,
    ExitDialog,
    Notification
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
            .then(() => {
              this.$router.push('/login')
            })
        } else if (err.status === 403) {
          this.$router.push('/error')
        }
        throw err
      })
    })
  }
}
</script>>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
