import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import { isObj, requestAnimationFrame } from '../utils/utils';

const getClassNames = (name: string) => ({
  enter: `iox-${name}-enter iox-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `iox-${name}-enter-to iox-${name}-enter-active enter-to-class enter-active-class`,
  leave: `iox-${name}-leave iox-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `iox-${name}-leave-to iox-${name}-leave-active leave-to-class leave-active-class`,
});

export type Duration = {
  enter: number;
  leave: number;
} | number;

@Component
export default class Transition extends Vue {
  @Prop({
    type: String,
    default: 'fade'
  })
  name!: string;

  @Prop({
    type: [Number, Object],
    default: 300,
    validator(val: any) {
      if (typeof val === 'number') {
        return val > 0;
      } else if (typeof val === 'object') {
        if (!val.hasOwnProperty('enter') || !val.hasOwnProperty('leave')) {
          return false;
        }
        return true;
      }
      return false;
    }
  })
  duration!: Duration;

  // data
  type = '';
  inited = false;
  display = false;

  // 内部变量
  classes?: string | null = null;
  status?: string | null = null;
  transitionEnded = false;
  currentDuration = 300;

  enter() {
    const { duration, name } = (this as any);
    const classNames = getClassNames(name);
    const currentDuration = isObj(duration) ? duration.enter : duration;

    this.status = 'enter';
    this.$emit('before-enter');

    requestAnimationFrame(() => {
      this.checkStatus('enter');
      this.$emit('enter');

      this.inited = true;
      this.display = true;
      this.classes = classNames.enter;
      this.currentDuration = currentDuration;

      requestAnimationFrame(() => {
        this.checkStatus('enter');
        this.transitionEnded = false;

        this.classes =  classNames['enter-to'];
      });
    });
  }

  leave() {
    if (!this.display) {
      return;
    }

    const { duration, name } = (this as any);
    const classNames = getClassNames(name);
    const currentDuration = isObj(duration) ? duration.leave : duration;

    this.status = 'leave';
    this.$emit('before-leave');

    requestAnimationFrame(() => {
      this.checkStatus('leave');
      this.$emit('leave');

      this.classes = classNames.leave;
      this.currentDuration = currentDuration;

      requestAnimationFrame(() => {
        this.checkStatus('leave');
        this.transitionEnded = false;
        setTimeout(() => this.onTransitionEnd(), currentDuration);

        this.classes = classNames['leave-to'];
      });
    });
  }

  checkStatus(status: 'enter' | 'leave') {
    if (status !== this.status) {
      throw new Error(`incongruent status: ${status}`);
    }
  }

  onTransitionEnd() {
    if (this.transitionEnded) {
      return;
    }

    this.transitionEnded = true;
    this.$emit(`after-${this.status}`);

    const { show, display } = (this as any);
    if (!show && display) {
      this.display = false;
    }
  }
}

