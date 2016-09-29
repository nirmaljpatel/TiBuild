/**
 * @author Patel, Nirmalkumar
 */

module.exports = function(grunt) {

	grunt.registerTask('release', 'App deployment task', function(arg1) {
		grunt.log.writeln('Got arguments: ' + arguments.length);
		
		
		//1. Clean any older files in the dist folder
		//TODO: Not deleting old releases until we figure out a backup location.
		//grunt.task.run('clean:dist');
		
		//2. Determine new version number to be distributed from package.json
		if(arguments.length === 0) {
			grunt.log.writeln("Version increment not specified on command-line. Release using current version number from pacakge.json");
		} else {
			grunt.task.run('version-bump:'+arg1);
		}
		
		/*
		 * Below wont work. Logs: "Releasing Version: undefined"
		 * Remeber grunt schedules task to run async after this one completes.
		 */
		//grunt.log.writeln('Releasing Version: ' + grunt.option('version'));

		//3. Build Distributable
		grunt.task.run('distribute');
		
		//4. Publish dist/<release> folder contents to some server - TODO
		
	});
}; 