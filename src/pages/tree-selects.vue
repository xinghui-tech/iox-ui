<template>
  <block>
    <demo-block title="单选模式">
      <iox-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-item="onClickItem"
        @click-nav="onClickNav"
      ></iox-tree-select>
    </demo-block>

    <demo-block title="多选模式">
      <iox-tree-select
        :max="2"
        :items="items"
        :main-active-index="mainActiveIndexMulti"
        :active-id="activeIdMulti"
        @click-item="onClickItemMulti"
        @click-nav="onClickNavMulti"
      ></iox-tree-select>
    </demo-block>

    <demo-block title="自定义内容">
      <iox-tree-select
        :items="[{ text: '分组 1' }, { text: '分组 2' }]"
        height="55vw"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-item="onClickItem"
        @click-nav="onClickNav"
      >
        <iox-image
          v-if="mainActiveIndex === 0"
          src="https://img.yzcdn.cn/vant/apple-1.jpg"
          width="100%"
          height="100%"
          slot="content"
        />
        <iox-image
          v-elif="mainActiveIndex === 1"
          src="https://img.yzcdn.cn/vant/apple-2.jpg"
          width="100%"
          height="100%"
          slot="content"
        />
      </iox-tree-select>
    </demo-block>

    <demo-block title="徽标提示">
      <iox-tree-select
        :items="badgeItems"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @click-item="onClickItem"
        @click-nav="onClickNav"
      ></iox-tree-select>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

const config = {
  pro1Name: '浙江',
  pro1: [
    {
      text: '杭州',
      id: 1,
    },
    {
      text: '温州',
      id: 2,
    },
    {
      text: '宁波',
      id: 3,
      disabled: true,
    },
    {
      text: '义乌',
      id: 4,
    },
  ],
  pro2Name: '江苏',
  pro2: [
    {
      text: '南京',
      id: 5,
    },
    {
      text: '无锡',
      id: 6,
    },
    {
      text: '徐州',
      id: 7,
    },
    {
      text: '苏州',
      id: 8,
    },
  ],
  pro3Name: '福建',
  pro3: [
    {
      text: '泉州',
      id: 9,
    },
    {
      text: '厦门',
      id: 10,
    },
  ],
};

const items = [
  {
    text: config.pro1Name,
    children: config.pro1,
  },
  {
    text: config.pro2Name,
    children: config.pro2,
  },
  {
    text: config.pro3Name,
    disabled: true,
    children: config.pro3,
  },
];

@Component
export default class Index extends mixins(Fonts) {
  items = items;
  badgeItems = items.slice(0, 2).map((item, index) => {
    if (index === 0) {
      return { ...item, dot: true };
    }
    if (index === 1) {
      return { ...item, badge: 5 };
    }

    return item;
  });
  mainActiveIndex = 0;
  activeId: number | null = 0;
  mainActiveIndexMulti = 0;
  activeIdMulti: (string | number)[] = [];

  onClickNav(index: number) {
    this.mainActiveIndex = index || 0;
  }

  onClickItem(item: any) {
    const activeId = this.activeId === item.id ? null : item.id;

    this.activeId = activeId;
  }

  onClickNavMulti(index: number) {
    this.mainActiveIndexMulti = index || 0;
  }

  onClickItemMulti(item: any) {
    const { activeIdMulti } = this;
    const idx = activeIdMulti.indexOf(item.id);
    if (idx > -1) {
      activeIdMulti.splice(idx, 1);
    } else {
      activeIdMulti.push(item.id);
    }

    this.activeIdMulti = activeIdMulti;
  }

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
</style>
