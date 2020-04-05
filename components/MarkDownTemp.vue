<script>
import Vue from "vue";
import Vuetify, { VImg,VResponsive,VBtn,VProgressCircular,VRow } from 'vuetify/lib'

// Vue.component('VBtn', VBtn)
Vue.component('VImg', VImg)
// Vue  
Vue.component('VProgressCircular', VProgressCircular)
Vue.component('VRow', VRow)
export default {
  props: {
    html: {
      type: String
    }
  },
  computed: {
    dynamicComponent() {
      return {
        //template: `<section>${this.html}</section>`,
        template: `<div>${this.html}</div>`,
        props: [
          /* define props as needed */
        ]
      };
    }
  },
  render(createElement, context) {
    // console.log(this.dynamicComponent);
    return createElement("div", [
      createElement(this.dynamicComponent, {
        props: {
          /* pass prop values as needed */
        }
      })
    ]);
  }
};
</script>
