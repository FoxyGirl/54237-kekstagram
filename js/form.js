/**
 * Created by FoxyGirl on 28.01.2017.
 */
'use strict';

var uploadOverlayNode = document.querySelector('.upload-overlay');
var uploadSelectImageFormNode = document.getElementById('upload-select-image');
var uploadFormCancelNode = uploadOverlayNode.querySelector('.upload-form-cancel');
var uploadFileNode = document.getElementById('upload-file');
var uploadFilterControlsNode = uploadOverlayNode.querySelector('.upload-filter-controls');
var filterControlsNode = document.getElementsByName('upload-filter');
var filterImagePreviewNode = uploadOverlayNode.querySelector('.filter-image-preview');
var uploadResizeDecNode = uploadOverlayNode.querySelector('.upload-resize-controls-button-dec');
var uploadResizeIncNode = uploadOverlayNode.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValueNode = uploadOverlayNode.querySelector('.upload-resize-controls-value');
var MIN_RESIZE = 25;
var MAX_RESIZE = 100;
var STEP_RESIZE = 25;

//  Add handlers for showing and hiding of upload overlay pop-up
uploadFileNode.addEventListener('change', showUploadOverlayPopupHandler);
uploadFormCancelNode.addEventListener('click', hideUploadOverlayPopupHandler);


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
  uploadResizeValueNode.value = scaleValue + '%';
  filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
}

/**
 * Change image preview
 *
 * @param {Event} event - The Event
 */
function changeImagePreviewHandler(event) {
  var target = event.target;

  if (target.tagName === 'INPUT') {
    toggleFilter(target);
  } else {
    return;
  }
}

/**
 * Show upload overlay pop-up
 */
function showUploadOverlayPopupHandler() {
  uploadFilterControlsNode.addEventListener('click', changeImagePreviewHandler);
  uploadResizeDecNode.addEventListener('click', resizeDecImagePreviewHandler);
  uploadResizeIncNode.addEventListener('click', resizeIncImagePreviewHandler);

  changeImagePreviewScale(MAX_RESIZE);

  uploadSelectImageFormNode.classList.add('invisible');
  uploadOverlayNode.classList.remove('invisible');
}

/**
 * Hide upload overlay pop-up
 */
function hideUploadOverlayPopupHandler() {
  uploadOverlayNode.classList.add('invisible');
  uploadSelectImageFormNode.classList.remove('invisible');

  uploadFileNode.value = '';
  filterControlsNode[0].click();

  uploadFilterControlsNode.removeEventListener('click', changeImagePreviewHandler);
  uploadResizeDecNode.removeEventListener('click', resizeDecImagePreviewHandler);
  uploadResizeIncNode.removeEventListener('click', resizeIncImagePreviewHandler);
}
