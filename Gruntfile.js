module.exports = function(grunt) {
  grunt.initConfig({

    release: {
      options: {
        bump: true,
        file: 'package.json',
        add: true,
        commit: true,
        tag: true,
        push: true,
        pushTags: true,
        npm: true,
        npmtag: false,
        github: {
          repo: 'willcode2surf/couch-utils',
          usernameVar: 'willcode2surf',
          passwordVar: 'faster77'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-release');

};
