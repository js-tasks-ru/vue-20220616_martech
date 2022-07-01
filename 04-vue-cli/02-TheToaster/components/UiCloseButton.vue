<template>
  <button class="close">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'UiCloseButton',
};
</script>

<style scoped>
.close {
  position: absolute;
  border: 0;
  background-color: transparent;
  right: 2px;
  top: 2px;
  color: #000000;
  font-size: 16px;
}
</style>
