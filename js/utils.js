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
   * @param {Array} baseArray - The base array.
   * @param {number} newLength - Length of new array. Must be <= length of base array.
   * @return {Array} - New array.
   */
  function getRandomArrayFromArray(baseArray, newLength) {
    if (newLength > baseArray.length) {
      console.log('Длина нового массива больше, чем исходного. Скорректируйте параметры!'); //  eslint-disable-line
      return null;
    }
    var newArray = [];
    var randomIndexArray = [];
    var randomElementIndex = null;
    while (randomIndexArray.length < newLength) {
      randomElementIndex = Math.floor(Math.random() * baseArray.length);
      if (randomIndexArray.indexOf(randomElementIndex) === -1) {
        randomIndexArray.push(randomElementIndex);
      }
    }

    randomIndexArray.forEach(function (element) {
      newArray.push(baseArray[element]);
    });

    return newArray;
  }

})();
