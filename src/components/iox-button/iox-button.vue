<template>
	<button>
    <block wx:if="{{ loading }}">
      <van-loading
        custom-class="loading-class"
        size="{{ loadingSize }}"
        type="{{ loadingType }}"
        color="{{ loadingColor(type,color,plain) }}"
      />
      <view
        wx:if="{{ loadingText }}"
        class="van-button__loading-text"
      >
        {{ loadingText }}
      </view>
    </block>
    <block wx:else>
      <van-icon
        wx:if="{{ icon }}"
        size="1.2em"
        name="{{ icon }}"
        class="van-button__icon"
        custom-style="line-height: inherit;"
      />
      <view class="van-button__text">
        <slot />
      </view>
    </block>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class IoxButton extends Vue {
  @Prop({
    type: String,
    default: '确定',
  })
  name: string = '确定';
}
</script>

<style lang="less">

</style>