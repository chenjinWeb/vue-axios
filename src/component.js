import header from './components/header.vue';
import footer from './components/footer.vue';
import selectDate from './components/select-date.vue';
import state from "./components/state.vue"
import sheet from "./components/sheet.vue"
import bMapComponent from "./components/BMapComponent.vue"

import {Loadmore} from 'mint-ui';

export default function (Vue) {
  Vue.component(header.name, header);
  Vue.component(footer.name, footer);
  Vue.component(selectDate.name, selectDate);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(state.name,state);
  Vue.component(sheet.name,sheet);
  Vue.component(bMapComponent.name,bMapComponent);
}
