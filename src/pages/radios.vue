<template>
  <block>
    <demo-block title="基本用法" padding>
      <iox-radio-group
        v-model="radio1"
      >
        <iox-radio name="1" custom-class="demo-radio">单选框 1</iox-radio>
        <iox-radio name="2">单选框 2</iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="禁用状态" padding>
      <iox-radio-group
        disabled
        v-model="radio2"
      >
        <iox-radio name="1" custom-class="demo-radio">单选框 1</iox-radio>
        <iox-radio name="2">单选框 2</iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="自定义形状" padding>
      <iox-radio-group
        v-model="radioShape"
      >
        <iox-radio name="1" shape="square" custom-class="demo-radio">单选框</iox-radio>
        <iox-radio name="2" shape="square">单选框</iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <iox-radio-group
        v-model="radio3"
      >
        <iox-radio name="1" custom-class="demo-radio" checked-color="#07c160">单选框</iox-radio>
        <iox-radio name="2" checked-color="#07c160">单选框</iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="自定义大小" padding>
      <iox-radio-group
        v-model="radioSize"
      >
        <iox-radio name="1" icon-size="24px" custom-class="demo-radio">单选框</iox-radio>
        <iox-radio name="2" icon-size="24px">单选框</iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="自定义图标" padding>
      <iox-radio-group
        v-model="radio4"
      >
        <iox-radio use-icon-slot name="1">
          自定义图标
          <image
            slot="icon"
            :src="radio4 === '1' ? icon.active : icon.normal"
            class="icon"
            mode="widthFix"
          />
        </iox-radio>
        <iox-radio use-icon-slot name="2">
          自定义图标
          <image
            slot="icon"
            :src="radio4 === '2' ? icon.active : icon.normal"
            class="icon"
            mode="widthFix"
          />
        </iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="禁用文本点击" padding>
      <iox-radio-group
        v-model="radioLabel"
      >
        <iox-radio label-disabled name="1" custom-class="demo-radio">单选框 1</iox-radio>
        <iox-radio label-disabled name="2">单选框 2</iox-radio>
      </iox-radio-group>
    </demo-block>

    <demo-block title="与 Cell 组件一起使用">
      <iox-radio-group v-model="radio5">
        <iox-cell-group>
          <iox-cell
            title="单选框 1"
            clickable
            @click="onClick('1')"
          >
            <iox-radio slot="right-icon" name="1" />
          </iox-cell>
          <iox-cell
            title="单选框 2"
            clickable
            @click="onClick('2')"
          >
            <iox-radio slot="right-icon" name="2" />
          </iox-cell>
        </iox-cell-group>
      </iox-radio-group>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  radio1 = '1';
  radio2 = '2';
  radio3 = '1';
  radio4 = '1';
  radio5 = '1';
  radioSize = '1';
  radioLabel = '1';
  radioShape = '1';
  icon = {
    normal:
      'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
    active:
      'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
  }

  onClick(name: string) {
    this.radio5 = name;
  }
}
</script>

<style lang="less">
.demo-radio {
  margin-bottom: 10px;
}

.icon {
  width: 20px;
}
</style>
