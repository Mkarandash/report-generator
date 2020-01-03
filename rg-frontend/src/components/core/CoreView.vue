<template>
  <v-content>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <CoreFooter />
  </v-content>
</template>

<script>
import CoreFooter from './CoreFooter'

export default {
  components: {
    CoreFooter
  }
}
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
