import Vue from 'vue';
import Component from 'vue-class-component';
const classPrefix = 'iox';

const props = {
  props: {
    customClass: String,
    customStyle: String,
  },
}

export {
  props
}
@Component
export default class base extends Vue {
  customClass?: string;
  customStyle?: string;
 
  get classPrefix() {
    return classPrefix;
  }

  get mainClass() {
    return `${this.customClass || ''} ${this.classPrefix}`;
  }

  get mainStyle() {
    return this.customStyle || '';
  }
}
