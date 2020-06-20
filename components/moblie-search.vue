<template>
  <!-- 搜索按钮手机端 -->
  <div>
  <v-btn icon class="d-flex d-sm-none" v-if="$route.path == '/'">
    <v-icon @click.native="dialog=true">mdi-magnify</v-icon>
  </v-btn>

  <v-dialog v-model="dialog" persistent>
    <v-card color="#85B6BA">
      <v-card-text class="pa-3">
        <pc-search />
      </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
          <v-btn color="black" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Bus } from '../utils/common';
import PcSearch from '~/components/pc-search.vue'
@Component({
    components: {
        PcSearch
    }
})
export default class MobileSearch extends Vue {
    keyword=''
    dialog = false
    search(){
        Bus.$emit('search',this.keyword)
    }
}
</script>