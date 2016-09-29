/**
 * @author Patel, Nirmalkumar
 * Grunt-Shell config
 */

module.exports = {
	'options' : {
	},
	'npm-version' : {
		command : function(semver) { 
			return 'npm version --no-git-tag-version '+ semver;
			}
	},
	'appc-clean' : {
		command : 'appc ti clean'
	},
	'appc-dist' : {
		command : 'appc run --force -p ios -T dist-adhoc --log-level warn -R "<%= devcert %>" -P "<%= ppuid %>" -O ./dist/<%= pkg.version %>/<%= opfolder %>'
	},
	'crittercism-create-dSYM' : { 
		options : { 
			stdout:true
		}, 
		command : 'zip --recurse-paths --quiet ./dist/<%= pkg.version %>/<%= opfolder %>/<%= tiapp.name %>.dSYM.zip ./build/iphone/build/Products/Release-iphoneos/<%= tiapp.name %>.app.dSYM'
	},
	// upload dSYM archive to crittercism
	'crittercism-upload-dSYM' : { 
		options: { 
			stdout:true
		}, 
		command : 'curl "https://api.crittercism.com/api_beta/dsym/<%= crit_appid %>" --write-out %{http_code} -F dsym=@"./dist/<%= pkg.version %>/<%= opfolder %>/<%= tiapp.name %>.dSYM.zip" -F key="<%= crit_apikey %>"'
	}

}; 