<template>
  <v-snackbar
    :color="notification.color"
    v-model="notification.snackbar"
    :timeout="5000"
    bottom
    right
    dark
  >
    <v-icon
      color="white"
      class="mr-3"
    >
      mdi-bell-plus
    </v-icon>
    <div>{{ notification.text }}</div>
    <v-icon
      size="16"
      @click="notification.snackbar = false"
    >
      mdi-close-circle
    </v-icon>
  </v-snackbar>
</template>

<script>
import { event } from '@/main'

export default {
  data: () => ({
    notification: {
      color: undefined,
      text: undefined,
      snackbar: false
    }
  }),
  created () {
    event.$on('notification', data => {
      this.notification.color = data.color
      this.notification.text = data.text
      this.notification.snackbar = true
    })
  }
}
</script>
