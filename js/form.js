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
var MINRESIZE = 25;
var MAXRESIZE = 100;
var STEPRESIZE = 25;

var resizeDecImagePreviewHandler = function () {
  var currentValue = parseInt(uploadResizeValueNode.value.split('%').join(''), 10);
  currentValue = currentValue > (MINRESIZE + STEPRESIZE) ? currentValue - STEPRESIZE : MINRESIZE;
  changeImagePreviewScale(currentValue);
};

var resizeIncImagePreviewHandler = function () {
  var currentValue = parseInt(uploadResizeValueNode.value.split('%').join(''), 10);
  currentValue = currentValue < (MAXRESIZE - STEPRESIZE) ? currentValue + STEPRESIZE : MAXRESIZE;
  changeImagePreviewScale(currentValue);
};

var changeImagePreviewHandler = function (event) {
  var target = event.target;

  if (target.tagName === 'INPUT') {
    toggleFilter(target);
  } else {
    return;
  }
};

uploadFileNode.addEventListener('change', function () {
  uploadFilterControlsNode.addEventListener('click', changeImagePreviewHandler);
  uploadResizeDecNode.addEventListener('click', resizeDecImagePreviewHandler);
  uploadResizeIncNode.addEventListener('click', resizeIncImagePreviewHandler);

  changeImagePreviewScale(MAXRESIZE);

  uploadSelectImageFormNode.classList.add('invisible');
  uploadOverlayNode.classList.remove('invisible');
});

uploadFormCancelNode.addEventListener('click', function () {
  uploadOverlayNode.classList.add('invisible');
  uploadSelectImageFormNode.classList.remove('invisible');

  uploadFileNode.value = '';
  filterControlsNode[0].click();

  uploadFilterControlsNode.removeEventListener('click', changeImagePreviewHandler);
  uploadResizeDecNode.removeEventListener('click', resizeDecImagePreviewHandler);
  uploadResizeIncNode.removeEventListener('click', resizeIncImagePreviewHandler);
});


/** Change class in filterImagePreviewNode according filter control
 *
 * @param {Element} control - The element with filter control ID
 */
function toggleFilter(control) {
  var filterName = control.id;
  var imagePreviewClasses;
  filterName = filterName.split('upload-').join('');
  imagePreviewClasses = filterImagePreviewNode.classList;

  for (var i = 0; i < imagePreviewClasses.length; i++) {
    if (imagePreviewClasses[i] !== 'filter-image-preview') {
      filterImagePreviewNode.classList.remove(imagePreviewClasses[i]);
    }
  }

  filterImagePreviewNode.classList.add(filterName);
}

/** Change scale of filterImagePreviewNode and uploadResizeValue
 *
 * @param {number} scaleValue - The value for image scaling
 */
function changeImagePreviewScale(scaleValue) {
  uploadResizeValueNode.value = scaleValue + '%';
  filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
}
