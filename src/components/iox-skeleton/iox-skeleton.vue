<template>
  <block>
    <view
      v-if="loading"
      :class="mainClass"
      :style="mainStyle"
    >
      <view
        v-if="avatar"
        :class="['avatar-class', bem('skeleton__avatar', [avatarShape])]"
        :style="'width:' + avatarSize + ';height:' + avatarSize"
      />
      <view :class="[bem('skeleton__content')]">
        <view
          v-if="title"
          :class="['title-class', bem('skeleton__title')]"
          :style="'width:' + titleWidth"
        />
        <view
          v-for="(item, index) in rowArray"
          :key="index"
          :class="['row-class', bem('skeleton__row')]"
          :style="'width:' + (isArray ? rowWidth[index] : rowWidth)"
        />
      </view>
    </view>
    <view v-else :class="mainClass" :style="mainStyle">
      <slot />
    </view>
  </block>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';

const classPrefix = 'iox-skeleton';

@Component({
  externalClasses: ['avatar-class', 'title-class', 'row-class', 'custom-class'],
})
export default class IoxSkeleton extends mixins(Base) {
  @Prop({
    type: Number,
    default: 0
  })
  row!: number;

  @Prop({
    type: Boolean,
  })
  title?: boolean;

  @Prop({
    type: Boolean,
  })
  avatar?: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  loading!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  animate!: boolean;

  @Prop({
    type: String,
    default: '',
  })
  textColor!: string;

  @Prop({
    type: String,
    default: '32px',
  })
  avatarSize!: string;

  @Prop({
    type: String,
    default: 'round',
  })
  avatarShape!: string;

  @Prop({
    type: String,
    default: '40%',
  })
  titleWidth!: string;

  @Prop({
    type: [String, Array],
    default: '100%',
  })
  rowWidth!: string | string[];

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    const classes: string = this.loading ? this.bem('skeleton', [{animate: this.animate}])
      : this.bem('skeleton__content');
    return `${classes} custom-class`;
  }

  isArray = false;
  rowArray = [];

  created() {
    this.rowArray = Array.from({ length: this.row });
    this.isArray = Array.isArray(this.rowWidth);
  }

  @Watch('row')
  onRowChanged(val: number) {
    this.rowArray = Array.from({ length: val });
  }

  @Watch('rowWidth')
  onRowWidthChanged(val: number) {
    this.isArray = Array.isArray(val);
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-skeleton/iox-skeleton.less';

</style>