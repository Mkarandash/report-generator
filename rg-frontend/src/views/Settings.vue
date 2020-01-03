<template>
  <v-card>
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex xs12>
          <div class="text-xs-center body-2 text-uppercase sidebar-filter">Application theme</div>
          <v-layout justify-center>
            <v-avatar
              v-for="c in colors"
              :key="c"
              :color="c"
              size="23"
              class="ma-1"
              @click="setColor(c)"
            />
          </v-layout>
          <v-divider class="mt-3"/>
        </v-flex>
        <v-flex
          xs12
        >
          <div class="text-xs-center body-2 text-uppercase sidebar-filter">Sidebar image</div>
        </v-flex>
        <v-flex
          v-for="img in images"
          :key="img"
          xs3
        >
          <v-img
            :class="[image === img ? 'image-active' : '']"
            :src="img"
            height="120"
            @click.native="setImage(img)"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    colors: [
      'info',
      'success',
      'warning',
      'error',
      'secondary',
      'accent'
    ],
    images: [
      'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-1.23832d31.jpg',
      'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
      'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-3.3a54f533.jpg',
      'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg'
    ]
  }),

  computed: {
    ...mapState(['image', 'color'])
  },

  methods: {
    ...mapMutations(['setImage', 'setColor'])
  }
}
</script>

<style lang="scss">
  .v-avatar,
  .v-responsive {
    cursor: pointer;
  }
</style>
