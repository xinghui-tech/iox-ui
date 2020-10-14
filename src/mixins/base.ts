import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import bem from '../utils/bem';

const classPrefix = 'iox';
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['custom-class']
  // #endif
})
export default class Base extends Vue {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  customClass?: string;
  // #endif

  // #ifdef MP-ALIPAY
  @Prop({type: String})
  className?: string;

  @Prop({type: String})
  style?: string;
  // #endif

  @Prop({type: String})
  customStyle?: string;

  get classPrefix() {
    return classPrefix;
  }

  get _rootClasses() {
    let cls = 'custom-class';
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    cls = (this.customClass || '');
    // #endif
    // #ifdef MP-ALIPAY
    cls = this.className ?  `${this.className} ${cls}` : cls;
    // #endif
    return cls;
  }

  get _rootStyles() {
    let css = this.customStyle || '';
    // #ifdef MP-ALIPAY
    css = this.style ? `${this.style.trimEnd().endsWith(';') ? this.style : this.style + ';'} ${css}` : css;
    // #endif
    return css;
  }

  get mainClass() {
    return `${this.classPrefix} ${this._rootClasses}`;
  }

  get mainStyle() {
    return this._rootStyles;
  }

  protected bem(name: string, conf?: any) {
    return bem(name, conf);
  }

  public setThen(data: any) {
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        (this as any)[k] = data[k];
      }
    }
    return new Promise((resolve) => this.$nextTick(resolve));
  }

  public getRect(selector: string, all?: boolean): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> {
    return new Promise((resolve) => {
      uni.createSelectorQuery()
        .in(this)[all ? 'selectAll' : 'select'](selector)
        .boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        })
        .exec();
    });
  }
}
