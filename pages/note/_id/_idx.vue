<template>
<Markdown v-if="syncNote && syncNote.subDoc[idx]" :content="syncNote.subDoc[idx].content" />
</template>
<script lang="ts">
import {Component,Vue, PropSync} from "nuxt-property-decorator"
import _ from 'lodash';
import Note from '~/types/Note';
import Markdown from '~/components/Markdown.vue'
@Component({
components: {
    Markdown
}
})
export default class SubDocPage extends Vue {
    @PropSync('note', { type: Object, required: true }) readonly syncNote:Note
    idx=0
    mounted() {
        this.idx = _.get(this, '$route.params.idx') || 0
    }
}
</script>