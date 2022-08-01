<script>
import { compile } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  beforeCreate() {
    this.$options.components = this.$props.components;
  },

  render(...args) {
    return compile(this.template).apply(this, args);
  },
};
</script>
