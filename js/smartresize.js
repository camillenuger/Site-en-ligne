  /**
   * @param  {function} func      the code to be executed
   * @param  {int+} threshold     delay after trigger event (in milliseconds)
   * @param  {boolean} execAsap   forces to execute the code as soon as possible
   * @return {void}
   *
   * @author Paul Irish
   * @see http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
   */
  var debounce = function (func, threshold, execAsap) {
      var timeout;
  
      return function () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          }
  
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
  
          timeout = setTimeout(delayed, threshold || 100);
      };
  };
  
  /**
   * jQuery debounceEvent function
   * @param  {string} event       The event to be bound
   * @param  {int+} threshold     The delay after the trigger event (in milliseconds)
   * @param  {boolean} execAsap   Forces the code to be executed as soon as possible
   *
   * @author Paul Irish
   * @see http://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/
   */
  jQuery.fn.debounceEvent = function(event, func, threshold, execAsap){
      return func ? this.bind(event, debounce(func, threshold, execAsap)) : this.trigger(event);
  };