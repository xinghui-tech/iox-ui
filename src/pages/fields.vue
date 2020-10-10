<template>
  <block>
    <demo-block title="基础用法">
      <iox-cell-group>
        <iox-field v-model="value" placeholder="请输入用户名" :border="false" clearable />
      </iox-cell-group>
    </demo-block>

    <demo-block title="自定义类型">
      <iox-cell-group>
        <iox-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          right-icon="question"
          right-icon-class="custom-icon"
          required
          @click-icon="onClickIcon"
        />
        <iox-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :border="false"
        />
      </iox-cell-group>
    </demo-block>

    <demo-block title="禁用输入框">
      <iox-cell-group>
        <iox-field
          value="输入框已禁用"
          label="用户名"
          left-icon="user"
          disabled
          :border="false"
        />
      </iox-cell-group>
    </demo-block>

    <demo-block title="错误提示">
      <iox-cell-group>
        <iox-field
          v-model="username2"
          label="用户名"
          placeholder="请输入用户名"
          error
        />
        <iox-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号格式错误"
          :border="false"
        />
      </iox-cell-group>
    </demo-block>

    <demo-block title="内容对齐方式">
      <iox-cell-group>
        <iox-field
          v-model="username3"
          label="用户名"
          placeholder="请输入用户名"
          input-align="right"
        />
      </iox-cell-group>
    </demo-block>

    <demo-block title="高度自适应">
      <iox-cell-group>
        <iox-field
          v-model="message"
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
          :border="false"
        />
      </iox-cell-group>
    </demo-block>

    <demo-block title="插入按钮">
      <iox-cell-group>
        <iox-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          use-button-slot
          :border="false"
        >
          <iox-button slot="button" size="small" type="primary" custom-class="button">发送验证码</iox-button>
        </iox-field>
      </iox-cell-group>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';

@Component
export default class Index extends mixins(Fonts) {
  sms = '';
  value = '';
  password = '';
  username = '';
  username2 = '';
  username3 = '';
  message = '';
  phone = '1365577';

  onClickIcon() {
    uni.showToast({
      icon: 'none',
      title: '点击图标'
    });
  }

  onShareAppMessage() {
    
  }
}
</script>

<style lang="less">
.button {
  vertical-align: middle;
}

.custom-icon {
  color: #1989fa;
}
</style>
