/*global module:false*/
module.exports = function(grunt) {
	
	require('time-grunt')(grunt);

	/*
	 * Follow the Maintainable Gruntfiles approach by Thomas Boyt.
	 * Read about it here: http://thomasboyt.github.io/2013/09/01/maintainable-grunt.html 
	 * TLDR; 
	 * All custom tasks go in their individual .js files under /tasks folder 
	 * All config info goes in file of same name under /tasks/optiosn folder
	 */
	
	// Project configuration.
	var config ={
		// Metadata.
		pkg : grunt.file.readJSON('package.json'),
		banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		availabletasks : {// task
				filter: 'exclude',
	      		tasks: ['availabletasks', 'tasks']
		},
		clean: {
			dist:['dist/*']
		},
		/*
		 * Moving the COPY config under /tasks doesnt seem to work. Unable to access grunt object there.
		 * So defining it here only.
		 */
		copy: {
			'appc-env-specific' : {//Copy everything under env/<env> folder relative to project root
				options:{
					process: function(content,srcpath){ //replaces version tag with current version being built
						grunt.log.writeln('File processor invoked for:'+srcpath);
						return content.replace(/<version>(.+)<\/version>/, function(match, p1, offset, string){
							return match.replace(p1, grunt.config.get('pkg.version'));
						});
					},
					noProcess: ['!tiapp.xml'] //only run tiapp.xml through the processor
				},
				files :[{
					expand : true,
					cwd : 'env/<%= grunt.config.get("opfolder")  %>',
					src : ['**/*'],
					dest : '.',
				}]
			},
			'appc-build-artifacts':{//Copy build artifacts for future reference
				files :[{
					expand: true,
					cwd : '.',
					src : [
						'build/**',
						'Resources/**'
					],
					dest : 'dist/<%= grunt.config.get("pkg.version")  %>/<%= grunt.config.get("opfolder")  %>'
				}]
			},
		},
		'convert' : { 
			xml2json : { 
				files :[{
					expand : true,
					cwd : '.',
					src : ['tiapp.xml'],
					dest : 'tmp/',
					ext : '.json'
				}]
			},
		},
		jshint : {
			options : {
				curly : true,
				eqeqeq : true,
				immed : true,
				latedef : true,
				newcap : true,
				noarg : true,
				sub : true,
				undef : true,
				unused : true,
				boss : true,
				eqnull : true,
				globals : {}
			},
			gruntfile : {
				src : 'Gruntfile.js'
			},
			lib_test : {
				src : ['lib/**/*.js', 'test/**/*.js']
			}
		}
	};
	
	//Load any custom task config options placed under tasks/options
	grunt.util._.extend(config, loadConfig('./tasks/options/'));
	grunt.initConfig(config);

	//Load any grunt-* tasks defined in package.json
	require('load-grunt-tasks')(grunt);
	
	//Load our custom tasks
	grunt.task.loadTasks('./tasks');

	//Default: List all tasks
	grunt.registerTask('default', ['release']);

};

function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;
 
  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });
 
  return object;
}