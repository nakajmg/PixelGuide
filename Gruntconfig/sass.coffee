### sass ###
module.exports =
  dist:
    files: [
      expand: true
      cwd: "./css/"
      src: ["*.scss"]
      dest: "./css/"
      ext: ".css"
    ]