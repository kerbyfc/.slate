;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function() {
  // var e, logger;

  // logger = require('./components/logger.coffee');

  // try {
  //   logger.log('hi');
  // } catch (_error) {
  //   e = _error;
  //   S.log("Init error: " + e.toString());
  // }

  S.log("HERE");

}).call(this);


},{"./components/logger.coffee":2}],2:[function(require,module,exports){
(function() {
  var Logger;

  S.src('logger/growl.js');

  Logger = (function() {
    var adapters, cmd, exec, join;

    cmd = {
      path: "export PATH=$PATH:/usr/local/bin/",
      growl: "growlnotify -H '127.0.0.1' -P 'godsfav1' -m 'TEST MESSAGE'"
    };

    exec = function(command, path) {
      command = "/usr/local/bin/growlnotify -H '127.0.0.1' -P 'godsfav1' -m 'TEST MESSAGE'";
      S.log(command);
      return S.shell(command, true, path);
    };

    join = function() {
      return Array.prototype.slice.call(arguments).join(' && ');
    };

    adapters = {
      growl: function(msg, duration) {
        var output;
        return output = exec(join(cmd.path, cmd.growl));
      }
    };

    function Logger() {
      this.adapter = {
        log: adapters.growl
      };
    }

    Logger.prototype.log = function(msg) {
      return this.adapter.log(msg);
    };

    return Logger;

  })();

  module.exports = new Logger;

}).call(this);


},{}]},{},[1])
;
