<template>
  <div class="error">{{ error.statusCode }}</div>
</template>

<script>
export default {
  name: 'error',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
