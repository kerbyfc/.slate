# shell class for easy execution
shell = require './components/Shell.coffee'

# try read and parse configuration file
try
  global.cfg = JSON.parse shell.call 'cat', 'slate.json'
catch e
  throw new Error "Invalid config: #{e.message}"

# include helper functions ...
require './utils.coffee'

# FIXME GLOBALS -> DI
Logger = require './components/Logger.coffee'
global.logger = new Logger

# FIXME glob directory
global.components =
  focuser  : require './components/Focuser.coffee'
  resizer  : require './components/Resizer.coffee'
  switcher : require './components/Switcher.coffee'
  rekauncher: require './components/Relauncher.coffee'
