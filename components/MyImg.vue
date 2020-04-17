<template>
  <v-img
    :src="src"
    :lazy-src="lazySrc"
    :width="width"
    :height="height"
    :max-height="nolimit ? '' : screen_height / 2"
    @click="showImage"
    :contain="contain"
    data-trigger5
  >
    <slot></slot>
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>
<script>
import Bus from "~/pages/util";
export default {
  props: {
    src: { type: String },
    contain: { type: Boolean, default: true },

    lazySrc: { type: String },
    width: { type: String },
    height: { type: String },
    index: { type: Number },

    nolimit: { type: Boolean }
  },
  data() {
    return {
      dialog: false
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      _this.trigger = new _this.$sr({
        trigger: {
          offset: {
            viewport: {
              x: 0,
              y: (trigger, frame, direction) => {
                return trigger.visible ? 0 : 0.2;
              }
            }
          },
          toggle: {
            class: {
              in: ["fadeIn", "animated"],
              out: ["invisible"]
            }
          }
        }
      });
      _this.trigger.add("[data-trigger5]");
    });
  },
  computed: {
    screen_height() {
      return this.$store.getters.getHeight;
    }
  },
  methods: {
    showImage() {
      Bus.$emit("showImage", this.index);
    }
  }
};
</script>
<style lang="less">
.visible,
.invisible {
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>
