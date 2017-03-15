/**
 * Promise based GraphQL Client
 */
var Promise = require('bluebird');
var gtools = require('graph-tools');

var gqlURL = Ti.App.Properties.getString('graphql.server');

function getGraph(query, params) {
    Ti.API.log('GrphClient', 'getGraph() invoked for query: ' + gtools.extractQueryName(query));
    /**
     * ToDo: Should we validate the input and reject locally in case of error?
     */
    return new Promise(function (resolve, reject) {
        if (!Titanium.Network.online) {
            Ti.API.log('GrphClient', 'Network offline...');
            reject(new Error('Network offline.'));
        } else {
            var xhr = Ti.Network.createHTTPClient();

            xhr.onload = function (evt) {
                Ti.API.log('GrphClient', 'XHR onLoad: ' + JSON.stringify(evt));
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
                    //Ti.API.log('GrphClient', 'ResponseText: ' + this.responseText);

                    var respData = JSON.parse(this.responseText);

                    var respObj = {
                        data: respData.data, //This server sends data under .data key
                        xhr: {
                            status: xhr.status,
                        },
                    };
                    Ti.API.log('GrphClient', 'Response: ' + JSON.stringify(respObj));
                    resolve(respObj);
                }
            };
            xhr.onerror = function (e) {
                Ti.API.log('GrphClient', 'XHR onError: ' + gtools.extractQueryName(query) + ' e: ' + JSON.stringify(e));
                Ti.API.log('GrphClient', 'XHR onError: responseText: ' + JSON.stringify(this.responseText));
                var responseObj = {
                    xhr: {
                        errorCode: xhr.status,
                        errorMsg: this.responseText,
                        status: xhr.status
                    }
                };
                reject(new Error(responseObj));
            };

            //Prepare GraphQL request object
            var reqData = {
                query: query,
                variables: params
            };

            xhr.open("POST", gqlURL);

            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate');

            Ti.API.log("GrphClient", "[POST]: " + gqlURL);

            xhr.send(JSON.stringify(reqData));
        }
    });
}
exports.getGraph = getGraph;