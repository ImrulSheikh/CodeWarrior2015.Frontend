/**
 * Created by ihasan on 12/23/2014.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // **********
        // Properties
        // **********

        app_dir: 'app',
        library_dir: 'lib',

        sass_dir: 'design',
        sass_images_dir: '<%= sass_dir %>/images',
        sass_dir_dist: '<%= library_dir %>/<%= sass_dir %>',
        sass_images_dir_dist: '<%= library_dir %>/<%= sass_images_dir %>',

        app_dir_dist: '<%= library_dir %>/<%= app_dir %>',

        // *****
        // Tasks
        // *****

        /**
         * Compile TypeScript files
         */
        ts: {
            default : {
                src: ["<%= app_dir %>/**/*.ts"],
                //outDir: "<%= app_dir_dist %>",
                out: '<%= app_dir_dist %>/out.js',
                reference: "<%= app_dir %>/reference.ts"
            },
            dev : {
                watch:'app'
            }
        },


        /**
        * Publish Bower Packages to assets/lib
        */
        bower: {
            install: {
                options: {
                    targetDir: "<%= library_dir %>",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },
        /**
        * Build SCSS files to assets/css
        * https://github.com/sindresorhus/grunt-sass
        */
        sass: {
            options: {
                // Places to look for files @included in scss files
                includePaths: [,
                    '<%= sass_dir %>'
                ],
                sourceMap: true,
                imagePath: '/<%= sass_images_dir %>'
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= sass_dir %>/',
                        src: '*.scss',
                        dest: '<%= sass_dir_dist %>',
                        ext: '.css'
                    }
                ]
            }
        },

        /*
         * Watch for changes to scss files and automatically update dist/css files
         * https://github.com/gruntjs/grunt-contrib-watch
         */
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: ['**/*.ts'],
                tasks: ['ts']
            }
        },

        /**
         * Start a webserver to work on the styleguide and sample app
         * https://github.com/gruntjs/grunt-contrib-connect
         */
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: '.',
                    keepalive:true,
                    livereload:true
                }
            }
        },

        concat: {
            css: {
                src:  '<%= library_dir %>/eshopper/css/*.css',
                dest: '<%= library_dir %>/eshopper/css/eshopper.css'
            }
        },

        /**
         * Minify CSS
         * https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= library_dir %>/eshopper/css/',
                    src: ['eshopper.css'],
                    dest: '<%= library_dir %>/eshopper/css',
                    ext: '.min.css'
                }]
            }
        }


    });

    // Let *load-grunt-tasks* require everything. Note: Only loads tasks starting with "grunt-"
    require('load-grunt-tasks')(grunt);

    // This command registers the default task which will install bower packages into assets/lib
    grunt.registerTask("default", ["bower:install","sass" ]);

    grunt.registerTask("init", ["default", "ts:default" ]);
    grunt.registerTask("server", ["connect:server","init"]);

    grunt.registerTask("dev", ["default","ts:dev", "watch"]);

    //Different Tasks
    grunt.registerTask("eshopper-css", ["concat","cssmin"]);


};