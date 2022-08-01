<template>
  <slot v-if="promiseData.state === 'pending'" name="pending"></slot>
  <slot v-else-if="promiseData.state === 'rejected'" :error="promiseData.result" name="rejected"></slot>
  <slot v-else :result="promiseData.result" name="fulfilled"></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      promiseData: {
        state: 'pending',
        result: null,
      },
    };
  },

  watch: {
    promise: {
      async handler() {
        this.promiseData.state = 'pending';
        try {
          let result = await this.promise;
          this.promiseData.state = 'fulfilled';
          this.promiseData.result = result;
        } catch (error) {
          this.promiseData.state = 'rejected';
          this.promiseData.result = error;
        }
      },
      immediate: true,
    },
  },
};
</script>
