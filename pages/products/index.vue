<template>
  <div class="product-page">
    <div class="product-page__filters">
      <select
        id=""
        v-model="selectedCategory"
        class="product-page__select"
        @change="onChangeCategory"
      >
        <option
          v-for="category in getCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <select
        v-model="selectedSort"
        class="product-page__select"
        @change="onChangeSort"
      >
        <option value="price-desc">Price: High to Low</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-count-desc">Rating count: High to Low</option>
        <option value="rating-count-asc">Rating count: Low to High</option>
      </select>
    </div>

    <section class="product-page__products products">
      <h1 class="products__title">Products</h1>
      <div class="products__list">
        <ProductCard
          v-for="product in filteredAndSortedProducts"
          :id="product.id"
          :key="product.id"
          :category="product.category"
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
import ProductCard from '@/components/cards/ProductCard.vue';

/*const dictSelected = {
  all: 'all',
  completed: 'completed',
  uncompleted: 'uncompleted',
  favorites: 'favorites',
};*/
export default {
  name: 'ProductPage',
  data() {
    return {
      selectedCategory: 'All',
      selectedSort: 'price-asc',
    };
  },
  components: { ProductCard },
  computed: {
    ...mapGetters({
      getProducts: 'common/getProducts',
      getCategories: 'common/getCategories',
    }),

    filteredAndSortedProducts() {
      const filteredProducts =
        this.selectedCategory === 'All'
          ? [...this.getProducts]
          : this.getProducts.filter(
              (product) => product.category === this.selectedCategory
            );

      const sortFunctions = {
        'price-asc': (a, b) => a.price - b.price,
        'price-desc': (a, b) => b.price - a.price,
        'rating-desc': (a, b) => b.rating.rate - a.rating.rate,
        'rating-asc': (a, b) => a.rating.rate - b.rating.rate,
        'rating-count-desc': (a, b) => b.rating.count - a.rating.count,
        'rating-count-asc': (a, b) => a.rating.count - b.rating.count,
      };

      return filteredProducts.sort(sortFunctions[this.selectedSort]);
    },
  },
  async fetch({ store }) {
    await store.dispatch('common/fetchAllProducts');
    await store.dispatch('common/fetchAllCategories');
  },
  methods: {
    ...mapActions({
      fetchAllProducts: 'common/fetchAllProducts',
    }),

    onChangeCategory(e) {
      const queryParams = { ...this.$route.query };
      queryParams.category = e.target.value;

      this.$router.push({ query: queryParams });
    },
    onChangeSort(e) {
      const queryParams = { ...this.$route.query };
      queryParams.sortBy = e.target.value;

      this.$router.push({ query: queryParams });
    },
    setDefaultFilters() {
      const { category, sortBy } = this.$route.query;
      if (category) this.selectedCategory = category;
      if (sortBy) this.selectedSort = sortBy;
    },
  },
  mounted() {
    this.setDefaultFilters();
  },
};
</script>
