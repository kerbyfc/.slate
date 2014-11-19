class Shell

  cache = {}

  exec: (cmd, cwd = '~/') ->
    S.shell(cmd, true, cwd).replace /\n$/g, ''

  call: (prog, args = '') ->
    cache[prog] = cache[prog] ||
      @exec "/usr/bin/which #{prog}"
    @exec "#{cache[prog]} #{args}"

module.exports = new Shell
