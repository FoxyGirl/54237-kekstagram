/**
 * Created by FoxyGirl on 16.02.2017.
 */
'use strict';

/**
 * @module openFormModal
 * Open and close Form Modal.
 * @return {Function} - The function for opening and closing Setup Modal.
 * @param {Function} cb - The function for callback.
 */
window.openFormModal = (function () {
  var uploadNode = document.querySelector('.upload-overlay');
  var uploadSelectImageNode = document.getElementById('upload-select-image');
  var uploadFormCancelNode = uploadNode.querySelector('.upload-form-cancel');
  var uploadResizeDecNode = uploadNode.querySelector('.upload-resize-controls-button-dec');
  var uploadFilterForm = uploadNode.querySelector('.upload-filter');
  var uploadFileNode = document.getElementById('upload-file');
  var btnSubmitNode = uploadNode.querySelector('.upload-form-submit');
  var onUploadFormClose = null;

  return function (callback) {
    openUploadForm();

    onUploadFormClose = callback;
  };

  /**
   * Open Setup Modal.
   * @private
   */
  function openUploadForm() {
    uploadSelectImageNode.classList.add('invisible');
    uploadNode.classList.remove('invisible');
    uploadResizeDecNode.focus();
    uploadNode.setAttribute('aria-hidden', 'false');

    uploadFormCancelNode.addEventListener('keydown', onKeyDownHandler);
    uploadFormCancelNode.addEventListener('click', onClickHandler);
    btnSubmitNode.addEventListener('keydown', onKeyDownHandler);
    btnSubmitNode.addEventListener('click', onClickHandler);

    document.addEventListener('keydown', closeModalKeyHandler);
    document.addEventListener('focus', lockModalHandler, true);

    uploadFilterForm.addEventListener('submit', closeSubmitModalHandler);
  }

  /**
   * Close Setup Modal.
   * @private
   */
  function closeUploadForm() {
    uploadFormCancelNode.removeEventListener('keydown', onKeyDownHandler);
    uploadFormCancelNode.removeEventListener('click', onClickHandler);
    btnSubmitNode.removeEventListener('keydown', onKeyDownHandler);
    btnSubmitNode.removeEventListener('click', onClickHandler);

    document.removeEventListener('keydown', closeModalKeyHandler);
    document.removeEventListener('focus', lockModalHandler, true);

    uploadFilterForm.removeEventListener('submit', closeSubmitModalHandler);

    uploadNode.classList.add('invisible');
    uploadSelectImageNode.classList.remove('invisible');
    uploadNode.setAttribute('aria-hidden', 'true');
    uploadFileNode.value = '';

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
      closeUploadForm();
    }
  }

  /**
   * Close Setup Modal by click.
   * @private
   */
  function onClickHandler() {
    closeUploadForm();
  }

  /**
   * Close Setup Modal by keys.
   * @param {Event} event - The Event.
   */
  function closeModalKeyHandler(event) {
    if (window.utils.isDeactivationEvent(event)) {
      closeUploadForm();
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
   * @param {Event} event - The Event
   */
  function closeSubmitModalHandler(event) {
    event.preventDefault();
    closeUploadForm();
  }

})();
