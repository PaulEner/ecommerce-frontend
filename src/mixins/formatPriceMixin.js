export const formatPriceMixin = {
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
    }
  }
};
