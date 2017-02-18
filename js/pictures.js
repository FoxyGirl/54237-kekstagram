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
  var templateElementNode = document.getElementById('picture-template');
  var elementToCloneNode = templateElementNode.content.querySelector('.picture');
  var newElement = null;
  var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = null;

  return function () {
    var fragment = document.createDocumentFragment();

    window.load(url, onLoad);

    /**
     * Create pictures block.
     * @private
     * @param {Array} data - Data for picture elements.
     */
    function onLoad(data) {
      pictures = data;

      pictures.forEach(function (picture) {
        newElement = elementToCloneNode.cloneNode(true);
        var imgGallery = newElement.querySelector('img');
        imgGallery.src = picture.url;
        imgGallery.setAttribute('role', 'button');
        imgGallery.setAttribute('tabindex', '1');
        newElement.querySelector('.picture-likes').textContent = picture.likes;
        newElement.querySelector('.picture-comments').textContent = picture.comments.length;
        newElement.addEventListener('click', showGaleryHandler);
        newElement.addEventListener('keydown', showGaleryHandler);
        fragment.appendChild(newElement);

        /**
         * Close Gallery Modal
         * @private
         * @param {Event} event - The Event
         */
        function showGaleryHandler(event) {
          event.preventDefault();
          if (window.utils.isActivationEvent(event) || event.type === 'click') {
            window.showGallery(picture);
          }
        }
      });

      picturesNode.appendChild(fragment);
    }

  };

})();
