import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const rootComponent = defineComponent({
  data() {
    return {
      calcElements: {
        leftOperand: 0,
        rightOperand: 0,
        operator: 'sum',
      },
      calcResult: 0,
    };
  },

  watch: {
    calcElements: {
      handler() {
        this.calculate();
      },
      deep: true,
    },
  },

  methods: {
    calculate() {
      switch (this.calcElements.operator) {
        case 'sum':
          this.calcResult = this.calcElements.leftOperand + this.calcElements.rightOperand;
          break;
        case 'subtract':
          this.calcResult = this.calcElements.leftOperand - this.calcElements.rightOperand;
          break;
        case 'multiply':
          this.calcResult = this.calcElements.leftOperand * this.calcElements.rightOperand;
          break;
        case 'divide':
          this.calcResult = this.calcElements.leftOperand / this.calcElements.rightOperand;
          break;
      }
    },
  },
});

createApp(rootComponent).mount('#app');
