const state = () => ({
  productsArr: [],
  categoriesArr: [],
});

const getters = {
  getCategories: ({ categoriesArr }) => categoriesArr,
  getProducts: ({ productsArr }) => productsArr,
  getProductById:
    ({ productsArr }) =>
    (productId) => {
      return productsArr.find((item) => +productId === item.id);
    },
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.productsArr = products;
  },
  SET_CATEGORIES(state, products) {
    state.categoriesArr = products;
  },
};

const actions = {
  fetchAllCategories({ commit }) {
    return this.$api({
      url: `products/categories`,
      method: 'GET',
    }).then((response) => {
      commit('SET_CATEGORIES', response.data);
    });
  },

  fetchAllProducts({ commit }) {
    return this.$api({
      url: `products/`,
      method: 'GET',
    }).then((response) => {
      commit('SET_PRODUCTS', response.data);
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
