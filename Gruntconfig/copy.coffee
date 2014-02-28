### copy ###
module.exports =
  publish:
    files: [
      src: ["./js/**", "./css/**", "./img/**", "*.html"]
      dest: "./dest"
      cwd: "."
      expand: true
    ]