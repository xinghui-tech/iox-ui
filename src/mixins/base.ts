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

  @Prop({
    type: String,
  })
  customStyle?: string;

  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({
    type: String,
  })
  customClass?: string;
  // #endif

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    let classes = `${this.classPrefix} custom-class`;
    // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
    classes = `${this.classPrefix} ${this.customClass || ''}`;
    // #endif
    return classes;
  }

  get mainStyle() {
    return this.customStyle || '';
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
