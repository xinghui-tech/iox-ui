<template>
  <block>
    <demo-block title="基础用法" padding>
      <iox-uploader
        name="1"
        :file-list="fileList1"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block title="上传视频" padding>
      <iox-uploader
        name="7"
        accept="video"
        :file-list="fileList7"
        @after-read="afterRead"
        @delete="deleteItem"
      />
    </demo-block>

    <demo-block title="文件预览" padding>
      <iox-uploader
        name="2"
        :file-list="fileList2"
        multiple
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block title="隐藏上传按钮" padding>
      <iox-uploader
        name="2"
        :file-list="fileList2"
        multiple
        :show-upload="false"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block title="上传状态" padding>
      <iox-uploader
        name="8"
        :file-list="fileList8"
        multiple
        :max-count="2"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block title="限制上传数量" padding>
      <iox-uploader
        name="3"
        :file-list="fileList3"
        multiple
        :max-count="2"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block title="自定义上传样式" padding>
      <iox-uploader
        name="4"
        :file-list="fileList4"
        :max-count="2"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
        use-slot="true"
      >
        <iox-button icon="photo" type="primary">上传图片</iox-button>
      </iox-uploader>
    </demo-block>

    <demo-block title="上传前校验" padding>
      <iox-uploader
        name="5"
        :file-list="fileList5"
        @before-read="beforeRead"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
        :use-before-read="true"
      />
    </demo-block>

    <demo-block title="云存储上传" padding>
      <iox-uploader
        name="6"
        :file-list="fileList6"
        @before-read="beforeRead"
        @after-read="afterRead"
        @delete="deleteItem"
        @click-preview="clickPreview"
        :use-before-read="true"
      />
      <view class="demo-margin-bottom">
        <iox-button type="primary" @click="uploadToCloud">上传至云存储</iox-button>
      </view>
    </demo-block>
  </block>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from 'vue-class-component';
import Fonts from '../mixins/font';
import { wrapFunc, releaseFunc } from '../utils/func-utils';

@Component({
  data() {
    return {
      fileList1: [],
      fileList2: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        { url: 'https://img.yzcdn.cn/vant/tree.jpg' }
      ],
      fileList3: [{ url: 'https://img.yzcdn.cn/vant/sand.jpg' }],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      cloudPath: [],
      fileList7: [],
      fileList8: [
        {
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
          status: 'uploading',
          message: '上传中'
        },
        {
          url: 'https://img.yzcdn.cn/vant/tree.jpg',
          status: 'failed',
          message: '上传失败'
        }
      ]
    };
  },
})
export default class Index extends mixins(Fonts) {
  fileList6!: any[];
  cloudPath!: ICloud.UploadFileResult[];

  beforeRead(params: any) {
    const { file, callback = () => {} } = params;
    if (file.path.indexOf('jpeg') < 0) {
      wx.showToast({ title: '请选择jpg图片上传', icon: 'none' });
      callback(false);
      return;
    }
    callback(true);
  }

  afterRead(params: any) {
    const { file, name } = params;
    const fileList = (this as any)[`fileList${name}`];

    (this as any)[`fileList${name}`] = fileList.concat(file);
  }

  oversize() {
    wx.showToast({ title: '文件超出大小限制', icon: 'none' });
  }

  deleteItem(item: any) {
    const { index, name } = item;
    const fileList = (this as any)[`fileList${name}`];
    fileList.splice(index, 1);
    (this as any)[`fileList${name}`] = fileList;
  }

  clickPreview() {}

  uploadToCloud() {
    wx.cloud.init();
    const { fileList6: fileList = [] } = this;
    if (!fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = fileList.map((file, index) =>
        this.uploadFilePromise(`my-photo${index}.png`, file)
      );
      Promise.all(uploadTasks).then(data => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        const fileList = data.map(item => ({ url: item.fileID }));
        this.cloudPath = data;
        this.fileList6 = fileList;
      }).catch(e => {
        wx.showToast({ title: '上传失败', icon: 'none' });
        console.log(e);
      });
    }
  }

  uploadFilePromise(fileName: string, chooseResult: any) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path
    });
  }

  onShareAppMessage(share: WechatMiniprogram.ShowShareMenuOption) {
    
  }
}
</script>

<style lang="less">
page {
  background-color: #fff;
}
</style>
