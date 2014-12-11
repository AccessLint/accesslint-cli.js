module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-karma");

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          files: ["test/**/*.js"]
        }
      }
    }
  });
};
