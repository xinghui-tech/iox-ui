# iox-ui
<p align="center">
    <img alt="logo" src="https://res.oss.zhuyin.club/assets/images/iox-ui.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h1 align="center">IOX UI</h1>

IOX UI参考Vant（轻量、可靠的移动端 Vue 组件库）的设计和实现，在微信小程序组件库版本[vant-weapp](https://github.com/youzan/vant-weapp "vant-weapp")基础上实现的[uniapp](https://github.com/dcloudio/uni-app)版本。

针对uniapp的一些特性进行了修改和调整，同时增加一些新的组件，对一些组件功能也有所增强。

>当前参考的vant-weapp版本为：1.5.0。

## 安装
>yarn add @zhuyin/iox-ui

## UNIAPP使用
参考uniapp的[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)配置。
### 引入
>pages.json
```json
{
  //...
  "easycom": {
		"autoscan": true,
		"custom": {
			"iox-(.*)": "@zhuyin/iox-ui/lib/widget/iox-$1/iox-$1.vue"
		}
  }
  //...
}
```
### 使用
```vue
<template>
    <view>
      <iox-icon name="loading" />
    </view>
</template>

<script>
    // 这里不用import引入，也不需要在components内注册iox-icon组件。template里就可以直接用
    export default {
        data() {
            return {

            }
        }
    }
</script>
```

## 参考手册
<img alt="logo" src="https://img.yzcdn.cn/vant/logo.png" width="32" height="32" style="margin-bottom: 10px;" align="middle">https://youzan.github.io/vant/

## 组件一览表

|组件|Vant Weapp|IOX UI|备注|贡献者|
|:-|:-:|:-:|:-|:-:|
|**基础组件**|
|Button 按钮|✅|✅||老糊涂|
|Button Group 按钮组|☑️|✅|GoodActions 商品导航|老糊涂|
|Cell 单元格|✅|✅||老糊涂|
|Icon 图标|✅|✅|使用 [Font Awesome字体图标](http://www.fontawesome.com.cn/)|老糊涂|
|Image 图片|✅|✅||老糊涂|
|Layout 布局|✅|✅||老糊涂|
|Popup 弹出层|✅|✅||老糊涂|
|Transition 动画|✅|✅||老糊涂|
||
|**表单组件**|
|Calendar 日历|✅|✅|支持日期添加图标|老糊涂|
|Checkbox 复选框|✅|✅||老糊涂|
|Datetime Picker 时间选择|✅|✅||老糊涂|
|Field 输入框|✅|✅||老糊涂|
|Picker 选择器|✅|✅||老糊涂|
|Radio 单选框|✅|✅||老糊涂|
|Rate 评分|✅|✅||春雨|
|Search 搜索|✅|✅||春雨|
|Slider 滑块|✅|✅||春雨|
|Stepper 步进器|✅|✅||春雨|
|Switch 开关|✅|✅||老糊涂|
|Uploader 文件上传|✅||
||
|**反馈组件**|
|Action Sheet 上拉菜单|✅|✅||春雨|
|Dialog 弹出框|✅|✅|遵从Vue使用方式|老糊涂|
|Dropdown Menu 下拉菜单|✅|✅||老糊涂|
|Loading 加载|✅|✅||老糊涂|
|Notify 消息通知|✅|✅||春雨|
|Overlay 遮罩层|✅|✅||老糊涂|
|Share Sheet 分享面板|✅|✅||春雨|
|Swipe Cell 活动单元格|✅|✅||春雨|
|Toast 轻提示|✅|✅|遵从Vue使用方式|老糊涂|
||
|**展示组件**|
|Circle 进度条|✅||
|Collapse 折叠面板|✅|✅||老糊涂|
|Countdown 倒计时|✅||
|Divider 分割线|✅||
|Empty 空状态|✅||
|NoticeBar 通告栏|✅||
|Panel 面板|✅|✅|
|Progress 进度条|✅||
|Skeleton 骨架屏|✅||
|Steps 步骤条|✅||
|Sticky 粘性布局|✅|✅||老糊涂|
|Tag 标记|✅|✅||老糊涂|
|Tree Select 分类选择|✅||
||
|**导航组件**|
|Grid 宫格|✅|✅||老糊涂|
|IndexBar 索引栏|✅|||
|Sidebar 侧边导航|✅||
|NavBar 导航栏|✅||
|Tab 标签页|✅|✅||老糊涂|
|Tabbar 标签栏|✅||



## LICENSE

[MIT](https://en.wikipedia.org/wiki/MIT_License)