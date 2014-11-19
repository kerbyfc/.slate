_.mixin

  ###
   # Uppercase first letter
   # @param {String} string
  ###
  capitalize: (string) ->
    string.charAt(0).toUpperCase() + string.substring(1).toLowerCase()

  location: (win) ->
    S.log(win.app().name())
    try S.log '1' + win.x
    try S.log '2' + win.x()
    try S.log '3' + win.position
    try S.log '4' + win.position()

  ###
   # Get object property by path
   # @param {Object} obj
   # @param {String|Array} path
  ###
  getR: (obj, path = "") ->
    unless _.isObject obj
      throw new Error "Object expected"
    if _.isString path
      path = path.split "."
    first = _.first path
    path = _.rest path
    cur = obj[first]
    return cur unless path.length
    while (path.length)
      unless _.isObject cur
        return cur
      cur = cur[_.first path]
      path = _.rest path
    cur

  ###
   # Get configuration by
   # path, repsented by couple of
   # dot-separated keys
   # @param {String} path
   # @return {void} description
  ###
  cfg: (path) ->
    _.getR global.cfg, path

module.exports = global._ = _
