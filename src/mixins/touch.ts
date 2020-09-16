import Vue from 'vue';

const MIN_DISTANCE = 10;

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

export default Vue.extend({
  data() {
    return {
      direction: null as string | null,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },

    touchStart(event: TouchEvent) {
      this.resetTouchStatus();
      const touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },

    touchMove(event: TouchEvent) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction
        || getDirection(this.offsetX, this.offsetY);
    },
  }
});
