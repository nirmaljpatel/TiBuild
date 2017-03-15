/**
 * Profile of the logged-in Technician
 */
if (Alloy.CFG.mockGQL) {
	var graphClient = require('graphLocal');
} else {
	var graphClient = require('graphClient');
}

exports.definition = {
	config: {
		columns: {
			"ID": "TEXT PRIMARY KEY",
			"FirstName": "TEXT",
			"LastName": "TEXT",
			"Alias": "TEXT",
			"PhoneNumber": "TEXT", //define mapper
			"EmailAddress": "TEXT", //define mapper
		},
		adapter: {
			type: "sql",
			collection_name: "techprofile",
			idAttribute: "ID"
		}
	},
	extendModel: function (Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			getFrmSrvr: function () {
				var thisModel = this;
				Ti.API.log('TechProfile', 'getFrmSrvr() invoked...' + this.get("Alias"));

				//Step 1: Read in the Query
				var gqTechProfile = require('graphQuery/TechProfile');

				//Step 2: Create a params objects if required for this query
				var params = {
					paramAlias: this.get("Alias")
				};

				//Step 3: Invoke request to GraphQL server
				return graphClient.getGraph(gqTechProfile.query, params)
					.then(function (response) {
						//Ti.API.log('TechProfile', 'Received: ' + JSON.stringify(response));
						//Step 4: Parse the response into Model.attributes
						var techProfile = response.data.Matches.Data[0];

						for (key in thisModel.config.columns) {
							thisModel.set(
								key,
								gqTechProfile.respParser(key, techProfile)
							);
						}
						return thisModel;
					})
					.then(function (techProfile) {
						//Just logging to verify model.attributes are correctly set in above step
						//Ti.API.log('TechProfile', 'After parsing GQL Response: ' + JSON.stringify(thisModel));
						return thisModel;
					});
			}
		});
		return Model;
	},
	extendCollection: function (Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});
		return Collection;
	}
};