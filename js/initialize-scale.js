/**
 * Created by FoxyGirl on 11.02.2017.
 */
'use strict';

/**
 * Create Scale widget.
 *
 * @param {Element} element - The element with scaling controls.
 * @param {number} step - Step of scaling.
 * @param {number} startValue - Start value of widget.
 * @return {Function} removeScale - Remove handlers of widget.
 * */
window.createScale = function (element, step, startValue) {
  var MIN_RESIZE = 25;
  var MAX_RESIZE = 100;
  var STEP_RESIZE = step;
  var START_VALUE = startValue;
  var decrementElementNode = element.querySelector('.upload-resize-controls-button-dec');
  var incrementElementNode = element.querySelector('.upload-resize-controls-button-inc');
  var resizeValueNode = element.querySelector('.upload-resize-controls-value');
  var filterImagePreviewNode = document.querySelector('.filter-image-preview');

  changeImagePreviewScale(START_VALUE);

  decrementElementNode.addEventListener('click', resizeDecImagePreviewHandler);
  incrementElementNode.addEventListener('click', resizeIncImagePreviewHandler);

  return {
    removeScale: function () {
      decrementElementNode.removeEventListener('click', resizeDecImagePreviewHandler);
      incrementElementNode.removeEventListener('click', resizeIncImagePreviewHandler);
    }
  };

  /**
   * Resize with decreasing image preview
   */
  function resizeDecImagePreviewHandler() {
    var currentValue = parseInt(resizeValueNode.value, 10);
    currentValue = currentValue - STEP_RESIZE < MIN_RESIZE ? MIN_RESIZE : currentValue - STEP_RESIZE;
    changeImagePreviewScale(currentValue);
  }

  /**
   * Resize with increasing image preview
   */
  function resizeIncImagePreviewHandler() {
    var currentValue = parseInt(resizeValueNode.value, 10);
    currentValue = currentValue + STEP_RESIZE > MAX_RESIZE ? MAX_RESIZE : currentValue + STEP_RESIZE;
    changeImagePreviewScale(currentValue);
  }

  /**
   * Change scale of filterImagePreviewNode and uploadResizeValue
   *
   * @param {number} scaleValue - The value for image scaling
   */
  function changeImagePreviewScale(scaleValue) {
    resizeValueNode.value = scaleValue + '%';
    filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
  }
};
