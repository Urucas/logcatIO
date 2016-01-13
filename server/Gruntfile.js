module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    babel: {
      options: { sourceMap: false },
      dist: {
        files: [{
          cwd: './lib',
          src: ['*.js'],
          dest: 'dist',
          ext: '.js',
          expand: true
        }]
      }
    }
  });
  grunt.registerTask('build', ['babel']);
}
