/**
 * Created by FoxyGirl on 18.02.2017.
 */
'use strict';

/**
 * @module pictures
 * @return {Function) - Create pictures block from template.
 */
window.pictures = (function () {
  var picturesNode = document.querySelector('.pictures');
  var templateNode = document.getElementById('picture-template');
  var pictureNode = templateNode.content.querySelector('.picture');
  var filtersNode = document.querySelector('.filters');
  var SPACE_KEY_CODE = 32;
  var newPictureNode = null;
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  return function () {
    window.load(url, onLoad);
  };

  /**
   * Create pictures block.
   * @private
   * @param {Array} pictures - Data for picture elements.
   */
  function onLoad(pictures) {
    filtersNode.classList.remove('hidden');
    renderPichers(pictures);

    filtersNode.addEventListener('click', filterClickHandler);
    filtersNode.addEventListener('keydown', filterClickHandler);

    /**
     * Show Gallery Modal
     * @private
     * @param {Object} picture - The Object with picture data.
     * @return {Function} - Handler for Show Gallery Modal.
     */
    function showGalery(picture) {
      return function (event) {
        if (window.utils.isActivationEvent(event) || event.type === 'click') {
          event.preventDefault();
          var currentPhoto = event.currentTarget;
          window.showGallery(picture, focusPhoto);
        }

        /**
        * Focus Photo Callback
        * @private
        */
        function focusPhoto() {
          currentPhoto.focus();
        }
      };
    }

    /**
     * Render picture items into picturesNode
     * @private
     * @param {Array} pictArray - The array of objects with picture data.
     */
    function renderPichers(pictArray) {
      var fragment = document.createDocumentFragment();
      pictArray.forEach(function (picture) {
        var showGaleryHandler = showGalery(picture);
        newPictureNode = pictureNode.cloneNode(true);
        newPictureNode.querySelector('img').src = picture.url;
        newPictureNode.querySelector('.picture-likes').textContent = picture.likes;
        newPictureNode.querySelector('.picture-comments').textContent = picture.comments.length;
        newPictureNode.addEventListener('click', showGaleryHandler);
        newPictureNode.addEventListener('keydown', showGaleryHandler);

        fragment.appendChild(newPictureNode);
      });

      picturesNode.innerHTML = '';
      picturesNode.appendChild(fragment);
    }

    /**
     * Change image preview
     * @private
     * @param {Event} event - The Event
     */
    function filterClickHandler(event) {
      if (event.keyCode === SPACE_KEY_CODE) {
        event.preventDefault(); // Prevent window scrolling
        event.stopPropagation(); // Prevent bubbling to window
      }

      if (window.utils.isActivationEvent(event) || event.type === 'click') {
        var target = event.target;
        while (target !== filtersNode) {
          if (target.tagName === 'LABEL') {
            var filterInput = document.getElementById(target.getAttribute('for'));
            clearCheckedInputs(filtersNode);
            setCheckedInputs(filterInput);
            refreshPictures(filterInput);
            return;
          }
          target = target.parentNode;
        }
      }
    }

    /**
     * Refresh pictures block in picturesNode according filter control
     * @private
     * @param {Element} control - The element with filter control ID
     */
    function refreshPictures(control) {
      var filter = control.id;
      filter = filter.replace('filter-', '');
      switch (filter) {
        case 'popular':
          renderPichers(pictures);
          break;
        case 'discussed':
          var discussedPictures = pictures.slice();
          discussedPictures.sort(compareCommentsCount);
          renderPichers(discussedPictures);
          break;
        case 'new':
          var newPictures = window.utils.getRandomArrayFromArray(pictures, 10);
          renderPichers(newPictures);
          break;
      }
    }

    /**
     * Sort Comments Count descending
     * @private
     * @param {number} a - Array item.
     * @param {number} b - Array item.
     * @return {number} - Return positive number if a > b, negative number if a < b and zero if  a == b.
     */
    function compareCommentsCount(a, b) {
      return b.comments.length - a.comments.length;
    }

    /**
     * Clear checked attributes for inputs in DOM collection
     * @private
     * @param {Elements} inputs - DOM collection of inputs with radio or checkbox type
     */
    function clearCheckedInputs(inputs) {
      [].forEach.call(inputs, function (input) {
        input.checked = false;
        filtersNode.querySelector('[for="' + input.id + '"]').setAttribute('aria-checked', 'false');
      });
    }

    /**
     * Set checked attributes for input
     * @private
     * @param {Element} input - DOM element input with radio or checkbox type
     */
    function setCheckedInputs(input) {
      input.checked = true;
      filtersNode.querySelector('[for="' + input.id + '"]').setAttribute('aria-checked', 'true');
    }

  }

})();
