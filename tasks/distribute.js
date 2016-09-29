// ./tasks/distribute.js
/*
 * Builds Appc iOS Adhoc Distributables
 */

module.exports = function(grunt) {

	grunt.registerMultiTask('distribute', 'Build Distributable IPAs for diff environments', function() {
		grunt.log.write('Building Distributable IPA: ' + this.target);
		grunt.log.writeln(' Version: ' + grunt.config.get('pkg.version'));
		
		grunt.config.set('devcert', this.data.devcert);
		grunt.config.set('ppuid',this.data.ppuid);
		grunt.config.set('opfolder', this.target);
		
		grunt.config.set('crit_appid', this.data.crittercism.appid);
		grunt.config.set('crit_apikey', this.data.crittercism.apikey);
		
		
		grunt.log.writeln('...DevCert      : ' + grunt.config.get('devcert'));
		grunt.log.writeln('...PPUuid       : ' + grunt.config.get('ppuid'));
		grunt.log.writeln('...Output Folder: ' + grunt.config.get('opfolder'));
		
		//3.1 Setup files
		//3.2 Distributable IPAs
		//3.3 Upload dSyms 
		//3.4 Save build assets
		grunt.task.run('shell:appc-clean', 'copy:appc-env-specific', 'tiapp2prop', 'shell:appc-dist', 'shell:crittercism-create-dSYM', 'shell:crittercism-upload-dSYM', 'copy:appc-build-artifacts');
	});
}; 