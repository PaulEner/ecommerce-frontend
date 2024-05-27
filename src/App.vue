<template>
  <div id="app">
    <AppHeader
      :searchQuery="searchQuery"
      @update:searchQuery="searchQuery = $event"
      @filter-products="filterProducts"
    />
    <b-container class="mt-4">
      <router-view />
    </b-container>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    filterProducts() {
      this.$emit('filter-products');
    }
  }
};
</script>

<style>
body {
  margin-bottom: 4rem;
}
</style>
