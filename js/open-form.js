/**
 * Created by FoxyGirl on 16.02.2017.
 */
'use strict';

/**
 * @module openForm
 * Open and close Form Modal.
 * @return {Function} - The function for opening and closing Setup Modal.
 * @param {Function} cb - The function for callback.
 */
window.openForm = (function () {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadSelectImageNode = document.getElementById('upload-select-image');
  var uploadFormCancelNode = uploadNode.querySelector('.upload-form-cancel');
  var uploadResizeDecNode = uploadNode.querySelector('.upload-resize-controls-button-dec');
  // var uploadFileLabelNode = document.querySelector('.upload-file');
  var btnSetupSubmit = uploadNode.querySelector('.upload-form-submit');
  var onUploadFormClose = null;

  return function (callback) {
    openSetup();
    uploadFormCancelNode.addEventListener('keydown', onKeyDownHandler);
    uploadFormCancelNode.addEventListener('click', onClickHandler);
    btnSetupSubmit.addEventListener('keydown', onKeyDownHandler);
    btnSetupSubmit.addEventListener('click', onClickHandler);
    document.addEventListener('keydown', closeSetupModalKeyHandler);

    onUploadFormClose = callback;
  };

  /**
   * Open Setup Modal.
   * @private
   */
  function openSetup() {
    uploadSelectImageNode.classList.add('invisible');
    uploadNode.classList.remove('invisible');
    uploadResizeDecNode.focus();
    uploadNode.setAttribute('aria-hidden', 'false');
  }

  /**
   * Close Setup Modal.
   * @private
   */
  function closeSetup() {
    uploadFormCancelNode.removeEventListener('keydown', onKeyDownHandler);
    uploadFormCancelNode.removeEventListener('click', onClickHandler);
    btnSetupSubmit.removeEventListener('keydown', onKeyDownHandler);
    btnSetupSubmit.removeEventListener('click', onClickHandler);
    document.removeEventListener('keydown', closeSetupModalKeyHandler);
    uploadNode.classList.add('invisible');
    uploadSelectImageNode.classList.remove('invisible');

    uploadNode.setAttribute('aria-hidden', 'true');

    if (typeof onUploadFormClose === 'function') {
      onUploadFormClose();
    }
  }

  /**
   * Close Setup Modal by keys.
   * @private
   * @param {Event} event - The Event.
   */
  function onKeyDownHandler(event) {
    if (window.utils.isActivationEvent(event)) {
      closeSetup();
    }
  }

  /**
   * Close Setup Modal by click.
   * @private
   */
  function onClickHandler() {
    closeSetup();
  }

  /**
   * Close Setup Modal by keys.
   * @param {Event} event - The Event.
   */
  function closeSetupModalKeyHandler(event) {
    if (window.utils.isDeactivationEvent(event)) {
      closeSetup();
    }
  }
})();
