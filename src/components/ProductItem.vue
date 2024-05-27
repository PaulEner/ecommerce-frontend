<template>
  <b-col md="4" class="mb-4">
    <b-card class="h-100 d-flex flex-column align-items-center">
      <b-card-img :src="product.image" alt="Image" class="product-image mx-auto"></b-card-img>
      <b-card-body class="d-flex flex-column w-100">
        <div class="my-2 d-flex justify-content-between align-items-center w-100">
          <b-card-text class="m-0"><strong>{{ formatPrice(product.price) }}</strong></b-card-text>
          <div>
            <b-button :variant="isAdded ? 'btn-outline-success' : 'btn-outline-primary'" @click.stop="addToCart(product)" class="mr-2" title="Ajouter dans mon panier">
              <i :class="isAdded ? 'bi bi-check-circle' : 'bi bi-cart'"></i>
            </b-button>
            <b-button variant="btn-outline-info" @click="showDetails" title="Voir détails">
              <i class="bi bi-eye"></i>
            </b-button>
          </div>
        </div>
        <b-card-title>{{ product.title }}</b-card-title>
        <b-card-text class="flex-grow-1">
          {{ product.description }}
        </b-card-text> 
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script>
import { formatPriceMixin } from '../mixins/formatPriceMixin';

export default {
  props: {
    product: Object,
    isAdded: Boolean
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
    showDetails() {
      this.$emit('show-details', this.product);
    }
  },
  mixins: [formatPriceMixin]
};
</script>

<style scoped>
.product-image {
  height: 200px;
  object-fit: contain;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.b-card {
  display: flex;
  flex-direction: column;
}
</style>
