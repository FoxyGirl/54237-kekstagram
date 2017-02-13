/**
 * Created by FoxyGirl on 11.02.2017.
 */
'use strict';

/**
 * @module Create Scale widget.
 * @param {Element} element - The element with scaling controls.
 * @param {number} step - Step of scaling.
 * @param {number} startValue - Start value of widget.
 * @return {Function) - It returns {Object} - which has methods:
 * init - Init start value and add handlers.
 * remove - Remove handlers.
 * */
window.createScale = (function () {
  var MIN_RESIZE = 25;
  var MAX_RESIZE = 100;

  return function (element, step, startValue) {
    var decrementNode = element.querySelector('.upload-resize-controls-button-dec');
    var incrementNode = element.querySelector('.upload-resize-controls-button-inc');
    var resizeValueNode = element.querySelector('.upload-resize-controls-value');
    var filterImagePreviewNode = document.querySelector('.filter-image-preview');

    return {
      init: function () {
        changeImagePreviewScale(startValue);

        decrementNode.addEventListener('click', resizeDecImagePreviewHandler);
        incrementNode.addEventListener('click', resizeIncImagePreviewHandler);
      },
      remove: function () {
        decrementNode.removeEventListener('click', resizeDecImagePreviewHandler);
        incrementNode.removeEventListener('click', resizeIncImagePreviewHandler);
      }
    };

    /**
     * Resize with decreasing image preview
     * @private
     */
    function resizeDecImagePreviewHandler() {
      var currentValue = parseInt(resizeValueNode.value, 10);
      currentValue = currentValue - step < MIN_RESIZE ? MIN_RESIZE : currentValue - step;
      changeImagePreviewScale(currentValue);
    }

    /**
     * Resize with increasing image preview
     * @private
     */
    function resizeIncImagePreviewHandler() {
      var currentValue = parseInt(resizeValueNode.value, 10);
      currentValue = currentValue + step > MAX_RESIZE ? MAX_RESIZE : currentValue + step;
      changeImagePreviewScale(currentValue);
    }

    /**
     * Change scale of filterImagePreviewNode and uploadResizeValue
     * @private
     * @param {number} scaleValue - The value for image scaling
     */
    function changeImagePreviewScale(scaleValue) {
      resizeValueNode.value = scaleValue + '%';
      filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
    }
  };

})();
