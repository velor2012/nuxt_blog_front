export const randomColor = () => {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    // //在控制器中显示出随机生成的颜色(可以删除,无影响)
    // console.log("rgb("+r+","+g+","+b+")");
    //返回随机生成的颜色
    return "rgb(" + r + "," + g + "," + b + ")";
};
import Vue from 'vue'
export const Bus = new Vue();