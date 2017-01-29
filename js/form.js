/**
 * Created by FoxyGirl on 28.01.2017.
 */
'use strict';

var uploadOverlayNode = document.querySelector('.upload-overlay');
var uploadSelectImageFormNode = document.getElementById('upload-select-image');
var uploadFormCancelNode = uploadOverlayNode.querySelector('.upload-form-cancel');
var uploadFileNode = document.getElementById('upload-file');
var filterControlsNode = document.getElementsByName('upload-filter');
var filterImagePreviewNode = uploadOverlayNode.querySelector('.filter-image-preview');
var uploadResizeDecNode = uploadOverlayNode.querySelector('.upload-resize-controls-button-dec');
var uploadResizeIncNode = uploadOverlayNode.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValueNode = uploadOverlayNode.querySelector('.upload-resize-controls-value');
var MINRESIZE = 25;
var MAXRESIZE = 100;
var STEPRESIZE = 25;


for (var i = 0; i < filterControlsNode.length; i++) {
  clickFilter(filterControlsNode[i]);
}


uploadFileNode.addEventListener('change', function () {
  uploadSelectImageFormNode.classList.add('invisible');
  uploadOverlayNode.classList.remove('invisible');

  uploadResizeValueNode.value = MAXRESIZE + '%';
  filterImagePreviewNode.style.transform = 'scale(' + MAXRESIZE / 100 + ')';
});

uploadFormCancelNode.addEventListener('click', function () {
  uploadOverlayNode.classList.add('invisible');
  uploadSelectImageFormNode.classList.remove('invisible');
  uploadFileNode.value = '';
});

uploadResizeDecNode.addEventListener('click', function () {
  var currentValue = parseInt(uploadResizeValueNode.value.split('%').join(''), 10);
  currentValue = (currentValue > (MINRESIZE + STEPRESIZE)) ? (currentValue - STEPRESIZE) : MINRESIZE;
  changeImagePreview(currentValue);
});

uploadResizeIncNode.addEventListener('click', function () {
  var currentValue = parseInt(uploadResizeValueNode.value.split('%').join(''), 10);
  currentValue = (currentValue < (MAXRESIZE - STEPRESIZE)) ? (currentValue + STEPRESIZE) : MAXRESIZE;
  changeImagePreview(currentValue);
});


function clickFilter(control) {
  control.addEventListener('click', function () {
    toggleFilter(control);
  });
}

/** Change class in filterImagePreviewNode according filter control
 *
 * @param {Element} control - The element with filter control ID
 */
function toggleFilter(control) {
  var filterName = control.id;
  var imagePreviewClasses;
  filterName = filterName.split('upload-').join('');
  imagePreviewClasses = filterImagePreviewNode.classList;

  for (i = 0; i < imagePreviewClasses.length; i++) {
    if (imagePreviewClasses[i] !== 'filter-image-preview') {
      filterImagePreviewNode.classList.remove(imagePreviewClasses[i]);
    }
  }

  filterImagePreviewNode.classList.add(filterName);
}


/** Change scale of filterImagePreviewNode and uploadResizeValue
 *
 * @param {number} scaleValue - The element with filter control ID
 */
function changeImagePreview(scaleValue) {
  uploadResizeValueNode.value = scaleValue + '%';
  filterImagePreviewNode.style.transform = 'scale(' + scaleValue / 100 + ')';
}
