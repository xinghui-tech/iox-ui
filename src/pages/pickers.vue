<template>
  <block>
    <demo-block title="基础用法">
      <iox-picker
        :columns="column1"
        @change="onChange1"
      />
    </demo-block>

    <demo-block title="默认选中项">
      <iox-picker
        :columns="column1"
        :default-index="2"
        @change="onChange1"
      />
    </demo-block>

    <demo-block title="展示顶部栏">
      <iox-picker
        show-toolbar
        title="标题"
        :columns="column1"
        @change="onChange1"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block title="多列联动">
      <iox-picker
        :columns="column4"
        @change="onChange2"
        ref="picker"
      />
    </demo-block>

    <demo-block title="禁用选项">
      <iox-picker :columns="column2" />
    </demo-block>

    <demo-block title="加载状态">
      <iox-picker
        loading
        :columns="column4"
      />
    </demo-block>

    <iox-toast
      :show="toast.show" 
      :type="toast.type" 
      :mask="toast.mask" 
      :z-index="toast.zIndex" 
      :position="toast.position" 
      :forbid-click="toast.forbidClick" 
      :loading-type="toast.loadingType" 
      :message="toast.message" 
      :duration="toast.duration"
      @close="toast.show = false"
    />
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { 
  ToastOptions, toast,
} from '../utils/toast';

@Component
export default class Index extends mixins(Fonts) {
  toast: ToastOptions = toast();

  column1 = ['杭州', '宁波', '温州', '嘉兴', '湖州'];
  column2 = [
    { text: '杭州', disabled: true },
    { text: '宁波' },
    { text: '温州' }
  ];
  column3 = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
  };
  column4 = [
    {
      values: ['浙江', '福建'],
      className: 'column1'
    },
    {
      values: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      className: 'column2',
      defaultIndex: 2
    }
  ];

  onChange1(column: any) {
    const { value, index } = column;
    this.toast = toast(`Value: ${value}, Index：${index}`);
  }

  onConfirm(column: any) {
    const { value, index } = column;
    this.toast = toast(`Value: ${value}, Index：${index}`);
  }

  onCancel() {
    this.toast = toast('取消');
  }

  onChange2(column: any) {
    const { value } = column;
    (this.$refs.picker as any).setColumnValues(1, (this.column3 as any)[value[0]]);
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
</style>
