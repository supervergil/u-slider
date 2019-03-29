# u-slider

随便写了一个滑动组件，你觉得可以就随便用用，适合服务端渲染的项目，seo 友好。目前只能横着用。

## 安装

1. 直接使用 lib 中的 u-slider，通过 script 引入页面即可。
2. 通过 npm 安装

```
npm install u-slider
```

## 用法

引入 js 后，直接添加 u-slider 属性即可使用。

```
<div style="width: 200px;height: 100px;">
    <div u-slider loop autoplay="2000">
        <div>
            <a style="background: #ccc">轮播图1</a>
            <a style="background: #eee">轮播图2</a>
            <a style="background: #ddd">轮播图3</a>
        </div>
    </div>
</div>
```

> loop 和 autoplay 属性都是可选的。外层的宽高记得设置，具体参考 demo。

## 兼容性

IE 9 及以上，各大主流浏览器。
