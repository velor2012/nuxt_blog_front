<template>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
            <v-card-title>
            <v-icon
                large
                left
            >
                mdi-magnify
            </v-icon>
            <span class="title font-weight-light">搜索</span>
            </v-card-title>
            <v-card-text>
                <v-col>
                    <v-text-field
                        v-model="keyword"
                        label="Outlined"
                        outlined
                        clearable
                    ></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn> -->
            <v-btn color="blue" dark @click="search">查找</v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import Bus from '~/pages/util'
export default {
    props:[],
    name:"searchDialog",
    data(){
        return{
            dialog:false,
            keyword:''
        }
    },
    mounted(){
        Bus.$on('showDialog',this.showSearchDialog)
    },
    methods:{
        showSearchDialog(){
            this.dialog = true
        },
        search(){
            if(this.$route.path!='/'){
                this.$router.push('/')
            }
            this.dialog = false
            Bus.$emit('search',this.keyword)
        }
    }
}
</script>