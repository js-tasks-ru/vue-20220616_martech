<template>
  <div class="toast" :class="'toast_' + type">
    <ui-icon class="toast__icon" :icon="icon" />
    <span><slot /></span>
    <ui-close-button v-if="closeButton" @click="$emit('closeToast', toastId)">x</ui-close-button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiCloseButton from './UiCloseButton.vue';

export default {
  name: 'UiToast',

  components: {
    UiCloseButton,
    UiIcon,
  },

  props: {
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    toastId: {
      type: Symbol,
      required: true,
    },
    closeButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: ['closeToast'],
};
</script>

<style scoped>
.toast {
  position: relative;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_key {
  /*color: var(--blue-extra);*/
  color: var(--blue);
}
</style>
