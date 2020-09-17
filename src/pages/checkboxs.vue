<template>
  <block>
    <demo-block title="基本用法">
      <iox-checkbox
        v-model="checkbox1"
        data-key="checkbox1"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
    </demo-block>

    <demo-block title="禁用状态">
      <iox-checkbox
        disabled
        :value="false"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
      <iox-checkbox
        disabled
        :value="true"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
    </demo-block>

    <demo-block title="自定义形状">
      <iox-checkbox
        v-model="checkboxShape"
        data-key="checkboxShape"
        shape="square"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
    </demo-block>

    <demo-block title="自定义颜色">
      <iox-checkbox
        v-model="checkbox2"
        data-key="checkbox2"
        checked-color="#07c160"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
    </demo-block>

    <demo-block title="自定义大小">
      <iox-checkbox
        icon-size="25px"
        v-model="checkboxSize"
        data-key="checkboxSize"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
    </demo-block>

    <demo-block title="自定义图标">
      <iox-checkbox
        use-icon-slot
        v-model="checkbox3"
        data-key="checkbox3"
        custom-class="demo-checkbox"
      >
        自定义图标
        <image
          slot="icon"
          class="icon"
          mode="widthFix"
          :src="checkbox3 ? activeIcon : inactiveIcon"
        />
      </iox-checkbox>
    </demo-block>

    <demo-block title="禁用文本点击">
      <iox-checkbox
        label-disabled
        v-model="checkboxLabel"
        data-key="checkboxLabel"
        custom-class="demo-checkbox"
      >
        复选框
      </iox-checkbox>
    </demo-block>

    <demo-block title="复选框组">
      <iox-checkbox-group v-model="result" data-key="result">
        <iox-checkbox
          v-for="item in list"
          :key="item"
          :name="item"
          custom-class="demo-checkbox"
        >
          复选框 {{ item }}
        </iox-checkbox>
      </iox-checkbox-group>
    </demo-block>

    <demo-block title="限制最大可选数">
      <iox-checkbox-group v-model="result2" data-key="result2" max="2">
        <iox-checkbox
          v-for="item in list"
          :key="item"
          :name="item"
          custom-class="demo-checkbox"
        >
          复选框 {{ item }}
        </iox-checkbox>
      </iox-checkbox-group>
    </demo-block>

    <demo-block title="搭配单元格组件使用">
      <iox-checkbox-group v-model="result3" data-key="result3">
        <iox-cell-group >
          <iox-cell
            v-for="(item, index) in list"
            :key="item"
            :title="'复选框' + item"
            value-class="value-class"
            clickable
            @click="toggle(index)"
          >
            <iox-checkbox @tap.stop="noop" :class="'checkboxes-' + index" :name="item" />
          </iox-cell>
        </iox-cell-group>
      </iox-checkbox-group>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  checkbox1 = true;
  checkbox2 = true;
  checkbox3 = true;
  checkboxLabel = true;
  checkboxSize = true;
  checkboxShape = true;
  list = ['a', 'b', 'c'];
  result = ['a', 'b'];
  result2 = [];
  result3 = [];
  activeIcon = 'https://img.yzcdn.cn/vant/user-active.png';
  inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png';

  toggle(index: number) {
    const checkbox = (this as any).$scope.selectComponent(`.checkboxes-${index}`);
    checkbox.$vm.toggle();
  }

  noop() {}
}
</script>

<style lang="less">
.demo-checkbox-group {
  margin: 10px 0 0 20px;
}

.demo-checkbox {
  margin: 10px 0 0 20px;
}

.value-class {
  flex: none !important;
}

.icon {
  width: 20px;
}
</style>
