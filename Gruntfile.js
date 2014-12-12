module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jasmine_node: {
      all: ["spec/"]
    },
    watch: {
      files: ["spec/**/*", "lib/**/*"],
      tasks: ["jasmine_node"]
    }
  });

  grunt.loadNpmTasks("grunt-jasmine-node");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jasmine_node"]);
};
