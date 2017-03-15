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
	'appc-run-sim' : {
		/*
		 *  Replace with your simulator ID obtained using following command:
		 *  $ xcrun simctl list
		 */
		command : 'appc run -p ios --log-level info --retina -C A7BDE792-2DA3-4B3E-807B-505F4212AE96'
	},
	'appc-run-trace' : {
		/*
		 *  Replace with your simulator ID obtained using following command:
		 *  $ xcrun simctl list
		 */
		command : 'appc run -p ios --log-level trace --retina -C A7BDE792-2DA3-4B3E-807B-505F4212AE96'
	},
	'appc-run-device' : {
		/*
		 *  Replace with your Device ID obtained using following command:
		 *  $ instruments -s devices
		 */
		command : 'appc run -p ios -T device --log-level info -V "Developer Certificate" -P "PPUID" --skip-js-minify -C 8bd722c4e785d3dae9a064063eaee1adc8114d7d'
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
	},
	'eslint' : {
		command : '`npm bin`/eslint . --ext .gql'
	},
	'gql-get-schema' : {
		command : '`npm bin`/get-graphql-schema http://10.250.3.48/graphql > ./app/assets/graphResponses/schema.json'
	}

}; 
