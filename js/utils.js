/**
 * Created by FoxyGirl on 16.02.2017.
 */
'use strict';

/**
 * @module utils
 * @return {Object} - which has methods:
 * isActivationEvent - Check Activation Event from KeyboardEvent.
 * isDeactivationEvent - Check Deactivation Event from KeyboardEvent.
 * getRandomArrayFromArray - Get new array of random elements from base array.
 */
window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var SPACE_KEY_CODE = 32;
  var ESCAPE_KEY_CODE = 27;

  return {
    isActivationEvent: isActivationEvent,
    isDeactivationEvent: isDeactivationEvent,
    getRandomArrayFromArray: getRandomArrayFromArray
  };

  /**
   * Control activation event from keyboard.
   * @param {Event} event - The Event.
   * @return {boolean} If is activation event from keyboard - true, else - false.
   */
  function isActivationEvent(event) {
    return event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE;
  }

  /**
   * Control deactivation event from keyboard.
   * @param {Event} event - The Event.
   * @return {boolean} If is deactivation event from keyboard - true, else - false.
   */
  function isDeactivationEvent(event) {
    return event.keyCode === ESCAPE_KEY_CODE;
  }

  /**
   * Get new array of random elements from base array.
   * @param {Array} array - The base array.
   * @param {number} length - Length of new array. Must be <= length of base array.
   * @return {Array} - New array.
   */
  function getRandomArrayFromArray(array, length) {
    if (length > array.length) {
      length = array.length;
    }
    var newArray = [];
    var randomIndexArray = [];
    var randomIndex = null;
    while (randomIndexArray.length < length) {
      randomIndex = Math.floor(Math.random() * array.length);
      if (randomIndexArray.indexOf(randomIndex) === -1) {
        randomIndexArray.push(randomIndex);
      }
    }

    randomIndexArray.forEach(function (element) {
      newArray.push(array[element]);
    });

    return newArray;
  }

})();
