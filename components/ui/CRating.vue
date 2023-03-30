<template>
  <div
    :style="` background: linear-gradient(to right,orange 0%,orange ${ratingToPercent}%,#fff ${ratingToPercent}%,#fff 100%);`"
    class="rating"
  ></div>
</template>

<script>
const MAX_STARS_COUNT = 5;
export default {
  name: 'CRating',
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ratingToPercent() {
      return (this.rating * 100) / MAX_STARS_COUNT;
    },
  },
};
</script>
