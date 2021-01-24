<template>
  <view :class="mainClass" :style="mainStyle" >
    <view class="iox-uploader__wrapper">
      <!-- 预览样式 -->
      <block v-if="previewImage">
        <view
          v-for="(item, index) in lists"
          :key="index"
          class="iox-uploader__preview"
          @tap="onClickPreview(index)"
        >
          <image
            v-if="item.isImage"
            :mode="imageFit"
            :src="item.url || item.path"
            :alt="item.name || ('图片' + index)"
            class="iox-uploader__preview-image"
            :style="'width: ' + addUnit(previewSize) + '; height: ' + addUnit(previewSize) + ';' + previewCustomStyle"
            @tap="onPreviewImage(index)"
          />
          <view
            v-else
            class="iox-uploader__file"
            :style="'width: ' + addUnit(previewSize) + '; height: ' + addUnit(previewSize) + ';' + previewCustomStyle"
          >
            <iox-icon name="file-text-o" class="iox-uploader__file-icon" />
            <view class="iox-uploader__file-name iox-ellipsis">{{ item.name || item.url || item.path }}</view>
          </view>
          <view
            v-if="item.status === 'uploading' || item.status === 'failed'"
            class="iox-uploader__mask"
          >
          <iox-icon v-if="item.status === 'failed'" name="close" class="iox-uploader__mask-icon" />
          <iox-loading v-else custom-class="iox-uploader__loading" />
          <text v-if="item.message" class="iox-uploader__mask-message">{{ item.message }}</text>
          </view>
          <view
            v-if="deletable && item.deletable"
            class="iox-uploader__preview-delete"
            @tap.stop="deleteItem(index)"
          >
            <iox-icon name="close" class="iox-uploader__preview-delete-icon" />
          </view>
        </view>
      </block>
      <!-- 上传样式 -->
      <block v-if="isInCount">
        <view class="iox-uploader__slot" @tap="startUpload">
          <slot />
        </view>

        <!-- 默认上传样式 -->
        <view
          v-if="showUpload"
          :class="['iox-uploader__upload', disabled ? 'iox-uploader__upload--disabled': '']"
          :style="'width: ' + addUnit(previewSize) + '; height: ' + addUnit(previewSize) + ';' + previewCustomStyle"
          @tap="startUpload"
        >
          <iox-icon :name="uploadIcon" class="iox-uploader__upload-icon" />
          <text v-if="uploadText" class="iox-uploader__upload-text">{{ uploadText }}</text>
        </view>
      </block>
    </view>
  </view>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import Base from '../../mixins/base';
import { addUnit } from '../../utils/utils';
import { extractFunc } from '../../utils/func-utils';
import { chooseImageProps, chooseVideoProps } from './shared';
import {
  File,
  isImageFile,
  isVideo,
  chooseFile,
  isPromise
} from '../../utils/uploader-utils';

const classPrefix = 'iox-uploader';
@Component({
  props: {
    disabled: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    },
    uploadText: {
      type: String
    },
    useBeforeRead: {
      type: Boolean
    },
    afterRead: {
      type: String
    },
    beforeRead: {
      type: String
    },
    previewSize: {
      type: [String, Number],
      default: 80,
    },
    previewCustomStyle: {
      type: String
    },
    name: {
      type: [Number, String],
      default: '',
    },
    accept: {
      type: String,
      default: 'image',
    },
    fileList: {
      type: Array,
      default: [],
    },
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE,
    },
    maxCount: {
      type: Number,
      default: 100,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    showUpload: {
      type: Boolean,
      default: true,
    },
    previewImage: {
      type: Boolean,
      default: true,
    },
    previewFullImage: {
      type: Boolean,
      default: true,
    },
    imageFit: {
      type: String,
      default: 'scaleToFill',
    },
    uploadIcon: {
      type: String,
      default: 'camera',
    },
    ...chooseImageProps,
    ...chooseVideoProps,
  },
})
export default class IoxUploader extends mixins(Base) {
  // props
  fileList!: any[];
  maxCount!: number;
  multiple?: boolean;
  accept?: string;
  disabled!: boolean;
  beforeRead?: string;
  afterRead?: string;
  useBeforeRead?: string;
  maxSize!: number;
  previewFullImage!: boolean;
  capture?: ("camera" | "album")[];
  compressed?: boolean;
  maxDuration?: number;
  sizeType?: ("compressed" | "original")[];
  camera?: "back" | "front";

