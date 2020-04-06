# 前端博客介绍

这是一个用nuxt以及vuetify开发的博客前端界面，pc端和手机端都能获得不错的体验

## 功能介绍

1. 基本的文章浏览
2. 按类型，事件，关键字搜索
3. 文章目录,移动端在文章页面右滑弹出
4. 图片展示
5. 适配手机端,不完美，但是能正常浏览
6. 小功能:下滑无限加载，右下角返回键，目录固定并根据浏览位置改变状态

## 用到的组件

``` js
   //package.json
  "dependencies": {
    "@nuxtjs/axios": "^5.3.6",
    "@nuxtjs/vuetify": "^1.11.0",
    "cross-env": "^5.2.0",
    "github-markdown-css": "^4.0.0",
    "less": "^3.10.3",
    "less-loader": "^5.0.0",
    "nuxt": "^2.0.0",
    "vue-directive-image-previewer": "^2.2.2"
  },
  //nuxt.config.json
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet",  href:"https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"},
      { rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism.min.css"}
    ],
      script:[
        {src:"https://cdn.bootcss.com/marked/0.8.0/marked.js",type: 'text/javascript', charset: 'utf-8'},
        {src:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/prism.min.js",dataManual:true,type: 'text/javascript', charset: 'utf-8'} ,
      ]
```

***

## 使用

1. 装好(写好)后台
2. 下载代码,修改根目录config.json中的路径为你的后台api地址(也可以用我这个，但是不保证会一直开着)

``` js
npm install
npm run build
npm start //或者pm2部署

```

后台代码:&ensp;[https://github.com/velor2012/nuxt_blog](https://github.com/velor2012/nuxt_blog)

## bug

1. 有时候会出现一直加载的情况，尚未清楚原因，点击首页就好了
2. 网页小屏浏览的时候点开抽屉再拉大页面，抽屉会无法关闭

## 待做

1. 调整文章页面的排版
2. 格式化时间，在后台格式化处理完之后发到前端
3. 首页文章应该按时间顺序展示
4. 文档整理

***

## 界面展示

1. 电脑端
![https://s2.ax1x.com/2020/03/10/8P2OV1.png](https://s2.ax1x.com/2020/03/10/8P2OV1.png)
![https://s2.ax1x.com/2020/03/10/8P9PiV.png](https://s2.ax1x.com/2020/03/10/8P9PiV.png)
2. 移动端
![https://s2.ax1x.com/2020/03/10/8Pikz8.jpg](https://s2.ax1x.com/2020/03/10/8Pikz8.jpg)
![https://s2.ax1x.com/2020/03/10/8PPJUI.jpg](https://s2.ax1x.com/2020/03/10/8PPJUI.jpg)
![https://s2.ax1x.com/2020/03/10/8PPY5t.jpg](https://s2.ax1x.com/2020/03/10/8PPY5t.jpg)
![https://s2.ax1x.com/2020/03/10/8PP1DH.jpg](https://s2.ax1x.com/2020/03/10/8PP1DH.jpg)
![https://s2.ax1x.com/2020/03/10/8PP3bd.jpg](https://s2.ax1x.com/2020/03/10/8PP3bd.jpg)

## 感谢阅读
