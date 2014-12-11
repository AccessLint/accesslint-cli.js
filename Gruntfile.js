module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jasmine_node: {
      all: ["spec/"]
    }
  });

  grunt.loadNpmTasks("grunt-jasmine-node");
  grunt.registerTask("default", ["jasmine_node"]);
};
