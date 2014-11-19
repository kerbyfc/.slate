# Growl adapter for Logger
class GrowlLoggerAdapter

  ###
   # Default options and parameters
  ###
  defaults:
    options:
      path: '/usr/bin/open'
    params:
      editorParams: '-fe'

  ###
   # Initialize logger
   # @param {Object} options
  ###
  constructor: (options) ->
    @setup options

  ###
   # Configure logger
   # @param {Object} options
  ###
  setup: (options) ->
    @options = _.defaults options, @defaults.options

  ###
   # Build shell command
   # @param {Object} params
  ###
  cmd: (params) ->
    params = _.defaults params, @defaults.params
    cmd = "echo '#{params.msg}' | #{@options.path} #{params.editorParams}"

  ###
   # Reconfigure logger
   #  & build shell command
   #  & and execute command
   # @param {String} msg
   # @param {Object} params
   # @param {Object} opts
  ###
  log: (msg, params, opts) ->

    params.msg = msg

    # reconfigure logger
    if _.isObject opts
      @setup opts

    # build shell command
    cmd = @cmd params, opts

    S.shell cmd, true

module.exports = GrowlLoggerAdapter

