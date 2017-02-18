/**
 * Created by FoxyGirl on 28.01.2017.
 */
'use strict';

(function () {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadFileNode = document.getElementById('upload-file');
  var uploadFileLabelNode = document.querySelector('.upload-file');
  var uploadFilterFormNode = uploadNode.querySelector('.upload-filter');
  var uploadFormCancelNode = uploadNode.querySelector('.upload-form-cancel');
  var uploadSelectImageNode = document.getElementById('upload-select-image');
  var scaleElemNode = uploadNode.querySelector('.upload-resize-controls');
  var uploadResizeDecNode = uploadNode.querySelector('.upload-resize-controls-button-dec');
  var filterImagePreviewNode = uploadNode.querySelector('.filter-image-preview');
  var START_RESIZE = 100;
  var STEP_RESIZE = 25;
  var prevFocusedElement = null;
  var scale = window.createScale(scaleElemNode, STEP_RESIZE, START_RESIZE, changeImagePreviewScale);
  var filters = window.initializeFilters(applyFilterImagePreview);

  uploadFileNode.addEventListener('change', function () {
    openUploadForm();
  });

  uploadFileLabelNode.addEventListener('keydown', function () {
    if (window.utils.isActivationEvent(event)) {
      event.currentTarget.click();
    }
  });

  /**
    * Change scale of filterImagePreviewNode
    * @param {number} scaleValue - The value for image scaling
    */
  function changeImagePreviewScale(scaleValue) {
    filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
  }

  /**
    * Change scale of filterImagePreviewNode
    * @param {string} filter - new filter
    */
  function applyFilterImagePreview(filter) {
    filterImagePreviewNode.className = 'filter-image-preview' + ' ' + filter;
  }

  /**
   * Open upload overlay pop-up
   */
  function openUploadForm() {
    prevFocusedElement = document.activeElement;

    uploadFormCancelNode.addEventListener('click', removeUploadForm);
    uploadFormCancelNode.addEventListener('keydown', removeKeyUploadForm);
    uploadFilterFormNode.addEventListener('submit', closeSubmitModalHandler);

    document.addEventListener('keydown', closeModalKeyHandler);
    document.addEventListener('focus', lockModalHandler, true);

    scale.init();
    filters.init();

    uploadSelectImageNode.classList.add('invisible');
    uploadNode.classList.remove('invisible');
    uploadResizeDecNode.focus();
    uploadNode.setAttribute('aria-hidden', 'false');
  }

  /**
   * Remove upload overlay pop-up
   */
  function removeUploadForm() {
    uploadNode.classList.add('invisible');
    uploadSelectImageNode.classList.remove('invisible');
    uploadNode.setAttribute('aria-hidden', 'true');
    uploadFileNode.value = '';
    prevFocusedElement.focus();

    uploadFormCancelNode.removeEventListener('click', removeUploadForm);
    uploadFormCancelNode.removeEventListener('keydown', removeKeyUploadForm);
    uploadFilterFormNode.removeEventListener('submit', closeSubmitModalHandler);

    document.removeEventListener('keydown', closeModalKeyHandler);
    document.removeEventListener('focus', lockModalHandler, true);

    scale.remove();
    filters.remove();
  }

  /**
   * Close Modal after submit from
   * @param {Event} event - The Event
   */
  function closeSubmitModalHandler(event) {
    event.preventDefault();
    removeUploadForm();
  }

  /**
   * Close Setup Modal by keys
   * @param {Event} event - The Event
   */
  function closeModalKeyHandler(event) {
    if (window.utils.isDeactivationEvent(event)) {
      removeUploadForm();
    }
  }

  /**
   * Close Setup Modal by keys.
   * @param {Event} event - The Event.
   */
  function removeKeyUploadForm(event) {
    if (window.utils.isActivationEvent(event)) {
      removeUploadForm();
    }
  }

  /**
   * Lock Modal
   */
  function lockModalHandler() {
    if (!uploadNode.contains(document.activeElement)) {
      uploadResizeDecNode.focus();
    }
  }

})();
