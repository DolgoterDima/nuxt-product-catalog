import Vue from 'vue';

export default (context, inject) => {
  const global = Vue.observable({
    variable: '',
  });

  inject('global', global);
};
