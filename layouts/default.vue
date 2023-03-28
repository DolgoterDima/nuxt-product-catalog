<template>
  <Resize id="app" class="default-layout layout">
    <Nuxt class="default-layout__page layout__page"/>
  </Resize>
</template>

<script>
import Resize from '@/components/layout/Resize';

export default {
  name: 'DefaultLayout',
  components: {
    Resize,
  },
};
</script>
