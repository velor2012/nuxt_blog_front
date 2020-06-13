<template>
  <!-- 搜索按钮手机端 -->
  <div>
  <v-btn icon class="d-flex d-sm-none" v-if="$route.path == '/'">
    <v-icon @click.native="dialog=true">mdi-magnify</v-icon>
  </v-btn>

  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        <v-icon large left>mdi-magnify</v-icon>
        <span class="title font-weight-light">搜索</span>
      </v-card-title>
      <v-card-text>
        <v-col>
          <v-text-field v-model="keyword" label="Outlined" outlined clearable></v-text-field>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn> -->
        <v-btn color="blue" dark @click="search">查找</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Bus } from '../utils/common';
@Component({
    components: {}
})
export default class MobileSearch extends Vue {
    keyword=''
    dialog = false
    search(){
        Bus.$emit('search',this.keyword)
    }
}
</script>