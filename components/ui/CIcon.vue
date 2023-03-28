<template>
  <svg
    v-if="icon"
    v-html="icon.content"
    v-bind="icon.attributes"
    class="c-icon"
    :class="`c-icon--${iconModifier}`"
  />
</template>

<script>
export default {
  name: 'CIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: '',
    },
    modifier: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconModifier() {
      let { path, modifier } = this;
      if (path) path = `${path.split('/').join('-')}-`;
      if (modifier) modifier = `-${modifier}`;
      return `${path}${this.name}${modifier}`;
    },
    iconPath() {
      return this.path && `${this.path}/`;
    },
    icon() {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/svg/${this.iconPath}${this.name}.svg`);
      } catch {
        let errorMessage = `Icon "${this.name}" not found`;
        if (this.path) errorMessage += ` in path "${this.path}"`;
        console.error(errorMessage);
        return null;
      }
    },
  },
};
</script>
