import Vue from 'vue';

// Text
import { plural } from 'assets/js/utils/text-utils';

Vue.filter('plural', plural);

// Numbers
import {
    leadingZero,
    prettyPhone,
    roundToMillions,
    splitThousands,
} from 'assets/js/utils/numbers-utils';

Vue.filter('leadingZero', leadingZero);
Vue.filter('splitThousands', splitThousands);
Vue.filter('roundToMillions', roundToMillions);
Vue.filter('prettyPhone', prettyPhone);

// Date&Time
import {
    dayByIndex,
    formatDateTime,
    monthByIndex,
} from 'assets/js/utils/date-time-utils';

Vue.filter('dayByIndex', dayByIndex);
Vue.filter('monthByIndex', monthByIndex);
Vue.filter('formatDateTime', formatDateTime);
