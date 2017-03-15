# TiGraphQL

A strategy to integrate with a GraphQL backend for Ti Apps.

1. Query
    - Maintain GQL queries in separate files so that it is simple to copy-paste them across across code files and a GraphiQL web interface for quick testing.
    - Support passing parameters 
    - Support fragments

    1. Define GraphQL `<query>` in a `.gql` or `.graphql` file.
        - Each file can contain 1 query. 
        - The query can be broken down into `fragments` - in the same file though.
    2. Define a module `<query>.js` which has functions to extract data from the received response.
    3. `alloy.jmk` has a pre-compile hook that adds the content of this file into corresponding `<query>.js` module as and `exports.query` parameter.

2. Validation
    - Grunt Tasks to download schema.json from the GQL Server and validate queries using ESLint

3. Using Mocks for frontend development
    - Provides a simple way to mock GQL query responses with JSON files stored in the project folder.

    1. `graphLocal.js` module returns static JSON responses stored in `app/assets/graphResponses` folder.
