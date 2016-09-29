/**
 * @author Patel, Nirmalkumar
 * 
 * Grunt task to bump version number
 */
module.exports = function(grunt) {

	grunt.registerTask('version-bump', 'Updates version in package.json (major.minor.patch)', function(what) {
		
		//Use npm version cmd to update version field in package.json
		grunt.task.run('shell:npm-version:' + what);
		
		//Refresh grunt.config.pkg with updated contents (version number) of package.json
		grunt.task.run('readpkg');
	});

	grunt.registerTask('readpkg', 'Read in the package.json file', function() {
		grunt.config.set('pkg', grunt.file.readJSON('./package.json'));
	});
}; 