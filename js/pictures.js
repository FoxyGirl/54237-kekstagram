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
     * CCreate pictures block
     * @private
     * @param {Array} data - Data for picture elements.
     */
    function onLoad(data) {
      pictures = data;

      pictures.forEach(function (picture) {
        newElement = elementToCloneNode.cloneNode(true);
        newElement.querySelector('img').src = picture.url;
        newElement.querySelector('.picture-likes').textContent = picture.likes;
        newElement.querySelector('.picture-comments').textContent = picture.comments.length;
        fragment.appendChild(newElement);
      });

      picturesNode.appendChild(fragment);
    }

  };

})();
