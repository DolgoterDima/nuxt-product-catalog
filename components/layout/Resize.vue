<template>
  <div :style="{ fontSize: `${fSize}px` }">
    <slot />
  </div>
</template>

<script>
const defaultWidth = 1440;
const defaultHeight = 720;
const minWidth = 768;
const minHeight = 600;
const defaultFont = 16;

export default {
  name: 'Resize',
  data() {
    return {
      vW: undefined,
      vH: undefined,
    };
  },
  computed: {
    isMobileStatus() {
      return this.$device.isMobileOrTablet || this.vW < minWidth;
    },
    fSize() {
      if (!this.vW || !this.vH) return defaultFont;

      const horizontalRatio = Math.max(minWidth, this.vW) / defaultWidth;
      const verticalRatio = Math.max(minHeight, this.vH) / defaultHeight;
      const minRatio = Math.min(horizontalRatio, verticalRatio);
      return this.isMobileStatus ? defaultFont : defaultFont * minRatio;
    },
  },
  methods: {
    onResize() {
      this.vW = window.innerWidth;
      this.vH = window.innerHeight;
      this.$root.$emit('resize');
    },
  },
  created() {
    if (process.client) {
      this.vW = window.innerWidth;
      this.vH = window.innerHeight;
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
};
</script>
