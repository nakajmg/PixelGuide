### uglify ###
module.exports =
  my_target:
    files:
      "./js/all.min.js": ["./js/*.js", "!./js/all.min.js"]