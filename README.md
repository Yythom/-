安装依赖

```bash
npm i
# or
yarn
```

调试项目

```bash
# 选定要进行开发的平台，如 wechat，并调试
npm run dev:weapp   or    npm run buile:weapp
# or
yarn dev:weapp    or    yarn build:weapp
```


## 图标

通用图标全都以iconfont的形式存放在iconfont站点上，开发者需要加入iconfont的项目里面
```jsx
<Text className="iconfont icon-xxxx" />
```
xxx是图标的名称，设置css的font-size即可设置图标大小，设置color可以设置图标的颜色

## 注意
3、字体的粗细不要使用font-weight数值，细字选择lighter, 粗体选择bold！因为某些手机某些字体不支持数值粗细！

##  通用组件路径 /components
注：/components/style内置初始功能测试样式
##  通用功实用功能性函数 路径 /common/public.js  or  /common/publicFunc.js
