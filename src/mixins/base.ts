import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import bem from '../utils/bem';

const classPrefix = 'iox';

@Component({
  externalClasses: ['custom-class']
})
export default class Base extends Vue {
  customClass?: string;
  @Prop({
    type: String,
  })
  customStyle?: string;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix}`;
  }

  get mainStyle() {
    return this.customStyle || '';
  }

  protected bem(name: string, conf?: any) {
    return bem(name, conf);
  }
}
