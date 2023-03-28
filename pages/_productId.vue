<template>
  <div class="product-page">
    <h1 class="product-page__title">{{ productData.title }}</h1>
    <p class="product-page__description">{{ productData.description }}</p>

    <img
      :alt="productData.title"
      :src="productData.image"
      class="product-page__image"
    />

    <span class="product-page__price">${{ productData.price }}</span>
    <button class="product-card__button" type="button">Add to cart</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: '_id.vue',
  async fetch({ store }) {
    await store.dispatch('common/fetchAllProducts');
  },
  computed: {
    ...mapGetters({
      getProductById: 'common/getProductById',
    }),
    productData() {
      return this.getProductById(this.$route.params.productId);
    },
  },
  methods: {
    ...mapActions({
      fetchAllProducts: 'common/fetchAllProducts',
    }),
  } /* mounted() {
     this.fetchAllProducts();
   },*/,
};
</script>
