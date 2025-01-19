<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <WeatherTable />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WeatherTable from './components/WeatherTable.vue';

export default defineComponent({
  name: 'App',
  components: {
    WeatherTable,
  }
})
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>
