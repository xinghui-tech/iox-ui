import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

const getTransitionClasses = (type: string) => ({
  enter: `iox-${type}-enter iox-${type}-enter-active enter-class enter-active-class`,
  enterTo: `iox-${type}-enter-to iox-${type}-enter-active enter-to-class enter-active-class`,
  leave: `iox-${type}-leave iox-${type}-leave-active leave-class leave-active-class`,
  leaveTo: `iox-${type}-leave-to iox-${type}-leave-active leave-to-class leave-active-class`
});

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

export type Duration = {
  enter: number;
  leave: number;
} | number;

@Component
export default class Transition extends Vue {
  // datas
  showTransition = true;
  /**
   * 毫秒
   */
  transitionDuration: Duration = 300;
  /**
   * default is fade, options: fade, slide
   */
  transitionType = 'fade';
  
  transitionClasses: string = [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ].join(' ');

  transitionInited = false;
  transitionCurrentDuration = 300;;
  transitionDisplay = false;

  private mTransitionStatus?: 'enter' | 'leave';
  private mTransitionEnded?: boolean;


  // watch
  @Watch('showTransition')
  showTransitionChanged(newVal?: boolean, oldVal?: boolean){
    (newVal && newVal !== oldVal) ? this.enter() : this.leave();
  }

  // hooks
  protected mounted() {
    this.$nextTick(() => {
      if (this.showTransition) {
        this.enter();
      }
    });
  }

  protected  onTransitionEnd() {
    if (this.mTransitionEnded) {
      return;
    }

    this.mTransitionEnded = true;
    this.$emit(`transition-after-${this.mTransitionStatus}`);

    const show = this.showTransition;
    const display = this.transitionDisplay;
    if (!show && display) {
      this.transitionDisplay = false;
    }
  }

  // methods
  private enter(): void {
    const duration = this.transitionDuration;
    const classes = getTransitionClasses(this.transitionType);
    const currentDuration = typeof duration === 'number' ? duration : duration.enter;

    this.mTransitionStatus = 'enter';
    this.$emit('transition-before-enter');

    Promise.resolve()
      .then(nextTick)
      .then(() => {
        this.checkStatus('enter');
        this.$emit('transition-enter');

        this.transitionInited = true;
        this.transitionDisplay = true;
        this.transitionClasses = classes.enter;
        this.transitionCurrentDuration = currentDuration;
      })
      .then(nextTick)
      .then(() => {
        this.checkStatus('enter');
        this.mTransitionEnded = false;
        this.transitionClasses = classes.enterTo;
      })
      .catch(() => { });
  }

  private leave(): void {
    if (!this.transitionDisplay) {
      return;
    }

    const duration = this.transitionDuration;
    const classes = getTransitionClasses(this.transitionType);
    const currentDuration = typeof duration === 'number' ? duration : duration.leave;

    this.mTransitionStatus = 'leave';
    this.$emit('transition-before-leave');

    Promise.resolve()
      .then(nextTick)
      .then(() => {
        this.checkStatus('leave');
        this.$emit('transition-leave');

        this.transitionClasses = classes.leave;
        this.transitionCurrentDuration = currentDuration;
      })
      .then(nextTick)
      .then(() => {
        this.checkStatus('leave');
        this.mTransitionEnded = false;
        setTimeout(() => this.onTransitionEnd(), currentDuration);

        this.transitionClasses = classes.leaveTo;
      })
      .catch(() => { });
  }

  private  checkStatus(status: 'enter' | 'leave'): void {
    if (status !== this.mTransitionStatus) {
      throw new Error(`incongruent status: ${status}`);
    }
  }
}

