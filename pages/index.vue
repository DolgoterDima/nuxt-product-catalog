<template>
  <div class="index-page">
    <select id="" v-model="currentCategory" name="">
      <option
        v-for="category in getCategories"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>

    <select id="" name="">
      <option value="rate">By rate</option>
      <option value="rateCount">By rate count</option>
      <option value="price">By rate count</option>
    </select>
    <section class="products">
      <h1 class="products__title">Products</h1>
      <div class="products__list">
        <ProductCard
          v-for="product in getProducts"
          :key="product.id"
          :category="product.category"
          :description="product.description"
          :image="product.image"
          :price="product.price"
          :rating="product.rating"
          :title="product.title"
          class="products__product"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCard from '../components/cards/ProductCard.vue';

export default {
  name: 'IndexPage',
  data() {
    return {
      currentCategory: '',
    };
  },
  components: { ProductCard },
  computed: {
    ...mapGetters({
      getProducts: 'common/getProducts',
      getCategories: 'common/getCategories',
    }),
  },
  async fetch({ store }) {
    await store.dispatch('common/fetchAllProducts');
    await store.dispatch('common/fetchAllCategories');
  },
  methods: {
    ...mapActions({
      fetchAllProducts: 'common/fetchAllProducts',
    }),
  },
  mounted() {
    this.currentCategory = this.getCategories[0];
  },
};
</script>
