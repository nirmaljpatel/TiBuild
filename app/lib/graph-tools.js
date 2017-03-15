/**
 * Utility functions for GraphQL interface
 */
function extractQueryName(queryStr) {
    var queryNameRegEx = /^query ((\w){1,})/;
    var arr = queryStr.match(queryNameRegEx);
    return arr[1] || "queryName";
}
exports.extractQueryName = extractQueryName;