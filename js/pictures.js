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
        newPictureNode = pictureNode.cloneNode(true);
        newPictureNode.querySelector('img').src = picture.url;
        newPictureNode.querySelector('.picture-likes').textContent = picture.likes;
        newPictureNode.querySelector('.picture-comments').textContent = picture.comments.length;
        // newPictureNode.addEventListener('click', showGaleryHandler);
        // newPictureNode.addEventListener('keydown', showGaleryHandler);
        var handler = showGaleryHandler.bind(picture);
        newPictureNode.addEventListener('click', handler);
        newPictureNode.addEventListener('keydown', handler);

        fragment.appendChild(newPictureNode);

        // /**
        //  * Close Gallery Modal
        //  * @private
        //  * @param {Event} event - The Event
        //  */
        // function showGaleryHandler(event) {
        //   event.preventDefault();
        //   if (window.utils.isActivationEvent(event) || event.type === 'click') {
        //     window.showGallery(picture);
        //   }
        // }
      });

      picturesNode.appendChild(fragment);

      // /**
      //  * Close Gallery Modal
      //  * @private
      //  * @param {Event} event - The Event
      //  */
      // function showGaleryHandler(event, picture) {
      //   event.preventDefault();
      //   if (window.utils.isActivationEvent(event) || event.type === 'click') {
      //     window.showGallery(picture);
      //   }
      // }

      /**
       * Close Gallery Modal
       * @private
       * @param {Event} event - The Event
       */
      function showGaleryHandler(event) {
        event.preventDefault();
        if (window.utils.isActivationEvent(event) || event.type === 'click') {
          window.showGallery(this);
        }
      }

    }
  };

})();
