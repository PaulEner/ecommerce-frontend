<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="sticky-top">
    <b-container class="d-flex justify-content-between">
      <b-navbar-brand href="#" class="mx-auto">E-commerce-Lite</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mx-auto w-75">
          <b-nav-form class="w-100">
            <b-input-group class="w-100">
              <b-form-input
                size="lg"
                class="mr-sm-2"
                placeholder="De quoi avez-vous besoin ?"
                :value="searchQuery"
                @input="$emit('update:searchQuery', $event)"
              ></b-form-input>
              <b-input-group-append>
                <b-button size="lg" class="my-2 my-sm-0" @click="filterProducts"><i class="bi bi-search"></i></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button variant="success" @click="$bvModal.show('cart-modal')">
              <i class="bi bi-cart"></i>
              Mon panier
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    searchQuery: {
      type: String,
      required: true
    }
  },
  methods: {
    filterProducts() {
      this.$emit('filter-products');
    }
  }
}
</script>

<style scoped>
.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1030;
}
</style>
