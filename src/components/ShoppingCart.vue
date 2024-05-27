<template>
  <div>
    <b-modal
      id="cart-modal"
      title="Mon panier"
      hide-header-close
      @hide="clearSelectedProduct"
    >
      <b-table striped hover :items="cart" :fields="cartFields">
        <template #cell(name)="data">
          {{ data.item.name }}
        </template>
        <template #cell(price)="data">
          {{ formatPrice(data.item.price) }}
        </template>
        <template #cell(quantity)="data">
          <b-button size="sm" @click="decrementQuantity(data.item)" variant="light">-</b-button>
          {{ data.item.quantity }}
          <b-button size="sm" @click="incrementQuantity(data.item)" variant="light">+</b-button>
        </template>
        <template #cell(actions)="data">
          <b-button size="sm" variant="btn-outline-danger" @click="removeItem(data.item.id)" title="Supprimer du panier ?"><i class="bi bi-trash"></i></b-button>
        </template>
      </b-table>
      <template #modal-footer>
        <b-button variant="danger" @click="clearCart">Vider mon panier</b-button>
        <b-button variant="secondary" @click="closeModal">Fermer</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { formatPriceMixin } from '../mixins/formatPriceMixin';

export default {
  name: 'ShoppingCart',
  props: {
    cart: Array
  },
  data() {
    return {
      cartFields: [
        { key: 'name', label: 'Nom' },
        { key: 'price', label: 'Prix' },
        { key: 'quantity', label: 'Quantité' },
        { key: 'actions', label: 'Action' }
      ]
    };
  },
  methods: {
    clearCart() {
      this.$emit('clear-cart');
    },
    removeItem(id) {
      this.$emit('remove-item', id);
    },
    closeModal() {
      this.$bvModal.hide('cart-modal');
    },
    incrementQuantity(item) {
      this.$emit('increment-quantity', item);
    },
    decrementQuantity(item) {
      this.$emit('decrement-quantity', item);
    }
  },
  mixins: [formatPriceMixin]
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1.5rem;
}

.modal-content {
  border-radius: 10px;
}

.modal-header {
  border-bottom: none;
}
</style>
