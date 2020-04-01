import VueDirectiveImagePreviewer from "vue-directive-image-previewer";
import "vue-directive-image-previewer/dist/assets/style.css";
import Vue from "vue";
import ScrollTrigger from '@terwanerik/scrolltrigger'
Vue.prototype.$sr = ScrollTrigger
Vue.use(VueDirectiveImagePreviewer);
