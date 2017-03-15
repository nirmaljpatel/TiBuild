/**
 * Mock for GraphClient
 * To Mock a GraphQL query:
 * 1) Put the JSON response under app/assets/graphResponses
 * 2) Add a queryName: fileName mapping in mockFileMap below
 * 3) In the caller, require('graphLocal') instead of require('graphClient')
 * 3.1) Make this require conditional to use only in Simulators
 *      if(ENV_DEV) {
	        var graphClient = require('graphLocal');
        } else {
	        var graphClient = require('graphClient');
        }
 */
//ToDo: Use alloy.jmk to prevent files in assets/graphResponses to be copied into ipa
/**
 * ToDo: Enhancement
 * Can we use GraphQL schema to return a dynamically generated response rather than a static file?
 */
var Promise = require('bluebird');
var gtools = require('graph-tools');

var mockFileMap = {
    "queryName": "mockFileName",
    "techInfo": "TechProfile.resp",
};

function getGraph(query, params) {
    Ti.API.log('GrphLocal', 'getGraph() invoked...');
    //return Promise.delay(1000).then(function(){
    return new Promise(function (resolve, reject) {
        var qName = gtools.extractQueryName(query);
        Ti.API.log('GrphLocal', 'QueryName:' + qName);

        var fileName = mockFileMap[qName];
        var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'graphResponses');
        var file = Ti.Filesystem.getFile(dir.resolve(), fileName);
        Ti.API.log('GrphLocal', fileName + ':' + file.exists());

        var respData = JSON.parse(file.read())
        var respObj = {
            data: respData.data, //GraphQL sends data under .data key
            xhr: {
                status: 200,
            },
        };
        //Induce delay 
        setTimeout(function () {
            resolve(respObj);
        }, 3000);
    });
}
exports.getGraph = getGraph;