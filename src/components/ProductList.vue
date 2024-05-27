<template>
  <div>
    <b-row>
      <ProductItem
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        :isAdded="isProductInCart(product.id)"
        @add-to-cart="addToCart"
        @show-details="showProductDetails"
      />
    </b-row>
    <ShoppingCart
      :cart="cart"
      @clear-cart="clearCart"
      @remove-item="removeItem"
      @update-cart="fetchCart"
      @increment-quantity="incrementQuantity"
      @decrement-quantity="decrementQuantity"
    />
    <ProductDetails
      v-if="selectedProduct"
      :product="selectedProduct"
      @clear-selected-product="clearSelectedProduct"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ProductItem from './ProductItem.vue';
import ShoppingCart from './ShoppingCart.vue';
import ProductDetails from './ProductDetails.vue';

export default {
  components: {
    ProductItem,
    ShoppingCart,
    ProductDetails
  },
  data() {
    return {
      products: [],
      cart: [],
      searchQuery: '',
      filteredProducts: [],
      selectedProduct: null
    }
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:8000/api/products').then(response => {
        this.products = response.data;
        this.filteredProducts = response.data;
      });
    },
    fetchCart() {
      const userId = this.getUserId();
      axios.get('http://localhost:8000/api/cart', {
        headers: { 'User-ID': userId }
      }).then(response => {
        this.cart = response.data.items || [];
      });
    },
    addToCart(product) {
      const userId = this.getUserId();
      const cartItem = this.cart.find(item => item.product_id === product.id);
      if (cartItem) {
        cartItem.quantity++;
        this.updateCart(cartItem);
      } else {
        axios.post('http://localhost:8000/api/cart', {
          product_id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1
        }, {
          headers: { 'User-ID': userId }
        }).then(() => {
          this.fetchCart();
        });
      }
    },
    updateCart(cartItem) {
      const userId = this.getUserId();
      axios.put(`http://localhost:8000/api/cart/${cartItem.id}`, {
        quantity: cartItem.quantity
      }, {
        headers: { 'User-ID': userId }
      }).then(() => {
        this.fetchCart();
      });
    },
    clearCart() {
      const userId = this.getUserId();
      axios.delete('http://localhost:8000/api/cart', {
        headers: { 'User-ID': userId }
      }).then(() => {
        this.cart = [];
        this.resetProductStates();
      });
    },
    removeItem(id) {
      const userId = this.getUserId();
      axios.delete(`http://localhost:8000/api/cart/${id}`, {
        headers: { 'User-ID': userId }
      }).then(() => {
        this.fetchCart();
        this.resetProductStates();
      });
    },
    incrementQuantity(item) {
      item.quantity++;
      this.updateCart(item);
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart(item);
      }
    },
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product => {
        return product.title.toLowerCase().includes(query);
      });
    },
    getUserId() {
      let userId = localStorage.getItem('user-id');
      if (!userId) {
        userId = this.createUUID();
        localStorage.setItem('user-id', userId);
      }
      return userId;
    },
    createUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      this.$bvModal.show('product-details-modal');
    },
    clearSelectedProduct() {
      this.selectedProduct = null;
    },
    isProductInCart(productId) {
      return this.cart.some(item => item.product_id === productId);
    },
    resetProductStates() {
      this.products.forEach(product => {
        const isInCart = this.cart.some(item => item.product_id === product.id);
        product.isAdded = isInCart;
      });
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchCart();
  }
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
