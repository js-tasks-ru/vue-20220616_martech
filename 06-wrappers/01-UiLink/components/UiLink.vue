<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type: [String, Object],
      required: false,
      default: 'RouterLink',
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
