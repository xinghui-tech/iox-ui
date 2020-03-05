import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

import { isObj } from '../utils/utils';

const getClassNames = (name: string) => ({
  enter: `iox-${name}-enter iox-${name}-enter-active enter-class enter-active-class`,
  'enter-to': `iox-${name}-enter-to iox-${name}-enter-active enter-to-class enter-active-class`,
  leave: `iox-${name}-leave iox-${name}-leave-active leave-class leave-active-class`,
  'leave-to': `iox-${name}-leave-to iox-${name}-leave-active leave-to-class leave-active-class`
});

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));


@Component
export default class transition extends Vue {
  @Prop({
    type: String,
    default: '',
  })
  customStyle!:string;

  @Prop({
    type: Boolean,
    default: true,
  })
  show!: boolean;

  @Watch('show')
  observeShow(newVal?: Boolean, oldVal?: Boolean){
    newVal ? this.enter() : this.leave();
  }

  @Prop({
    type: [Number, Object],
    default: 300,
  })
  duration!: number | object;

  @Watch('show')
  observeDuration(newVal?: Boolean, oldVal?: Boolean) {

  }

  @Prop({
    type: String,
    default: 'fade',
  })
  name!: string;



  type: string = '';
  classes: string = '';
  status: string = '';
  inited: boolean = false;
  display: boolean = false;
  transitionEnded: boolean = false;
  currentDuration: any = null;


  private created() {
    this.enter();
  }


  private  enter(): void {
    const duration = this.duration;
    const name = this.name;
    const classNames = getClassNames(name);
    const currentDuration = isObj(duration) ? duration.enter : duration;

    this.status = 'enter';
    this.$emit('before-enter');

    Promise.resolve()
      .then(nextTick)
      .then(() => {
        this.checkStatus('enter');
        this.$emit('enter');

        this.inited=true;
        this.display= true;
        this.classes=classNames.enter;
        this.currentDuration = currentDuration;
      })
      .then(nextTick)
      .then(() => {
        this.checkStatus('enter');
        this.transitionEnded = false;
        this.classes = classNames['enter-to'];
      })
      .catch(() => { });
  }

  private  leave(): void {
    if (!this.display) {
      return;
    }

    const duration = this.duration;
    const name = this.name;
    const classNames = getClassNames(name);
    const currentDuration = isObj(duration) ? duration.leave : duration;

    this.status = 'leave';
    this.$emit('before-leave');

    Promise.resolve()
      .then(nextTick)
      .then(() => {
        this.checkStatus('leave');
        this.$emit('leave');

        this.classes = classNames.leave;
        this.currentDuration = currentDuration;

      })
      .then(nextTick)
      .then(() => {
        this.checkStatus('leave');
        this.transitionEnded = false;
        setTimeout(() => this.onTransitionEnd(), currentDuration);

        this.classes = classNames['leave-to'];

      })
      .catch(() => { });
  }

  private  checkStatus(status: 'enter' | 'leave'): void {
    if (status !== this.status) {
      throw new Error(`incongruent status: ${status}`);
    }
  }

  private  onTransitionEnd():void {
    if (this.transitionEnded) {
      return;
    }

    this.transitionEnded = true;
    this.$emit(`after-${this.status}`);

    const show = this.show;
    const display = this.display;
    if (!show && display) {
      this.display = false;
    }
  }

}

