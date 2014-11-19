module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-coffeeify'

  grunt.initConfig

    coffeeify:
      dist:
        files:
          'slate.js': [
            'src/slate.coffee'
          ]

    watch:
      coffee:
        files: ['src/**/*.coffee']
        tasks: ['build']

  grunt.registerTask 'build', ['coffeeify']
  grunt.registerTask 'default', ['build', 'watch']

