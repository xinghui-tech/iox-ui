<template>
  <view
  :class="mainClass" :style="mainStyle"
  >
    <slot />
    <iox-icon
      v-if="closeable"
      name="close"
      :custom-class="spinnerClass"
      custom-style="font-size:12px;"
      @click="onClose"
    />
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import * as utils from '../../utils/utils';
import bem from '../../utils/bem';
import Base from '../../mixins/base';

const classPrefix = 'iox-tag';
declare type TYpe ={
  type?: string;
  value?: 'default';
} | string;

@Component
export default class IoxTag extends mixins(Base) {
  @Prop({
    type: String,
    default: ''
  })
  size!: string;

  @Prop({
    type: Boolean,
    default: false
  })
  mark!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  color!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  plain!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  round!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  textColor!: string;

  @Prop({
    type: [String,Object],
    default: 'primary',
  })
  type!: TYpe;

  @Prop({
    type: Boolean,
    default: false,
  })
  closeable!: boolean;



  get utils() {
    return utils;
  }

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const tag: string = bem('tag', [
      this.type,
      this.size,
      {
        mark: this.mark,
        plain: this.plain,
        round: this.round,
      }
    ]);
    return `custom-class ${this.customClass || ''} ${tag} ${this.plain ? 'iox-hairline--surround' : ''}`;
  }

  get mainStyle() {
    return `${this.color && !this.plain ? 'background-color: '+ this.color + ';' : ''} ${this.textColor || (this.color && this.plain) ? 'color: ' + (this.textColor || this.color) + ';' : '' }`;
  }

  get spinnerClass() {
    return `${this.classPrefix}__close`;
  }

  //hooks
  created() {
  }

  //methods
  onClose() {
    this.$emit('close');
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-tag/iox-tag.less';

</style>