let showToastFn = null;

export const toastManager = {
  setShow(fn) {
    showToastFn = fn;
  },
  show(toast) {
    if (showToastFn) {
      showToastFn(toast);
    }
  }
};