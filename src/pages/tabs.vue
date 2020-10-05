<template>
  <block>
    <demo-block title="基础用法">
      <iox-tabs :active="1" @change="onChange">
        <iox-tab
          v-for="(item, index) in tabs4"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="通过名称匹配">
      <iox-tabs active="b">
        <iox-tab
          v-for="(item, index) in tabsWithName"
          :key="index"
          :name="item.name"
          :title="'标签 ' + item.index"
        >
          <view class="content">
            {{ '内容' + item.index}}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="横向滚动">
      <iox-tabs>
        <iox-tab
          v-for="(item, index) in tabs6"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="禁用标签">
      <iox-tabs @disabled="onClickDisabled">
        <iox-tab
          v-for="(item, index) in tabs3"
          :key="index"
          :disabled="index === 1"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="样式风格">
      <iox-tabs type="card" tab-class="special-tab">
        <iox-tab
          v-for="(item, index) in tabs3"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content-2">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="点击事件">
      <iox-tabs @click="onClick">
        <iox-tab
          v-for="(item, index) in tabs2"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="粘性布局">
      <iox-tabs sticky>
        <iox-tab
          v-for="(item, index) in tabs4"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="切换动画">
      <iox-tabs animated>
        <iox-tab
          v-for="(item, index) in tabs4"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="滑动切换">
      <iox-tabs swipeable>
        <iox-tab
          v-for="(item, index) in tabs4"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>

    <demo-block title="自定义标题">
      <iox-tabs :active="1" @change="onChange" tab-class="special-tab" tab-active-class="special-tab-active">
        <iox-icon
          slot="nav-right"
          name="search"
          custom-class="right-nav"
          @click="onClickNavRight"
        />
        <iox-tab
          v-for="(item, index) in tabs4"
          :key="index"
          :title="'标签 ' + item"
          :dot="index === 1"
          :info="index === 2 ? 99 : null"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </iox-tab>
      </iox-tabs>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  tabs2 = [1, 2];
  tabs3 = [1, 2, 3];
  tabs4 = [1, 2, 3, 4];
  tabs6 = [1, 2, 3, 4, 5, 6];
  tabsWithName = [
    { name: 'a', index: 1 },
    { name: 'b', index: 2 },
    { name: 'c', index: 3 }
  ];

  onClickDisabled(tab: any) {
    uni.showToast({
      title: `标签 ${tab.index + 1} 已被禁用`,
      icon: 'none'
    });
  }

  onChange(tab: any) {
    uni.showToast({
      title: `切换到标签 ${tab.index + 1}`,
      icon: 'none'
    });
  }

  onClickNavRight() {
    uni.showToast({
      title: '点击 right nav',
      icon: 'none'
    });
  }

  onClick(tab: any) {
    uni.showToast({
      title: `点击标签 ${tab.index + 1}`,
      icon: 'none'
    });
  }
  
  onPageScroll() {
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
page {
  padding-bottom: 300px;
}

.content {
  padding: 20px;
  background-color: #fff;
}

.content-2 {
  padding: 20px;
}

.right-nav {
  padding: 0 10px;
  line-height: 44px !important;
  background-color: #fff;
}

.special-tab {
  transition: all 0.25s ease-in-out;
}

.special-tab-active {
  font-size: 1.05em !important;
}
</style>
