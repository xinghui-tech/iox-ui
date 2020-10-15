<template>
  <block>
    <demo-block title="基础用法" padding>
      <iox-button type="primary" @click="show1 = !show1">弹出菜单1</iox-button>
      <iox-action-sheet
        :show="show1"
        :actions="action1"
        closeOnClickAction
        @select="toggleActionSheet1"
        @close="show1 = !show1"
      />
    </demo-block>

    <demo-block title="选项状态" padding>
      <iox-button type="primary" @click="show2 = !show2">弹出菜单2</iox-button>
      <iox-action-sheet
        :show="show2"
        :actions="action2"
        @close="show2 = !show2"
        @cancel="show2 = !show2"
        @select="toggleActionSheet2"
      />
    </demo-block>

    <demo-block title="展示取消按钮" padding>
      <iox-button type="primary" @click="show3 = !show3">弹出菜单3</iox-button>
      <iox-action-sheet
        :show="show3"
        :actions="action1"
        cancel-text="取消"
        @close="show3 = !show3"
        @cancel="show3 = !show3"
      >
      </iox-action-sheet>
    </demo-block>

    <demo-block title="展示描述信息" padding>
      <iox-button type="primary" @click="show4 = !show4">弹出菜单4</iox-button>
      <iox-action-sheet
        :show="show4"
        :actions="action1"
        description="这是一段描述信息"
        @close="show4 = !show4"
      >
      </iox-action-sheet>
    </demo-block>

    <demo-block title="展示标题栏" padding>
      <iox-button type="primary" @click="show5 = !show5">弹出菜单5</iox-button>
      <iox-action-sheet
        :show="show5"
        title="标题"
        @close="show5 = !show5"
      >
        <view class="content">内容</view>
      </iox-action-sheet>
    </demo-block>

    <demo-block title="微信开发能力" padding>
      <iox-button type="primary" @click="show6 = !show6">弹出菜单6</iox-button>
      <iox-action-sheet
        :show="show6"
        :actions="action6"
        title="标题"
        @close="show6 = !show6"
        @getuserinfo="onGetUserInfo"
      >
      </iox-action-sheet>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {


  show1= false
  show2= false
  show3= false
  show4= false
  show5= false
  show6= false
  action1= [
    { name: '选项' },
    { name: '选项' },
    { name: '选项', subname: '副文本' }
  ]
  action2= [
    { name: '选项', color: '#07c160' },
    { loading: true },
    { name: '禁用选项', disabled: true }
  ]
  action6= [
    { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
  ]


  toggleActionSheet1(v: any) {
    console.log('show1 ====',v);
  }
  toggleActionSheet2(v: any) {
    console.log('show2 ====',v);
  }

  onGetUserInfo(e: any) {
    console.log(e.detail);
  }


  onShareAppMessage() {
    return {
      title: 'IOX UI 上拉菜单',
      // #ifdef MP-ALIPAY
      desc: 'IOX UI 组件 iox-action-sheet'
      // #endif
    };
  }
}
</script>

<style lang="less">
.content {
  padding: 20px;
}
</style>
