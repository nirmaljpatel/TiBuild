/**
 * @author Patel, Nirmalkumar
 * Grunt tasks to read tiapp.xml 
 */
module.exports = function(grunt) {
	
	//After this task runs, tiapp.xml is available as grunt.config.tiapp
	grunt.registerTask('tiapp2prop', 'Reads tiapp.xml into JSON properties', function(){
		grunt.task.run('convert:xml2json', 'tiapp-json-reader', 'tiapp-tmp-clean');
	});
	
	grunt.registerTask('tiapp-json-reader', 'Reads tiapp.json', function(){
		var tiapp = grunt.file.readJSON('tmp/tiapp.json');
		grunt.config.set('tiapp',tiapp["ti:app"]);
		
		//var test = grunt.config.get('tiapp');
		//grunt.log.writeln('tiapp.xml as JSON: '+ test.name);
	});
	
	grunt.registerTask('tiapp-tmp-clean', 'Deletes tmp tiapp.json', function(){
		grunt.file.delete('tmp');
	});
};