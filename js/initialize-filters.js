/**
 * Created by FoxyGirl on 11.02.2017.
 */
'use strict';

/**
 * @module Filters widget.
 * @return {Function) - It returns {Object} - which has methods:
 * init - Init fist filter and add handlers.
 * remove - Remove handlers.
 */
window.initializeFilters = (function () {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadFilterControlsNode = uploadNode.querySelector('.upload-filter-controls');
  var filterControlsNode = document.getElementsByName('upload-filter');
  var SPACE_KEY_CODE = 32;
  var applyFilter = null;

  return function (callback) {
    applyFilter = callback;
    return {
      init: function () {
        uploadFilterControlsNode.addEventListener('click', filterClickHandler);
        uploadFilterControlsNode.addEventListener('keydown', filterClickHandler);

        changeImagePreview(filterControlsNode[0]);
      },
      remove: function () {
        uploadFilterControlsNode.removeEventListener('click', filterClickHandler);
        uploadFilterControlsNode.removeEventListener('keydown', filterClickHandler);
      }
    };
  };

  /**
   * Change Image Preview
   * @private
   * @param {Element} filterInput - Filter input
   */
  function changeImagePreview(filterInput) {
    clearCheckedInputs(filterControlsNode);
    setCheckedInputs(filterInput);
    toggleFilter(filterInput);
  }

  /**
   * Clear checked attributes for inputs in DOM collection
   * @private
   * @param {Elements} inputs - DOM collection of inputs with radio or checkbox type
   */
  function clearCheckedInputs(inputs) {
    [].forEach.call(inputs, function (input) {
      input.checked = false;
      uploadFilterControlsNode.querySelector('[for="' + input.id + '"]').setAttribute('aria-checked', 'false');
    });
  }

  /**
   * Set checked attributes for input
   * @private
   * @param {Element} input - DOM element input with radio or checkbox type
   */
  function setCheckedInputs(input) {
    input.checked = true;
    uploadFilterControlsNode.querySelector('[for="' + input.id + '"]').setAttribute('aria-checked', 'true');
  }

  /**
   * Change class in filterImagePreviewNode according filter control
   * @private
   * @param {Element} control - The element with filter control ID
   */
  function toggleFilter(control) {
    var filterName = control.id;
    filterName = filterName.replace('upload-', '');

    if (typeof applyFilter === 'function') {
      applyFilter(filterName);
    }
  }

  /**
   * Change image preview
   * @private
   * @param {Event} event - The Event
   */
  function filterClickHandler(event) {
    if (event.keyCode === SPACE_KEY_CODE) {
      event.preventDefault(); // Prevent window scrolling
      event.stopPropagation(); // Prevent bubbling to window
    }

    if (window.utils.isActivationEvent(event) || event.type === 'click') {
      var target = event.target;
      while (target !== uploadFilterControlsNode) {
        if (target.tagName === 'LABEL') {
          var filterInput = document.getElementById(target.getAttribute('for'));
          changeImagePreview(filterInput);
          return;
        }
        target = target.parentNode;
      }
    }
  }
})();
