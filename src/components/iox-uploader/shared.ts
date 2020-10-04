// props for choose image
export const chooseImageProps = {
  sizeType: {
    type: Array,
    default: ['original', 'compressed'],
  },
  capture: {
    type: Array,
    default: ['album', 'camera'],
  },
};

// props for choose video
export const chooseVideoProps = {
  capture: {
    type: Array,
    default: ['album', 'camera'],
  },
  compressed: {
    type: Boolean,
    default: true,
  },
  maxDuration: {
    type: Number,
    default: 60,
  },
  camera: {
    type: String,
    default: 'back',
  },
};
