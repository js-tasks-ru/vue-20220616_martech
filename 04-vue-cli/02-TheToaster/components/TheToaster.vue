<template>
  <div class="toasts">
    <ui-toast
      v-for="(toast, index) in toasts"
      :key="index"
      :type="toast.type"
      :icon="toast.icon"
      :close-button="toast.closeButton"
      @closeToast="removeToast(toast)"
    >
      {{ toast.text }}
    </ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(text, timeout = 5000) {
      this.appendToast('success', 'check-circle', text, timeout, true);
    },
    error(text, timeout = 2500) {
      this.appendToast('error', 'alert-circle', text, timeout);
    },
    key(text) {
      this.appendToast('key', 'key', text);
    },
    appendToast(type, icon, text, timeout = 5000, closeButton = false) {
      let toast = { type, icon, text, closeButton };
      toast.intervalId = setTimeout(this.removeToast, timeout, toast);
      this.toasts.push(toast);
    },
    removeToast(toast) {
      let toastIndex = this.toasts.indexOf(toast);
      clearTimeout(this.toasts[toastIndex].intervalId); // only for @closeToast
      this.toasts.splice(toastIndex, 1);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}
</style>
