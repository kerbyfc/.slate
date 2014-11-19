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
