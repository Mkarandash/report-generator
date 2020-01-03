<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile class="pa-2">
          <img
            src="../../../public/rapid_reports.png"
            style="width: 35px; heiht: 35px;"
            class="pr-2">
          <v-list-tile-title class="title">
            Rapid reports
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>
        <v-list-tile
          :active-class="color"
          avatar
          class="v-list-item"
          @click="logout"
        >
          <v-list-tile-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            Exit
          </v-list-tile-title>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { event } from '@/main'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    links: [
      {
        to: '/projects/search',
        icon: 'mdi-file-find',
        text: 'Search'
      },
      {
        to: '/user/' + localStorage.getItem('id'),
        icon: 'mdi-account',
        text: 'User Profile'
      },
      {
        to: '/edit/projects',
        icon: 'mdi-view-dashboard',
        text: 'Manage projects'
      },
      {
        to: '/settings',
        icon: 'mdi-settings',
        text: 'Application settings'
      }
    ]
  }),
  computed: {
    ...mapState(['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },
  methods: {
    ...mapMutations(['setDrawer']),
    logout: function () {
      event.$emit('exit', true)
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list {
      background-color: #0202025b;
    }
    .v-list__tile {
      border-radius: 4px;
    }
  }
</style>
