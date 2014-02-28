module.exports = (grunt) ->
  configDir = "Gruntconfig"
  fs = require "fs"
  path = require "path"
  fs.readdirSync(configDir).forEach (filePath) ->
    modulePath = path.join __dirname, configDir, filePath
    stats = fs.statSync modulePath
    fileName = filePath.split(".")[0]
    if stats.isFile() and filePath.charAt(0) isnt "." and filePath.charAt(0) isnt "_"
      grunt.config.set fileName, require modulePath

  packageJson  = grunt.file.readJSON "package.json"
  Object.keys(packageJson.devDependencies).slice(1).forEach grunt.loadNpmTasks

  grunt.registerTask "default", ["connect", "watch"]
  grunt.registerTask "publish", ["sass", "autoprefixer", "csso", "uglify"]
  grunt.registerTask "copy", ["copy:publish"]