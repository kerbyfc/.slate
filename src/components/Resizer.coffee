class Resizer

  constructor: (@config = _.cfg 'resizer') ->
    @setup()

  setup: (@config = @config) ->
    _.each @config.directions, (key, direction) =>

      S.bind key + ":" + @config.modifier, (win) =>
        location = _.location(win)
        win.doOperation S.opstr "resize +#{@config.step} +0"

module.exports = new Resizer
