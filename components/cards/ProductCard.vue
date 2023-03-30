<template>
  <nuxt-link :to="`products/${id}`" class="product-card">
    <header class="product-card__header">
      <span class="product-card__title">{{ title }}</span>
    </header>
    <div class="product-card__row">
      <span class="product-card__rating-legend"
        >{{ rating.rate }} ({{ rating.count }})</span
      >

      <CRating :rating="rating.rate" class="product-card__rating-star" />
    </div>

    <img :alt="title" :src="image" class="product-card__image" />

    <footer class="product-card__footer">
      <button class="product-card__button button" type="button">
        Add to cart
      </button>
      <span class="product-card__price">${{ price }}</span>
    </footer>
  </nuxt-link>
</template>

<script>
import CRating from '../ui/CRating.vue';

export default {
  name: 'ProductCard',
  components: { CRating },
  props: {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Object,
    },
  },
};
</script>
