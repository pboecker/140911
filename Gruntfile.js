module.exports = function(grunt) {

	//Initializing the configuration object
		grunt.initConfig({

		// paths
		paths: {
			assets: {
				css: './laravel/public/assets/stylesheets/',
				js: './laravel/public/assets/javascripts/',
				vendor: './laravel/public/assets/vendor/'
			},
			css: './laravel/public/css/',
			js: './laravel/public/js/'

		},
		// Task configuration
		less: {
			development: {
				options: {
					//NOT minifying the result
					compress: false,
				},
				files: {
					//compiling frontend.less into frontend.css
					"<%= paths.css %>frontend.css":"<%= paths.assets.css %>frontend.less",
					//compiling backend.less into backend.css
					"<%= paths.css %>backend.css":"<%= paths.assets.css %>backend.less"
				}
			},
			production: {
				options: {
					//minifying the result
					compress: true,
				},
				files: {
					//compiling frontend.less into frontend.css
					"<%= paths.css %>frontend.min.css":"<%= paths.assets.css %>frontend.less",
					//compiling backend.less into backend.css
					"<%= paths.css %>backend.min.css":"<%= paths.assets.css %>backend.less"
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			js_frontend: {
				src: [
					'<%= paths.assets.vendor %>jquery/dist/jquery.js',
					'<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
					'<%= paths.assets.vendor %>bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.js',
					'<%= paths.assets.vendor %>ekko-lightbox/dist/ekko-lightbox.js',
					'<%= paths.assets.js %>frontend.js'
				],
				dest: '<%= paths.js %>frontend.js',
			},
			js_backend: {
				src: [
					'<%= paths.assets.vendor %>jquery/dist/jquery.js',
					'<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
					'<%= paths.assets.vendor %>bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.js',
					'<%= paths.assets.vendor %>ekko-lightbox/dist/ekko-lightbox.js',
					'<%= paths.assets.js %>backend.js'
				],
				dest: '<%= paths.js %>backend.js',
			},
			js_sandbox: {
				src: [
					'<%= paths.assets.vendor %>jquery/dist/jquery.js',
					'<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
					'<%= paths.assets.vendor %>bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.js',
					'<%= paths.assets.vendor %>ekko-lightbox/dist/ekko-lightbox.js',
					'<%= paths.assets.vendor %>jquery-autosize/jquery.autosize.js',
					'<%= paths.assets.vendor %>jquery.lazyload/jquery.lazyload.js',
					'<%= paths.assets.vendor %>jquery.lazyload/jquery.scrollstop.js',
					'<%= paths.assets.vendor %>mixitup/src/jquery.mixitup.js',
					'<%= paths.assets.vendor %>swipebox/src/js/jquery.swipebox.js',
					'<%= paths.assets.vendor %>nivo-slider/jquery.nivo.slider.js',
					'<%= paths.assets.vendor %>knockoutjs/build/output/knockout-latest.debug.js',
					'<%= paths.assets.vendor %>knockout-mapping/knockoutout.mapping.js'
				],
				dest: '<%= paths.js %>sandbox.js',
			},
		},
		uglify: {
			options: {
				// Use if you want the names of your functions and variables unchanged
				mangle: false
			},
			frontend: {
				files: {
					'<%= paths.js %>frontend.min.js': '<%= paths.js %>frontend.js',
				}
			},
			backend: {
				files: {
					'<%= paths.js %>backend.min.js': '<%= paths.js %>backend.js',
				}
			},
			sandbox: {
				files: {
					'<%= paths.js %>sandbox.min.js': '<%= paths.js %>sandbox.js',
				}
			},
		},
		phpunit: {
				classes: {
						//location of the tests
						dir: 'laravel/app/tests/'
				},
				options: {
						bin: 'laravel/vendor/bin/phpunit',
						colors: true
				}
		},

		watch: {
				grunt: { files: ['Gruntfile.js'] },

				js_frontend: {
					files: [
						//watched files
						'<%= paths.assets.vendor %>jquery/dist/jquery.js',
						'<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
						'<%= paths.assets.vendor %>bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.js',
						'<%= paths.assets.vendor %>ekko-lightbox/dist/ekko-lightbox.js',
						'<%= paths.assets.js %>frontend.js'
						],
					//tasks to run
					tasks: ['concat:js_frontend','uglify:frontend'],
					options: {
						//reloads the browser
						livereload: true
					}
				},
				js_backend: {
					files: [
						//watched files
						'<%= paths.assets.vendor %>jquery/dist/jquery.js',
						'<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
						'<%= paths.assets.vendor %>bootstrap-autohidingnavbar/dist/jquery.bootstrap-autohidingnavbar.js',
						'<%= paths.assets.vendor %>ekko-lightbox/dist/ekko-lightbox.js',
						'<%= paths.assets.js %>backend.js'
					],
					//tasks to run
					tasks: ['concat:js_backend','uglify:backend'],
					options: {
						//reloads the browser
						livereload: true
					}
				},
				js_sandbox: {
					files: [
						//watched files
						'<%= paths.assets.vendor %>**/jquery.js',
						'<%= paths.assets.vendor %>**/bootstrap.js',
						'<%= paths.assets.vendor %>**/jquery.bootstrap-autohidingnavbar.js',
						'<%= paths.assets.vendor %>**/ekko-lightbox.js',
						'<%= paths.assets.vendor %>**/jquery.autosize.js',
						'<%= paths.assets.vendor %>**/jquery.lazyload.js',
						'<%= paths.assets.vendor %>**/jquery.mixitup.js',
						'<%= paths.assets.vendor %>**/jquery.swipebox.js',
						'<%= paths.assets.vendor %>**/jquery.nivo.slider.js',
						'<%= paths.assets.vendor %>**/knockout-latest.debug.js',
						'<%= paths.assets.vendor %>**/knockoutout.mapping.js'
					],
					//tasks to run
					tasks: ['concat:js_sandbox','uglify:sandbox'],
					options: {
						//reloads the browser
						livereload: true
					}
				},
				less: {
					//watched files
					files: ['<%= paths.assets.css %>*.less'],
					//tasks to run
					tasks: ['less'],
					options: {
						//reloads the browser
						livereload: true
					}
				},
				tests: {
					//the task will run only when you save files in this location
					files: ['laravel/app/controllers/*.php','laravel/app/models/*.php'],
					tasks: ['phpunit']
				}
			}
		});

	// Plugin loading
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-phpunit');

	// Task definition
	grunt.registerTask('init', ['less', 'concat', 'uglify']);
	grunt.registerTask('default', ['watch']);

};
