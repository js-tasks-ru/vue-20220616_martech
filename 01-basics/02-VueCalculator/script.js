import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const rootComponent = defineComponent({
  data() {
    return {
      leftOperand: 0,
      rightOperand: 0,
      operator: 'sum',
    };
  },

  computed: {
    calculate() {
      switch (this.operator) {
        case 'sum':
          return this.leftOperand + this.rightOperand;
        case 'subtract':
          return this.leftOperand - this.rightOperand;
        case 'multiply':
          return this.leftOperand * this.rightOperand;
        case 'divide':
          return this.leftOperand / this.rightOperand;
      }
    },
  },
});

createApp(rootComponent).mount('#app');
