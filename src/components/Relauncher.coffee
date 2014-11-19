class Relauncher

  constructor: (@config = _.cfg 'relauncher') ->
    @setup()

  setup: (@config = @config) ->
    S.bind @config.key + ":" + @config.modifier, S.op('relaunch')

module.exports = new Relauncher

