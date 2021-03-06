/**
 * Created by FoxyGirl on 18.02.2017.
 */
'use strict';

/**
 * @module showGallery
 * @return {Function) - Show gallery, add and remove handlers.
 * @return {Function) - Show gallery, add and remove handlersbind.
 * @param {Array} param - Data for gallery element.
 * @param {Function} callback - Callback after closing Gallery Modal.
 */
window.showGallery = (function () {
  var galleryNode = document.querySelector('.gallery-overlay');
  var galleryCloseNode = galleryNode.querySelector('.gallery-overlay-close');
  var doCallback = null;

  return function (param, callback) {
    doCallback = callback;
    galleryNode.classList.remove('invisible');
    galleryCloseNode.focus();
    galleryNode.querySelector('.gallery-overlay-image').src = param.url;
    galleryNode.querySelector('.likes-count').textContent = param.likes;
    galleryNode.querySelector('.comments-count').textContent = param.comments.length;

    galleryCloseNode.addEventListener('click', closeGaleryHandler);
    galleryCloseNode.addEventListener('keydown', closeGaleryHandler);

    document.addEventListener('keydown', closeModalKeyHandler);
  };

  /**
   * Close Gallery Modal Handler
   * @param {Event} event - The Event
   */
  function closeGaleryHandler(event) {
    if (window.utils.isActivationEvent(event) || event.type === 'click') {
      closeGalery();
    }
  }

  /**
   * Close Setup Modal by key
   * @param {Event} event - The Event
   */
  function closeModalKeyHandler(event) {
    if (window.utils.isDeactivationEvent(event)) {
      closeGalery();
    }
  }

  /**
   * Close Gallery Modal
   */
  function closeGalery() {
    galleryNode.classList.add('invisible');
    galleryCloseNode.removeEventListener('click', closeGaleryHandler);
    galleryCloseNode.removeEventListener('keydown', closeGaleryHandler);

    document.removeEventListener('keydown', closeModalKeyHandler);

    if (typeof doCallback === 'function') {
      doCallback();
    }
  }
})();
