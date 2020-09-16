export const commonProps = {
  placeholder: String,
  placeholderStyle: String,
  placeholderClass: String,
  disabled: Boolean,
  maxlength: {
    type: Number,
    default: -1,
  },
  cursorSpacing: {
    type: Number,
    default: 50,
  },
  autoFocus: Boolean,
  focus: Boolean,
  cursor: {
    type: Number,
    default: -1,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  holdKeyboard: Boolean,
};

export const inputProps = {
  type: {
    type: String,
    default: 'text',
  },
  password: Boolean,
  confirmType: String,
  confirmHold: Boolean,
};

export const textareaProps = {
  autoHeight: Boolean,
  fixed: Boolean,
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  disableDefaultPadding: {
    type: Boolean,
    default: true,
  },
};
