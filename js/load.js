/**
 * Created by FoxyGirl on 18.02.2017.
 */
'use strict';

/**
 * @module load
 * @return {Function) - It returns {Object} - which has methods:
 * init - Init fist filter and add handlers.
 * remove - Remove handlers.
 */
window.load = (function () {
  var xhr = null;
  var onLoadCallback = null;
  var newUrl = null;

  return function (url, onLoad) {
    xhr = new XMLHttpRequest();
    newUrl = url;
    onLoadCallback = onLoad;
    xhr.timeout = 2000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function (event) {
      if (event.target.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + event.target.status);
      } else if (event.target.status >= 200) {
        if (typeof onLoad === 'function') {
          onLoadCallback(event.target.response);
        }
      }
    });

    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.open('GET', newUrl);
    xhr.send();

    /**
     * Console error message
     * @private
     * @param {object | string} err - Error message or error object
     */
    function errorHandler(err) {
      console.log(err); //eslint-disable-line
    }
  };
})();
