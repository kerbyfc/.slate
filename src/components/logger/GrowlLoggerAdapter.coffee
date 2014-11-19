# Growl adapter for Logger
class GrowlLoggerAdapter

  ###
   # Default options and parameters
  ###
  defaults:
    options:
      path: '/usr/local/bin'
    params:
      H: '127.0.0.1'

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

    # resolve path
    @path = options.path || @defaults.options.path

    # strip path
    @path = @path
      .replace /growlnofity$/, ''
      .replace /\/$/, ''

    # add executable name
    @path += "/growlnotify"

    @params = _.extend @defaults.params

  ###
   # Reduce accoumulator for shell parameters
   # @param {String} memo
   # @param {String} value
   # @param {String} key
  ###
  param: (memo, value, key) ->
    "#{memo} -#{key} '#{value}'"

  ###
   # Build shell command
   # @param {Object} params
  ###
  cmd: (params) ->
    params = _.defaults params, @params
    cmd = _.reduce(params, @param, @path)

  ###
   # Reconfigure logger
   #  & build shell command
   #  & and execute command
   # @param {String} msg
   # @param {Object} params
   # @param {Object} opts
  ###
  log: (msg, params, opts) ->

    # use message as -m parameter
    params.m = msg

    # reconfigure logger
    if _.isObject opts
      @setup opts

    # build shell command
    cmd = @cmd params, opts

    S.shell cmd, true

module.exports = GrowlLoggerAdapter
