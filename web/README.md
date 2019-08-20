# web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 开发网站的步骤
- 在style.scss里面
- 第一步：重置样式（写css要注意的点）
- 第二步：网站色彩和字体定义（colors,text）:
- 思考：
- 1.整体看网站：
- a.主色调是什么？用到几种颜色？
- b.字体大概是什么样子？字体的尺寸，大小，对齐方式？
- 第三步：通用的flex布局定义
- 第四步：常用的边距定义（margin，padding）

###卡片（封装-组件）--基础版
- 不共用部分：组件里面使用‘<slot></slot>’来指示添加的内容存放在组件的位置

###列表卡片--升级版
- 了解‘</slot>’的使用方式，v2.6语法