  // data
  lists: any[] = [];
  isInCount = true;
  name: any;

  get classPrefix() {
    return classPrefix;
  }

  addUnit(value: number | string) {
    const v = addUnit(value);
    return v;
  }

  created() {
    this.formatFileList();
  }

  @Watch('fileList')
  formatFileList() {
    const { fileList = [], maxCount } = this;
    const lists = fileList.map((item) => ({
      ...item,
      isImage:
        typeof item.isImage === 'undefined' ? isImageFile(item) : item.isImage,
      deletable:
        typeof item.deletable === 'undefined' ? true : item.deletable,
    }));
    this.lists = lists;
    this.isInCount = lists.length < maxCount;
  }

  getDetail(index?: number) {
    return {
      name: this.name,
      index: typeof index === 'undefined' ? this.fileList.length : index,
    };
  }

  startUpload() {
    const { maxCount, multiple, accept, capture, compressed, maxDuration, sizeType, camera, lists, disabled } = this;


    if (disabled) return;

    chooseFile({
      accept,
      multiple,
      capture,
      compressed,
      maxDuration,
      sizeType,
      camera,
      maxCount: maxCount - lists.length,
    }).then((res) => {
        let file = null;

        if (isVideo(res, accept)) {
          file = {
            path: res.tempFilePath,
            ...res,
          };
        } else {
          file = multiple ? res.tempFiles : res.tempFiles[0];
        }

        this.onBeforeRead(file);
      })
      .catch((error) => {
        this.$emit('error', error);
      });
  }

  onBeforeRead(file: any) {
    const { beforeRead, useBeforeRead } = this;
    let res: boolean | Promise<any> = true;

    if (beforeRead) {
      res = extractFunc(beforeRead)(file, this.getDetail());
    }

    if (useBeforeRead) {
      res = new Promise<void>((resolve, reject) => {
        this.$emit('before-read', {
          file,
          ...this.getDetail(),
          callback: (ok: boolean) => {
            ok ? resolve() : reject();
          },
        });
      });
    }

    if (!res) {
      return;
    }

    if (isPromise(res)) {
      res.then((data: any) => this.onAfterRead(data || file));
    } else {
      this.onAfterRead(file);
    }
  }

  onAfterRead(file: any) {
    const { maxSize, afterRead } = this;
    const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize)
      : file.size > maxSize;

    if (oversize) {
      this.$emit('oversize', { file, ...this.getDetail() });
      return;
    }

    if (afterRead) {
      extractFunc(afterRead)(file, this.getDetail());
    }

    this.$emit('after-read', { file, ...this.getDetail() });
  }

  deleteItem(index: number) {

    this.$emit('delete', {
      ...this.getDetail(index),
      file: this.fileList[index],
    });
  }

  onPreviewImage(index: number) {
    if (!this.previewFullImage) return;

    const { lists } = this;
    const item = lists[index];

    uni.previewImage({
      urls: lists
        .filter((item) => item.isImage)
        .map((item) => item.url || item.path),
      current: item.url || item.path,
      fail() {
        uni.showToast({ title: '预览图片失败', icon: 'none' });
      },
    });
  }

  onClickPreview(index: number) {
    const item = this.lists[index];

    this.$emit('click-preview', {
      ...item,
      ...this.getDetail(index),
    });
  }
}
</script>

<style lang="less">
@import '../../style/widget/iox-uploader/iox-uploader.less';

</style>