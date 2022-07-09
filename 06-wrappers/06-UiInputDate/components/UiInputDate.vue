<template>
  <ui-input ref="inputDate" v-model="modelValueProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        return this.modelValue ? this.dateTypeFormatter() : '';
      },
      set() {
        let dateAsNumber = this.$refs['inputDate'].$refs['input'].valueAsNumber;
        this.$emit('update:modelValue', dateAsNumber);
      },
    },
  },

  methods: {
    dateTypeFormatter() {
      const date = new Date(this.modelValue);
      const dateParts = {
        date: [
          date.getUTCFullYear(),
          (date.getUTCMonth() + 1).toString().padStart(2, '0'),
          date.getUTCDate().toString().padStart(2, '0'),
        ],
        time: [date.getUTCHours().toString().padStart(2, '0'), date.getUTCMinutes().toString().padStart(2, '0')],
      };

      switch (this.type) {
        case 'date':
          return dateParts.date.join('-');
        case 'time':
          return dateParts.time.join(':');
        case 'datetime-local':
          return [dateParts.date.join('-'), dateParts.time.join(':')].join('T');
      }
    },
  },
};
</script>
