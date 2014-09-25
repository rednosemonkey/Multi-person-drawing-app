module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

// CONFIG

//compass required for trigonometry functions used in swatch menu
		compass: {
			dev: {
				options: {
					sassDir: 'sass/',
					cssDir: 'css/',
					environment: 'development',
					outputStyle: 'expanded'
				}
			} 
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			build: {
				src: 'css/draw-sockets.css'
			},
		},

		cssmin: {
			build: {
				files: {
					'prod/draw-sockets.css': ['css/draw-sockets.css']
				}
			}
		},

		watch: {
			stylesheets: {
				files: 'sass/**/*.scss',
				tasks: [ 'default' ]
			}
		}
	 
	});

// DEPENDENT PLUGINS

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');

// TASKS

	grunt.registerTask(
		'default', 
		[ 'compass', 'autoprefixer', 'cssmin', 'watch' ]
	);

};
