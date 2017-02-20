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
  var newPictureNode = null;
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';

  return function () {
    var fragment = document.createDocumentFragment();

    window.load(url, onLoad);

    /**
     * Create pictures block.
     * @private
     * @param {Array} pictures - Data for picture elements.
     */

    function onLoad(pictures) {
      pictures.forEach(function (picture) {
        var showGaleryHandler = showGalery(picture);
        newPictureNode = pictureNode.cloneNode(true);
        newPictureNode.querySelector('img').src = picture.url;
        newPictureNode.querySelector('.picture-likes').textContent = picture.likes;
        newPictureNode.querySelector('.picture-comments').textContent = picture.comments.length;
        newPictureNode.addEventListener('click', showGaleryHandler);
        newPictureNode.addEventListener('keydown', showGaleryHandler);

        fragment.appendChild(newPictureNode);
      });

      picturesNode.appendChild(fragment);

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

    }
  };

})();
