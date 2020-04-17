# 前端博客介绍

这是一个用nuxt以及vuetify开发的博客前端界面，pc端和手机端都能获得不错的体验，基本上博客该有的功能都做了。  

[预览](https://www.velor2012.xyz:3000)

## 功能介绍

1. 基本的文章浏览
2. 按类型，事件，关键字搜索
3. 文章目录,移动端在文章页面右上角抽屉点出
4. 图片展示
5. 评论
6. 适配手机端,不完美，但是能正常浏览
7. 小功能:下滑无限加载，右下角返回键，图片懒加载与一些动画

***

## 使用

1. 装好(写好)后台
2. 下载代码,修改根目录config.json.example内容，保存为json
里面是[gitalk](https://github.com/gitalk/gitalk)的配置以及后台api地址

``` js
npm install
npm run build
npm start //或者pm2部署

```

后台代码:&ensp;[https://github.com/velor2012/nuxt_blog](https://github.com/velor2012/nuxt_blog)

## bug

1. 由于网络问题导致有时候评论加载不了

## 待做

1. 使用scss重写css样式
2. 等后端重写完再根据api调整前端代码。
3. 统计文章浏览次数
4. 报表分析

***

## 界面展示

1. 电脑端  
欢迎页面
![main-7b128740-7bcf-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-7b128740-7bcf-11ea-9934-53615e574118.png)
文章列表页面
![main-87efae20-7bcf-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-87efae20-7bcf-11ea-9934-53615e574118.png)
文章详情页
![main-940650b0-7bcf-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-940650b0-7bcf-11ea-9934-53615e574118.png)
![main-a4726ab0-7bcf-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-a4726ab0-7bcf-11ea-9934-53615e574118.png)
图片展示
![main-be42d880-7bcf-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-be42d880-7bcf-11ea-9934-53615e574118.png)
作者页面
![main-ed8c40e0-7bcf-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-ed8c40e0-7bcf-11ea-9934-53615e574118.png)
评论页面
![main-fa12d060-80be-11ea-9445-f3d61b77e1c4.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-fa12d060-80be-11ea-9445-f3d61b77e1c4.png)

2. 移动端  
欢迎页面
![main-3a3c5d30-7bd0-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-3a3c5d30-7bd0-11ea-9934-53615e574118.png)
文章列表页面
![main-4b0a4640-7bd0-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-4b0a4640-7bd0-11ea-9934-53615e574118.png)
右边抽屉
![main-56bd4500-7bd0-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-56bd4500-7bd0-11ea-9934-53615e574118.png)
左边抽屉
![main-5f7a8360-7bd0-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-5f7a8360-7bd0-11ea-9934-53615e574118.png)
文章详情页面
![main-69896f10-7bd0-11ea-9934-53615e574118.png](https://cdn.jsdelivr.net/gh/velor2012/imageHosting/blog/5e83efe462076003c3534e55/main-69896f10-7bd0-11ea-9934-53615e574118.png)
## 感谢阅读
