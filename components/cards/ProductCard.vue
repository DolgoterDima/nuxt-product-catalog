<template>
  <div class="product-card">
    <h1 class="product-card__title">{{ title }}</h1>

    <img :alt="title" :src="image" class="product-card__image" />

    <button class="product-card__button" type="button">
      Add to cart ${{ price }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
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
