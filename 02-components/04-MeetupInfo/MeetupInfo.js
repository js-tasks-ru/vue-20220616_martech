import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },

  methods: {
    showMeetupDate(type) {
      if (type === 'locale') {
        return new Date(this.date).toLocaleDateString(navigator.language, {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      } else {
        let meetupDate = new Date(this.date);
        let dateParts = {
          year: meetupDate.getFullYear(),
          month: meetupDate.getMonth() < 10 ? '0' + (meetupDate.getMonth() + 1) : meetupDate.getMonth() + 1,
          day: meetupDate.getDate() < 10 ? '0' + meetupDate.getDate() : meetupDate.getDate(),
        };

        return Object.values(dateParts).join('-');
      }
    },
  },

  template: `
    <ul class="meetup-info">
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg"/>
      {{ organizer }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg"/>
      {{ place }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg"/>
      <time :datetime="showMeetupDate('datetime')">{{ showMeetupDate('locale') }}</time>
    </li>
    </ul>`,
});
