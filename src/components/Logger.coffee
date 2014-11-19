class Logger

  adapters =
    growl: require "./logger/GrowlLoggerAdapter.coffee"
    editor: require "./logger/EditorLoggerAdapter.coffee"

  ###
   # Create logger with predefined adapter
   # @return {void} description
  ###
  constructor: (adapter = _.cfg 'logger.adapter') ->
    Adapter = adapters[adapter]
    @adapter = new Adapter _.cfg 'logger.options'

  ###
   # Log message with growlnotify
   # @param {String} msg
   # @param {Object} params
   # @param {Object} opts
  ###
  log: (msg, params = {}, opts = {}) ->

    if _.isObject msg
      msg = JSON.stringify msg

    @adapter.log msg,

      # params that will be passed to growlnotify
      _.clone params

      # options that will trigger environment
      _.clone opts,

# return singleton
module.exports = Logger
