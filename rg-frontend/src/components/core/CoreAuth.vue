<template>
  <v-content>
    <div id="core-auth">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-content>
</template>

<script>
export default {
}
</script>

<style>
#core-auth {
  padding-bottom: 100px;
}
</style>
