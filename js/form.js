/**
 * Created by FoxyGirl on 28.01.2017.
 */
'use strict';

var uploadNode = document.querySelector('.upload-overlay');
var uploadSelectImageNode = document.getElementById('upload-select-image');
var uploadFormCancelNode = uploadNode.querySelector('.upload-form-cancel');
var uploadFileNode = document.getElementById('upload-file');
var uploadFilterControlsNode = uploadNode.querySelector('.upload-filter-controls');
var filterControlsNode = document.getElementsByName('upload-filter');
var uploadResizeDecNode = uploadNode.querySelector('.upload-resize-controls-button-dec');
var uploadFileLabelNode = document.querySelector('.upload-file');
var uploadFilterForm = uploadNode.querySelector('.upload-filter');
var scaleElemNode = uploadNode.querySelector('.upload-resize-controls');
var START_RESIZE = 100;
var STEP_RESIZE = 25;
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;
var SPACE_KEY_CODE = 32;
var prevFocusedElement = null;
var Scale = null;

uploadFileLabelNode.addEventListener('keydown', function () {
  if (event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE) {
    event.currentTarget.click();
  }
});

uploadFileNode.addEventListener('change', function () {
  showUploadPopup();
});

/**
 * Show upload overlay pop-up
 */
function showUploadPopup() {
  prevFocusedElement = document.activeElement;

  uploadFilterControlsNode.addEventListener('click', filterClickHandler);
  uploadFilterControlsNode.addEventListener('keydown', filterClickHandler);

  uploadFormCancelNode.addEventListener('click', hideUploadPopupHandler);
  uploadNode.addEventListener('keydown', closeSetupModalKeyHandler);
  uploadFilterForm.addEventListener('submit', closeSubmitModalHandler);

  document.addEventListener('focus', lockModalHandler, true);

  window.initializeFilters(filterControlsNode[0]);
  Scale = window.createScale(scaleElemNode, STEP_RESIZE, START_RESIZE);

  uploadSelectImageNode.classList.add('invisible');
  uploadNode.classList.remove('invisible');
  uploadResizeDecNode.focus();

  uploadNode.setAttribute('aria-hidden', 'false');
}

/**
 * Hide upload overlay pop-up
 */
function hideUploadPopup() {
  uploadNode.classList.add('invisible');
  uploadSelectImageNode.classList.remove('invisible');
  prevFocusedElement.focus();

  uploadNode.setAttribute('aria-hidden', 'true');

  Scale.removeScale();

  uploadFilterControlsNode.removeEventListener('click', filterClickHandler);
  uploadFilterControlsNode.removeEventListener('keydown', filterClickHandler);

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
  hideUploadPopup();
}

/**
 * Change image preview
 *
 * @param {Event} event - The Event
 */
function filterClickHandler(event) {
  if (event.keyCode === SPACE_KEY_CODE) {
    event.preventDefault(); // Чтобы не скролилось окно
    event.stopPropagation(); // Чтобы не дошло до window
  }

  if (event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE || event.type === 'click') {
    var target = event.target;
    while (target !== uploadFilterControlsNode) {
      if (target.tagName === 'LABEL') {
        var filterInput = document.getElementById(target.getAttribute('for'));
        window.initializeFilters(filterInput);
        return;
      }
      target = target.parentNode;
    }
  }
}

/**
 * Close Setup Modal by keys
 *
 * @param {Event} event - The Event
 */
function closeSetupModalKeyHandler(event) {
  if (event.keyCode === ESCAPE_KEY_CODE) {
    hideUploadPopup();
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
  hideUploadPopup();
}
