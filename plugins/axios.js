export default ({ $axios }, inject) => {
  $axios.onRequest(() => {});

  $axios.onError(() => {});

  // // Create a custom axios instance
  const api = $axios.create({
    baseURL: 'https://fakestoreapi.com/',
  });
  //
  // // Inject to context as $api
  inject('api', api);
};
