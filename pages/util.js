

//获取目录,有markdown文章的地方调用
const config = require("~/config.json")

const getTOC = (markdown_html)=>{
  let toc=[]
  let res = ''
  var patt = /<h(\d)?\s+id="(.*?)">\s+(\S.*)?\s+<\/h\d?>/g;;
  while (res = patt.exec(markdown_html)) {
    if(Number(res[1])<3)
      toc.push({layer:res[1],id:res[2],text:res[3]});
  }
  return toc
}
//获取图片的缩略图
const getThumb = (origin_href)=>{
  let findIndex = origin_href.search(/\/\w+-\w+(.+)?\.\w+/)
  if(findIndex<0){
    return null
  }
  let thumb_href = origin_href.slice(0,findIndex+1)+'thumb-'+origin_href.slice(findIndex+1)
  return thumb_href
}

//解析文章的标签
const resovleTag = (tags)=>{
  if(tags){
    return tags.split(',')
  }
  return ""
}
const randomColor = () => {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  // //在控制器中显示出随机生成的颜色(可以删除,无影响)
  // console.log("rgb("+r+","+g+","+b+")");
  //返回随机生成的颜色
  return "rgb(" + r + "," + g + "," + b + ")";
};
//只能在mounted后调用
const render = (app, markdown) => {
    //基本配置与代码高亮配置
    const renderer = new marked.Renderer();
    //重写renderer,把id加上,注意id要换成anchor_开头,同时替换内部非法字符,防止因为非法字符引起的vuetify调用selector报错
    renderer.heading = function(text, level) {
      const escapedText = text.replace(
        /[\s`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/g,
        "_"
      );
      return `
                    <h${level} id="anchor_${escapedText}">
                        ${text}
                    </h${level}>`;
    };
    let width = app.emoji_width;
    let index = 0
    renderer.image = function(href, title, text) {
      let token = href.split("/");
      let name = token[token.length - 1];
      let reg = /emoji-/;
      let thumb_href = getThumb(href)
      //index0的元素为空或者封面图
      index++
      app.images.push(href)
      if (reg.test(name)) {
        return `<my-img src="${href}" :index=${index} lazySrc="${thumb_href}"></my-img>`;
      } else {
        return `
              <my-img src="${href}" :index=${index} lazySrc="${thumb_href}"></my-img>
                    `;
      }
    };
    marked.setOptions({
      renderer: renderer,
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight: function(code) {
        return code;
      }
    });

    app.markdown_html = marked(markdown);
    app.$nextTick(() => {
      Prism.highlightAll();
    });
    app.toc = getTOC(app.markdown_html);
    app.$store.commit("setToc", app.toc);

};
import Vue from "vue";
export default new Vue();
export { randomColor, render, resovleTag,getThumb,getTOC,config };
