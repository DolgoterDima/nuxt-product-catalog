<template>
  <div class="index-page"></div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted() {
    this.$router.push('/products');
  },
};
</script>
