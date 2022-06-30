import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      required: false,
    },
    image: {
      required: false,
    },
  },

  computed: {
    meetupCoverImage() {
      return this.image ? { '--bg-url': `url('${this.image}')` } : this.image;
    },
  },

  template: `
    <div class="meetup-cover" :style="meetupCoverImage">
      <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
