import Vue from 'vue'
import dayjs from 'dayjs';
// 时间格式化，输出年月日
export function formatDateFull(mydate){
    return dayjs(mydate).format('YYYY-MM-DD')
}

//只输出月日
export function formatDateMD(mydate){
    return dayjs(mydate).format('MM/DD')
}
let filters = {
    formatDateFull,
    formatDateMD
}
  
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  export default filters