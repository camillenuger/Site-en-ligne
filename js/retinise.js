// Add the basic String function trim for all browsers with an outdated ECMAScript implementation
if(typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
// Add the isNumeric function for older versions of jQuery that do not have it
if(typeof(jQuery.isNumeric) !== 'function'){
    jQuery.isNumeric = function(obj){ return !isNaN(parseFloat(obj)) && isFinite(obj); };
}
// Re-Adding the discontinued browser detection of jQuery (taken from jQuery.migrate)
jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
        /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
        /(msie) ([\w.]+)/.exec( ua ) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
        [];

    return {
        browser: match[ 1 ] || "",
        version: match[ 2 ] || "0"
    };
};
if ( !jQuery.browser.chrome ) {
    var matched = jQuery.uaMatch( navigator.userAgent );
    var browser = {};

    if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if ( browser.chrome ) {
        browser.webkit = true;
    } else if ( browser.webkit ) {
        browser.safari = true;
    }

    jQuery.browser = browser;
}
// Detect whether the page is viewed on a mobile device
var isMobile = {
    _body: document.getElementsByTagName('body')[0],
    _android: undefined,
    _blackberry: undefined,
    _ios: undefined,
    _iemobile: undefined,
    _operamini: undefined,
    _any: undefined,

    Android: function() {
        if (this._android === undefined) {
            if ((this._android = (navigator.userAgent.match(/Android/i) !== null))) {
                this._body.className += ' Android';
            }
        }
        return this._android;
    },
    BlackBerry: function() {
        if (this._blackberry === undefined) {
            if ((this._blackberry = (navigator.userAgent.match(/BlackBerry/i) !== null))) {
                this._body.className += ' BlackBerry';
            }
        }
        return this._blackberry;
    },
    iOS: function() {
        if (this._ios === undefined) {
            if((this._ios = (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null))) {
                this._body.className += ' iOS';
            }
        }
        return this._ios;
    },
    IEMobile: function() {
        if (this._iemobile === undefined) {
            if ((this._iemobile = (navigator.userAgent.match(/IEMobile/i) !== null))) {
                this._body.className += ' IEMobile';
            }
        }
        return this._iemobile;
    },
    OperaMini: function() {
        if (this._operamini === undefined) {
            if ((this._operamini = (navigator.userAgent.match(/Opera Mini/i) !== null))) {
                this._body.className += ' OperaMini';
            }
        }
        return this._operamini;
    },
    any: function() {
        if (this._any === undefined) {
            if ((this._any = (isMobile.Android() || isMobile.iOS() || isMobile.BlackBerry() || isMobile.IEMobile() || isMobile.OperaMini()))) {
                this._body.className += ' mobile';
            }
        }
        return this._any;
    }
};
isMobile._autocall = (function() {
    isMobile.any();
})();

(function(e){e.fn.extend({retinise:function(t){var n={suffix:"@2x",srcattr:"data-src",retattr:"data-ret",altattr:"data-alt"},r=e.extend(n,t),i=window.devicePixelRatio,s=i>1?!0:!1;e(this).each(function(){var t=e(this),n=t.css("display");t.css("display","none");if(t.attr(r.srcattr)){var o=t.attr(r.srcattr),u=t.attr(r.altattr),a=t.attr(r.retattr);if(s===!0){t.attr(r.retattr)?t.attr({src:a,alt:u}):t.attr({src:o.replace(/\.\w+$/,function(e){return r.suffix+e}),alt:u});t.load(function(){var e=t.height()/i,r=t.width()/i;t.attr({height:e,width:r}).css({display:n})})}else t.attr({src:o,alt:u}).css({display:n})}})}})})(jQuery);
