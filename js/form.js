/**
 * Created by FoxyGirl on 28.01.2017.
 */
'use strict';

(function () {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadFileNode = document.getElementById('upload-file');
  var uploadFileLabelNode = document.querySelector('.upload-file');
  var uploadFilterForm = uploadNode.querySelector('.upload-filter');
  var scaleElemNode = uploadNode.querySelector('.upload-resize-controls');
  var START_RESIZE = 100;
  var STEP_RESIZE = 25;
  var scale = window.createScale(scaleElemNode, STEP_RESIZE, START_RESIZE);
  var filters = window.initializeFilters();

  uploadFileLabelNode.addEventListener('keydown', onSetupKeydownHandler);

  uploadFileNode.addEventListener('change', function () {
    window.openFormModal();
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
      window.openFormModal(focusOpenButton);
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
    uploadFilterForm.addEventListener('submit', closeSubmitModalHandler);

    scale.init();
    filters.init();
  }

  /**
   * Remove upload overlay pop-up
   */
  function removeUploadPopup() {

    scale.remove();
    filters.remove();
  }

  /**
   * Close Modal after submit from
   * @param {Event} event - The Event
   */
  function closeSubmitModalHandler(event) {
    event.preventDefault();
    removeUploadPopup();
  }
})();
