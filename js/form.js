/**
 * Created by FoxyGirl on 28.01.2017.
 */
'use strict';

(function () {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadFormCancelNode = uploadNode.querySelector('.upload-form-cancel');
  var uploadFileNode = document.getElementById('upload-file');
  var uploadResizeDecNode = uploadNode.querySelector('.upload-resize-controls-button-dec');
  var uploadFileLabelNode = document.querySelector('.upload-file');
  var uploadFilterForm = uploadNode.querySelector('.upload-filter');
  var scaleElemNode = uploadNode.querySelector('.upload-resize-controls');
  var START_RESIZE = 100;
  var STEP_RESIZE = 25;
  var ESCAPE_KEY_CODE = 27;
  var scale = window.createScale(scaleElemNode, STEP_RESIZE, START_RESIZE);
  var filters = window.initializeFilters();

  uploadFileLabelNode.addEventListener('keydown', onSetupKeydownHandler);

  uploadFileNode.addEventListener('change', function () {
    window.openForm();
    initUploadPopup();
  });

  /**
   * Handler for keydown.
   * @param {Event} event - The Event.
   */
  function onSetupKeydownHandler(event) {
    if (window.utils.isActivationEvent(event)) {
      event.stopPropagation();
      event.preventDefault();
      initUploadPopup();
      window.openForm(focusOpenButton);
    }
  }

  /**
   * Callback function for Open Button focusing.
   */
  function focusOpenButton() {
    uploadFileLabelNode.focus();
  }

  /**
   * Init upload overlay pop-up
   */
  function initUploadPopup() {
    uploadFormCancelNode.addEventListener('click', hideUploadPopupHandler);
    uploadNode.addEventListener('keydown', closeSetupModalKeyHandler);
    uploadFilterForm.addEventListener('submit', closeSubmitModalHandler);

    document.addEventListener('focus', lockModalHandler, true);

    scale.init();
    filters.init();
  }

  /**
   * Remove upload overlay pop-up
   */
  function removeUploadPopup() {

    scale.remove();
    filters.remove();

    uploadFormCancelNode.removeEventListener('click', hideUploadPopupHandler);
    uploadNode.removeEventListener('keydown', closeSetupModalKeyHandler);
    uploadFilterForm.removeEventListener('submit', closeSubmitModalHandler);

    document.removeEventListener('focus', lockModalHandler, true);
  }

  /**
   * Handler for hiding upload overlay pop-up
   */
  function hideUploadPopupHandler() {
    uploadFileNode.value = '';
    removeUploadPopup();
  }

  /**
   * Close Setup Modal by keys
   *
   * @param {Event} event - The Event
   */
  function closeSetupModalKeyHandler(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      removeUploadPopup();
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

  /**
   * Close Modal after submit from
   *
   * @param {Event} event - The Event
   */
  function closeSubmitModalHandler(event) {
    event.preventDefault();
    removeUploadPopup();
  }
})();
