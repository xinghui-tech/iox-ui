import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { isDef, addUnit } from '../utils/utils';

/**
 * boxing class:
 * 1. border
 * 2. shadow
 * 3. margin
 * 4. padding
 * 5. text-color
 * 6. background-color
 */
@Component({
  // #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
  externalClasses: ['boxing-class']
  // #endif
})
export default class Boxing extends Vue {
  // #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
  @Prop({type: String})
  boxingClass?: string;
  // #endif

  @Prop({type: String})
  boxingStyle?: string;

  @Prop({type: String})
  boxingBgdUrl?: string;

  @Prop({type: [Number, String]})
  boxingWidth?: number | string;

  @Prop({type: [Number, String]})
  boxingHeight?: number | string;

  get boxingStyles(): string {
    // custom style
    let style = this.boxingStyle || '';
    if (style.trim().length > 0 && !style.trimEnd().endsWith(';')) {
      style += '; ';
    }

    // append background url
    if (isDef(this.boxingBgdUrl)) {
      style += `background-image: url('${addUnit(this.boxingBgdUrl)}'); `;
    }

    // append width
    if (isDef(this.boxingWidth)) {
      style += `;width:${addUnit(this.boxingWidth)}; `;
    }

    // append height
    if (isDef(this.boxingHeight)) {
      style += `;height:${addUnit(this.boxingHeight)}; `;
    }
    return style;
  }

}