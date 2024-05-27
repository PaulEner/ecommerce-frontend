<template>
  <b-modal
    id="product-details-modal"
    title="Détail"
    hide-header-close
    @hide="clearSelectedProduct"
  >
    <template v-if="product">
      <b-img :src="product.image" fluid alt="Product Image" class="product-image mb-3 mx-auto"></b-img>
      <p><strong>Prix :</strong> {{ formatPrice(product.price) }}</p>
      <h5>{{ product.title }}</h5>
      <p>{{ product.description }}</p>      
    </template>
    <template #modal-footer>
      <b-button variant="secondary" @click="closeModal">Fermer</b-button>
    </template>
  </b-modal>
</template>

<script>
import { formatPriceMixin } from '../mixins/formatPriceMixin';

export default {
  name: 'ProductDetails',
  props: {
    product: Object
  },
  methods: {
    clearSelectedProduct() {
      this.$emit('clear-selected-product');
    },
    closeModal() {
      this.$bvModal.hide('product-details-modal');
    }
  },
  mixins: [formatPriceMixin]
};
</script>

<style scoped>
.product-image {
  height: 200px;
  width: 100%;
  object-fit: contain;
}
.mb-3 {
  margin-bottom: 1.5rem;
}
.modal-content {
  border-radius: 10px;
}
.modal-header {
  border-bottom: none;
}
</style>
