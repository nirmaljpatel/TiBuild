module.exports = function(grunt) {
	grunt.registerTask('lint', 'calling lint for graphql', function() {
		grunt.task.run('shell:gql-get-schema');
		grunt.task.run('shell:eslint');
	});
};
