class Focuser

  constructor: (@config = _.cfg 'focuser') ->
    @setup()

  setup: (@config = @config) ->
    _.each @config.directions, (key, direction) =>
      S.bind key + ":" + @config.modifier, (win) =>
        win.doOperation S.op 'focus', direction: direction

module.exports = new Focuser
