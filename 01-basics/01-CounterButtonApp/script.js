import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const rootComponent = defineComponent({
  data() {
    return {
      count: 99,
    };
  },
});
const app = createApp(rootComponent);
app.mount('#app');
