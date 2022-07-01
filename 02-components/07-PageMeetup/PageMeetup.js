import { defineComponent } from './vendor/vue.esm-browser.js';
import { fetchMeetupById } from './meetupService.js';

import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetupState: 'loading',
      meetup: null,
      errorMessage: '',
    };
  },

  watch: {
    meetupId: {
      handler() {
        this.getMeetupData();
      },
      immediate: true,
    },
  },

  methods: {
    getMeetupData() {
      this.meetupState = 'loading';

      fetchMeetupById(this.meetupId)
        .then((meetup) => {
          this.meetup = meetup;
          this.meetupState = 'successful';
        })
        .catch((error) => {
          this.meetupState = 'error';
          this.errorMessage = error.message;
        });
    },
  },

  // language=HTML
  template: `
    <div class="page-meetup">
      <template v-if="meetupState === 'successful'">
        <meetup-view :meetup="meetup"></meetup-view>
      </template>

      <ui-container v-if="meetupState === 'loading'">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="meetupState === 'error'">
        <ui-alert>{{ errorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});
