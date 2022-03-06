import Vue from 'vue';
import moment from 'moment';
moment.locale('tr');

export default ({ app }, inject) => {
  inject('moment', moment);
};

Vue.filter('formatDate', (date, format) => {
  return moment(date).format(format);
});
