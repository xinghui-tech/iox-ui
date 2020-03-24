import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
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

  @Prop({
    type: String,
    default: 'test'
  })
  baseProp!: string;

  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `custom-class ${this.customClass || ''} ${this.classPrefix}`;
  }

  get mainStyle() {
    return this.customStyle || '';
  }
}
