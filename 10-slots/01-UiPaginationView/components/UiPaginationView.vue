<template>
  <div class="pagination-container">
    <slot v-for="item in pageItems" :key="item.id" :item="item"></slot>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pageItems() {
      let begin = (this.page - 1) * this.perPage;
      return this.items.slice(begin, begin + this.perPage);
    },
  },
};
</script>

<style></style>
