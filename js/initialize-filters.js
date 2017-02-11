/**
 * Created by FoxyGirl on 11.02.2017.
 */
'use strict';

/**
 * Change image preview according filter.
 *
 * @param {Element} filterInput - Filter input.
 */
window.initializeFilters = function (filterInput) {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadFilterControlsNode = uploadNode.querySelector('.upload-filter-controls');
  var filterControlsNode = document.getElementsByName('upload-filter');
  var filterImagePreviewNode = uploadNode.querySelector('.filter-image-preview');

  clearCheckedInputs(filterControlsNode);
  setCheckedInputs(filterInput);
  toggleFilter(filterInput);

  /**
   * Clear checked attributes for inputs in DOM collection
   *
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
   *
   * @param {Element} input - DOM element input with radio or checkbox type
   */
  function setCheckedInputs(input) {
    input.checked = true;
    uploadFilterControlsNode.querySelector('[for="' + input.id + '"]').setAttribute('aria-checked', 'true');
  }

  /**
   * Change class in filterImagePreviewNode according filter control
   *
   * @param {Element} control - The element with filter control ID
   */
  function toggleFilter(control) {
    var filterName = control.id;
    filterName = filterName.replace('upload-', '');
    filterImagePreviewNode.className = 'filter-image-preview' + ' ' + filterName;
  }

};
