  /**
   * jQuery displayWidth - A simple Media Query check
   * @param  {string} comparison   Comparison condition. Possible values: Either one these: '>', '<', '>=', '<=' or a full, complex Media Query. The latter is risky because it will fail without a fallback in browsers that do not support the matchMedia function.
   * @param  {int+} width          Display width (in pixels)
   *
   * @author Stefan Winkler
   */
  window.displayWidth = function(comparison, value){
      if(typeof window.matchMedia == 'function' && window.matchMedia!==undefined && window.matchMedia('screen and (max-width: 767px)')!==null){
          if(jQuery.isNumeric(value)){
              value = Number(value);
              if(comparison == '>='){
                  comparison = 'min-width';
              }else if(comparison == '<='){
                  comparison = 'max-width';
              }else if(comparison == '>'){
                  comparison = 'min-width';
                  value++;
              }else if(comparison == '<'){
                  comparison = 'max-width';
                  value--;
              }
              return window.matchMedia('('+comparison+':'+value+'px)').matches;
          }else{
              return window.matchMedia(value).matches;
          }
      }else{
          if(!jQuery.isNumeric(value)){
              if(typeof(console) !== 'undefined'){
                  console.log("Error: This Browser doesn't support media queries.");
              }
              return false;
          }
          if(typeof(window.current_screen_width)==='undefined'){
              window.current_screen_width = jQuery(window).outerWidth();
          }
          if(comparison == '>='){
              return window.current_screen_width >= value;
          }else if(comparison == '<='){
              return window.current_screen_width <= value;
          }else if(comparison == '>'){
              return window.current_screen_width > value;
          }else if(comparison == '<'){
              return window.current_screen_width < value;
          }
      }
  };