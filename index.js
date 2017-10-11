/**
 * Vue Cookies v1.5.4
 * https://github.com/em-fe/em-cookie
 *
 * Copyright 2016, cmp-cc
 * Released under the MIT license
 */

var VueCookies = {
  // install of Vue
  install: function(Vue) {
    if (!Vue.prototype.$cookies) {
      Object.defineProperties(Vue.prototype, {
        $cookies: {
          get: function() {
            return VueCookies;
          },
        },
      });
    }
  },
  get: function(key) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  set: function(key, value, expireTimes, path, domain, secure) {
    if (!key) {
      throw new Error("cookie name is not find in first argument")
    }else if(/^(?:expires|max\-age|path|domain|secure)$/i.test(key)){
      throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\t","current key name: "+key);
    }
    var _expires = "; max-age=86400"; // default expire time for 1 day
    if (expireTimes) {
      switch (expireTimes.constructor) {
        case Number:
          if(expireTimes === Infinity || expireTimes === -1) _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
          else _expires = "; max-age=" + expireTimes;
          break;
        case String:
          if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
            // get capture number group
            var _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
            // get capture type group , to lower case
            switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
              // Frequency sorting
              case 'm':  _expires = "; max-age=" + +_expireTime * 259200; break; // 60 * 60 * 24 * 30
              case 'd':  _expires = "; max-age=" + +_expireTime * 86400; break; // 60 * 60 * 24
              case 'h': _expires = "; max-age=" + +_expireTime * 3600; break; // 60 * 60
              case 'min':  _expires = "; max-age=" + +_expireTime * 60; break; // 60
              case 's': _expires = "; max-age=" + _expireTime; break;
              case 'y': _expires = "; max-age=" + +_expireTime * 31104000; break; // 60 * 60 * 24 * 30 * 12
              default: new Error("unknown exception of 'set operation'");
            }
          } else {
            _expires = "; expires=" + expireTimes;
          }
          break;
        case Date:
          _expires = "; expires=" + expireTimes.toUTCString();
          break;
      }
    }
      document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "; path=/") + (secure ? "; secure" : "");
    return this;
  },
  remove: function(key, path, domain) {
    if (!key || !this.isKey(key)) {
      return false;
    }
    document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
    return true;
  },
  isKey: function(key) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function() {
    var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var _index = 0; _index < _keys.length; _index++) {
      _keys[_index] = decodeURIComponent(_keys[_index]);
    }
    return _keys;
  }
}

export default VueCookies;

if(typeof window!=='undefined' && !window.$cookie){
  window.$cookie = VueCookies;
}
