;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(global){(function() {
  var Logger, e, shell;

  shell = require('./components/Shell.coffee');

  try {
    global.cfg = JSON.parse(shell.call('cat', 'slate.json'));
  } catch (_error) {
    e = _error;
    throw new Error("Invalid config: " + e.message);
  }

  require('./utils.coffee');

  Logger = require('./components/Logger.coffee');

  global.logger = new Logger;

  global.components = {
    focuser: require('./components/Focuser.coffee'),
    resizer: require('./components/Resizer.coffee'),
    switcher: require('./components/Switcher.coffee'),
    rekauncher: require('./components/Relauncher.coffee')
  };

}).call(this);


})(window)
},{"./components/Shell.coffee":2,"./utils.coffee":3,"./components/Logger.coffee":4,"./components/Focuser.coffee":5,"./components/Resizer.coffee":6,"./components/Switcher.coffee":7,"./components/Relauncher.coffee":8}],3:[function(require,module,exports){
(function(global){(function() {
  _.mixin({
    /*
     # Uppercase first letter
     # @param {String} string
    */

    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    },
    location: function(win) {
      S.log(win.app().name());
      try {
        S.log('1' + win.x);
      } catch (_error) {}
      try {
        S.log('2' + win.x());
      } catch (_error) {}
      try {
        S.log('3' + win.position);
      } catch (_error) {}
      try {
        return S.log('4' + win.position());
      } catch (_error) {}
    },
    /*
     # Get object property by path
     # @param {Object} obj
     # @param {String|Array} path
    */

    getR: function(obj, path) {
      var cur, first;
      if (path == null) {
        path = "";
      }
      if (!_.isObject(obj)) {
        throw new Error("Object expected");
      }
      if (_.isString(path)) {
        path = path.split(".");
      }
      first = _.first(path);
      path = _.rest(path);
      cur = obj[first];
      if (!path.length) {
        return cur;
      }
      while (path.length) {
        if (!_.isObject(cur)) {
          return cur;
        }
        cur = cur[_.first(path)];
        path = _.rest(path);
      }
      return cur;
    },
    /*
     # Get configuration by
     # path, repsented by couple of
     # dot-separated keys
     # @param {String} path
     # @return {void} description
    */

    cfg: function(path) {
      return _.getR(global.cfg, path);
    }
  });

  module.exports = global._ = _;

}).call(this);


})(window)
},{}],2:[function(require,module,exports){
(function() {
  var Shell;

  Shell = (function() {
    var cache;

    function Shell() {}

    cache = {};

    Shell.prototype.exec = function(cmd, cwd) {
      if (cwd == null) {
        cwd = '~/';
      }
      return S.shell(cmd, true, cwd).replace(/\n$/g, '');
    };

    Shell.prototype.call = function(prog, args) {
      if (args == null) {
        args = '';
      }
      cache[prog] = cache[prog] || this.exec("/usr/bin/which " + prog);
      return this.exec("" + cache[prog] + " " + args);
    };

    return Shell;

  })();

  module.exports = new Shell;

}).call(this);


},{}],5:[function(require,module,exports){
(function() {
  var Focuser;

  Focuser = (function() {
    function Focuser(config) {
      this.config = config != null ? config : _.cfg('focuser');
      this.setup();
    }

    Focuser.prototype.setup = function(config) {
      var _this = this;
      this.config = config != null ? config : this.config;
      return _.each(this.config.directions, function(key, direction) {
        return S.bind(key + ":" + _this.config.modifier, function(win) {
          return win.doOperation(S.op('focus', {
            direction: direction
          }));
        });
      });
    };

    return Focuser;

  })();

  module.exports = new Focuser;

}).call(this);


},{}],6:[function(require,module,exports){
(function() {
  var Resizer;

  Resizer = (function() {
    function Resizer(config) {
      this.config = config != null ? config : _.cfg('resizer');
      this.setup();
    }

    Resizer.prototype.setup = function(config) {
      var _this = this;
      this.config = config != null ? config : this.config;
      return _.each(this.config.directions, function(key, direction) {
        return S.bind(key + ":" + _this.config.modifier, function(win) {
          var location;
          location = _.location(win);
          return win.doOperation(S.opstr("resize +" + _this.config.step + " +0"));
        });
      });
    };

    return Resizer;

  })();

  module.exports = new Resizer;

}).call(this);


},{}],7:[function(require,module,exports){
(function() {
  var Switcher;

  Switcher = (function() {
    function Switcher() {
      false;
    }

    return Switcher;

  })();

  module.exports = Switcher;

}).call(this);


},{}],8:[function(require,module,exports){
(function() {
  var Relauncher;

  Relauncher = (function() {
    function Relauncher(config) {
      this.config = config != null ? config : _.cfg('relauncher');
      this.setup();
    }

    Relauncher.prototype.setup = function(config) {
      this.config = config != null ? config : this.config;
      return S.bind(this.config.key + ":" + this.config.modifier, S.op('relaunch'));
    };

    return Relauncher;

  })();

  module.exports = new Relauncher;

}).call(this);


},{}],4:[function(require,module,exports){
(function() {
  var Logger;

  Logger = (function() {
    var adapters;

    adapters = {
      growl: require("./logger/GrowlLoggerAdapter.coffee"),
      editor: require("./logger/EditorLoggerAdapter.coffee")
    };

    /*
     # Create logger with predefined adapter
     # @return {void} description
    */


    function Logger(adapter) {
      var Adapter;
      if (adapter == null) {
        adapter = _.cfg('logger.adapter');
      }
      Adapter = adapters[adapter];
      this.adapter = new Adapter(_.cfg('logger.options'));
    }

    /*
     # Log message with growlnotify
     # @param {String} msg
     # @param {Object} params
     # @param {Object} opts
    */


    Logger.prototype.log = function(msg, params, opts) {
      if (params == null) {
        params = {};
      }
      if (opts == null) {
        opts = {};
      }
      if (_.isObject(msg)) {
        msg = JSON.stringify(msg);
      }
      return this.adapter.log(msg, _.clone(params), _.clone(opts));
    };

    return Logger;

  })();

  module.exports = Logger;

}).call(this);


},{"./logger/GrowlLoggerAdapter.coffee":9,"./logger/EditorLoggerAdapter.coffee":10}],9:[function(require,module,exports){
(function() {
  var GrowlLoggerAdapter;

  GrowlLoggerAdapter = (function() {
    /*
     # Default options and parameters
    */

    GrowlLoggerAdapter.prototype.defaults = {
      options: {
        path: '/usr/local/bin'
      },
      params: {
        H: '127.0.0.1'
      }
    };

    /*
     # Initialize logger
     # @param {Object} options
    */


    function GrowlLoggerAdapter(options) {
      this.setup(options);
    }

    /*
     # Configure logger
     # @param {Object} options
    */


    GrowlLoggerAdapter.prototype.setup = function(options) {
      this.path = options.path || this.defaults.options.path;
      this.path = this.path.replace(/growlnofity$/, ''.replace(/\/$/, ''));
      this.path += "/growlnotify";
      return this.params = _.extend(this.defaults.params);
    };

    /*
     # Reduce accoumulator for shell parameters
     # @param {String} memo
     # @param {String} value
     # @param {String} key
    */


    GrowlLoggerAdapter.prototype.param = function(memo, value, key) {
      return "" + memo + " -" + key + " '" + value + "'";
    };

    /*
     # Build shell command
     # @param {Object} params
    */


    GrowlLoggerAdapter.prototype.cmd = function(params) {
      var cmd;
      params = _.defaults(params, this.params);
      return cmd = _.reduce(params, this.param, this.path);
    };

    /*
     # Reconfigure logger
     #  & build shell command
     #  & and execute command
     # @param {String} msg
     # @param {Object} params
     # @param {Object} opts
    */


    GrowlLoggerAdapter.prototype.log = function(msg, params, opts) {
      var cmd;
      params.m = msg;
      if (_.isObject(opts)) {
        this.setup(opts);
      }
      cmd = this.cmd(params, opts);
      return S.shell(cmd, true);
    };

    return GrowlLoggerAdapter;

  })();

  module.exports = GrowlLoggerAdapter;

}).call(this);


},{}],10:[function(require,module,exports){
(function() {
  var GrowlLoggerAdapter;

  GrowlLoggerAdapter = (function() {
    /*
     # Default options and parameters
    */

    GrowlLoggerAdapter.prototype.defaults = {
      options: {
        path: '/usr/bin/open'
      },
      params: {
        editorParams: '-fe'
      }
    };

    /*
     # Initialize logger
     # @param {Object} options
    */


    function GrowlLoggerAdapter(options) {
      this.setup(options);
    }

    /*
     # Configure logger
     # @param {Object} options
    */


    GrowlLoggerAdapter.prototype.setup = function(options) {
      return this.options = _.defaults(options, this.defaults.options);
    };

    /*
     # Build shell command
     # @param {Object} params
    */


    GrowlLoggerAdapter.prototype.cmd = function(params) {
      var cmd;
      params = _.defaults(params, this.defaults.params);
      return cmd = "echo '" + params.msg + "' | " + this.options.path + " " + params.editorParams;
    };

    /*
     # Reconfigure logger
     #  & build shell command
     #  & and execute command
     # @param {String} msg
     # @param {Object} params
     # @param {Object} opts
    */


    GrowlLoggerAdapter.prototype.log = function(msg, params, opts) {
      var cmd;
      params.msg = msg;
      if (_.isObject(opts)) {
        this.setup(opts);
      }
      cmd = this.cmd(params, opts);
      return S.shell(cmd, true);
    };

    return GrowlLoggerAdapter;

  })();

  module.exports = GrowlLoggerAdapter;

}).call(this);


},{}]},{},[1])
;