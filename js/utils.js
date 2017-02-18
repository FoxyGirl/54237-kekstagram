/**
 * Created by FoxyGirl on 16.02.2017.
 */
'use strict';

/**
 * @module utils
 */
window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var SPACE_KEY_CODE = 32;
  var ESCAPE_KEY_CODE = 27;

  return {
    isActivationEvent: isActivationEvent,
    isDeactivationEvent: isDeactivationEvent
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

})();
