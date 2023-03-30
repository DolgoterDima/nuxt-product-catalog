<template>
  <div class="product-single">
    <div class="product-single__row">
      <button
        class="product-single__button product-single__button--back button"
        type="button"
        @click="$router.go(-1)"
      >
        <CIcon class="product-single__icon" name="arrow-left" />
        Back
      </button>
    </div>
    <h1 class="product-single__title">{{ productData.title }}</h1>

    <div class="product-single__row">
      <span class="product-single__rating-legend">
        {{ productData.rating.rate }} ({{ productData.rating.count }})
      </span>

      <CRating
        :rating="productData.rating.rate"
        class="product-single__rating-star"
      />
    </div>

    <div class="product-single__row product-single__row--data">
      <div class="product-single__side product-single__side--image">
        <img
          :alt="productData.title"
          :src="productData.image"
          class="product-single__image"
        />
      </div>
      <div class="product-single__side product-single__side--description">
        <p class="product-single__description">{{ productData.description }}</p>
        <span class="product-single__price">${{ productData.price }}</span>
        <button class="product-single__button button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CRating from '@/components/ui/CRating.vue';

export default {
  name: '_id.vue',
  async fetch({ store }) {
    await store.dispatch('common/fetchAllProducts');
  },
  components: {
    CRating,
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
  },
};
</script>
