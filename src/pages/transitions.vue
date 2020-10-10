<template>
  <demo-block title="基础用法" padding>
    <iox-cell title="Fade" @click="onClickFade" is-link />
    <iox-cell title="Fade Up" @click="onClickFadeUp" is-link />
    <iox-cell title="Fade Down" @click="onClickFadeDown" is-link />
    <iox-cell title="Fade Left" @click="onClickFadeLeft" is-link />
    <iox-cell title="Fade Right" @click="onClickFadeRight" is-link />
    <iox-cell title="Slide Up" @click="onClickSlideUp" is-link />
    <iox-cell title="Slide Down" @click="onClickSlideDown" is-link />
    <iox-cell title="Slide Left" @click="onClickSlideLeft" is-link />
    <iox-cell title="Slide Right" @click="onClickSlideRight" is-link />
    <iox-cell title="Custom" @click="onClickCustom" is-link />

    <iox-transition
      :show="show"
      :name="name"
      custom-class="block"
    />

    <iox-transition
      :show="showCustom"
      name=""
      :duration="{ enter: 300, leave: 1000 }"
      custom-class="block"
      enter-class="iox-enter-class"
      enter-active-class="iox-enter-active-class"
      leave-active-class="iox-leave-active-class"
      leave-to-class="iox-leave-to-class"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    />
  </demo-block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  show = false;
  name = 'fade';
  showCustom = false;
  
  onClickFade() {
    this.trigger('fade');
  }

  onClickFadeUp() {
    this.trigger('fade-up');
  }

  onClickFadeDown() {
    this.trigger('fade-down');
  }

  onClickFadeLeft() {
    this.trigger('fade-left');
  }

  onClickFadeRight() {
    this.trigger('fade-right');
  }

  onClickSlideUp() {
    this.trigger('slide-up');
  }

  onClickSlideDown() {
    this.trigger('slide-down');
  }

  onClickSlideLeft() {
    this.trigger('slide-left');
  }

  onClickSlideRight() {
    this.trigger('slide-right');
  }

  trigger(name: string) {
    this.name = name;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 500);
  }

  onClickCustom() {
    this.showCustom = true;

    setTimeout(() => {
      this.showCustom = false;
    }, 1000);
  }

  onBeforeEnter() {
    console.log('before enter');
  }

  onEnter() {
    console.log('enter');
  }

  onAfterEnter() {
    console.log('after enter');
  }

  onBeforeLeave() {
    console.log('before leave');
  }

  onLeave() {
    console.log('leave');
  }

  onAfterLeave() {
    console.log('after leave');
  }

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  background-color: #1989fa;
}

.iox-enter-active-class,
.iox-leave-active-class {
  transition-property: background-color, transform;
}

.iox-enter-class,
.iox-leave-to-class {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}

</style>
