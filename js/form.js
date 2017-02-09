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
var filterImagePreviewNode = uploadNode.querySelector('.filter-image-preview');
var uploadResizeDecNode = uploadNode.querySelector('.upload-resize-controls-button-dec');
var uploadResizeIncNode = uploadNode.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValueNode = uploadNode.querySelector('.upload-resize-controls-value');
var uploadFileLabel = document.querySelector('label.upload-file');
var uploadFilterForm = uploadNode.querySelector('.upload-filter');
var MIN_RESIZE = 25;
var MAX_RESIZE = 100;
var STEP_RESIZE = 25;
var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;
var SPACE_KEY_CODE = 32;
var prevFocusedElement = null;

uploadFileLabel.addEventListener('keydown', function () {
  if (event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE) {
    document.getElementById(uploadFileLabel.getAttribute('for')).click();
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

  uploadResizeDecNode.addEventListener('click', resizeDecImagePreviewHandler);
  uploadResizeIncNode.addEventListener('click', resizeIncImagePreviewHandler);

  uploadFilterControlsNode.addEventListener('click', changeImagePreviewHandler);
  uploadFilterControlsNode.addEventListener('keydown', changeImagePreviewHandler);
  uploadFilterControlsNode.addEventListener('keydown', preventDefaultOfSpaseHandler);

  uploadFormCancelNode.addEventListener('click', hideUploadPopupHandler);
  uploadNode.addEventListener('keydown', closeSetupModalKeyHandler);
  uploadFilterForm.addEventListener('submit', closeSubmitModalHandler);

  document.addEventListener('focus', lockModalHandler, true);

  changeImagePreviewScale(MAX_RESIZE);
  changeImagePreview(filterControlsNode[0]);

  uploadSelectImageNode.classList.add('invisible');
  uploadNode.classList.remove('invisible');
  uploadResizeDecNode.focus();
}

/**
 * Hide upload overlay pop-up
 */
function hideUploadPopup() {
  uploadNode.classList.add('invisible');
  uploadSelectImageNode.classList.remove('invisible');
  prevFocusedElement.focus();

  uploadResizeDecNode.removeEventListener('click', resizeDecImagePreviewHandler);
  uploadResizeIncNode.removeEventListener('click', resizeIncImagePreviewHandler);

  uploadFilterControlsNode.removeEventListener('click', changeImagePreviewHandler);
  uploadFilterControlsNode.removeEventListener('keydown', changeImagePreviewHandler);
  uploadFilterControlsNode.removeEventListener('keydown', preventDefaultOfSpaseHandler);

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
 * Resize with decreasing image preview
 */
function resizeDecImagePreviewHandler() {
  var currentValue = parseInt(uploadResizeValueNode.value, 10);
  currentValue = currentValue - STEP_RESIZE < MIN_RESIZE ? MIN_RESIZE : currentValue - STEP_RESIZE;
  changeImagePreviewScale(currentValue);
}

/**
 * Resize with increasing image preview
 */
function resizeIncImagePreviewHandler() {
  var currentValue = parseInt(uploadResizeValueNode.value, 10);
  currentValue = currentValue + STEP_RESIZE > MAX_RESIZE ? MAX_RESIZE : currentValue + STEP_RESIZE;
  changeImagePreviewScale(currentValue);
}

/**
 * Change scale of filterImagePreviewNode and uploadResizeValue
 *
 * @param {number} scaleValue - The value for image scaling
 */
function changeImagePreviewScale(scaleValue) {
  uploadResizeValueNode.setAttribute('value', scaleValue + '%');
  filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
  filterImagePreviewNode.style.transition = 'ease-out 0.5s';
}

/**
 * Change image preview
 *
 * @param {Event} event - The Event
 */
function changeImagePreviewHandler(event) {
  if (event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE || event.type === 'click') {
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

/**
 * Change Image Preview
 *
 * @param {Element} filterInput - Filter input
 */
function changeImagePreview(filterInput) {
  clearCheckedInputs(filterControlsNode);
  setCheckedInputs(filterInput);
  toggleFilter(filterInput);
}

/**
 * Clear checked attributes for inputs in DOM collection
 *
 * @param {Elements} inputs - DOM collection of inputs with radio or checkbox type
 */
function clearCheckedInputs(inputs) {
  [].forEach.call(inputs, function (input) {
    input.removeAttribute('checked');
    uploadFilterControlsNode.querySelector('[for="' + input.id + '"]').setAttribute('aria-checked', 'false');
  });
}

/**
 * Set checked attributes for input
 *
 * @param {Element} input - DOM element input with radio or checkbox type
 */
function setCheckedInputs(input) {
  input.setAttribute('checked', 'true');
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

/**
 * Prevent default of Spase key
 *
 * @param {Event} event - The Event
 */
function preventDefaultOfSpaseHandler(event) {
  if (event.keyCode === SPACE_KEY_CODE) {
    event.preventDefault(); // Чтобы не скролилось окно
    event.stopPropagation(); // Чтобы не дошло до window
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
    console.log('!!!!' + document.activeElement); // eslint-disable-line
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
  console.log('Тут мы отправляем форму как-то и закрываем окно!!!'); // eslint-disable-line
  hideUploadPopup();
}
