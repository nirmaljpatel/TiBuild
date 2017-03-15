/**
 * This module should contain:
 * 1) Define GraphQL Query in a <ModelName>.gql file in same folder
 * 2) Define functions to parse values of any keys that cannot be extracted by defaultParser() in this file
 * 3) Add all the complex parsers to the respParsers Map.
 */

//ToDo: These methods should live somewhere common
function respParser(key, json) {
    Ti.API.log('TechProfile', 'finding a parser for: ' + key);
    return respParsers[key] ? respParsers[key](key, json) : defaultParser(key, json);
}
exports.respParser = respParser;

/**
 * This is the defaultParser that returns value at obj.key or null if key doesnt exist
 */
function defaultParser(key, json) {
    Ti.API.log('TechProfile', '...defaultParser()');
    return json[key] ? json[key] : null;
}

/**
 * Map of all keys that require complex parsers
 * A complex parser is one where we need to do more than just obj.key to obtain the value
 */
var respParsers = {
    "ID": extractIdentityId,
    "PhoneNumber": extractPhoneNumber,
    "EmailAddress": extractEmailAddress,
};
function extractIdentityId(key, json) {
    return json.IdentityID;
}

function extractPhoneNumber(key, json) {
    return (json.PhoneNumber.Data[0]) ? json.PhoneNumber.Data[0].Number : null;
}

function extractEmailAddress(key, json) {
    return (json.EmailAddress.Data[0]) ? json.EmailAddress.Data[0].Address : null;
}