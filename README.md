# TiGraphQL

A strategy to integrate with a GraphQL backend for Ti Apps.

1) Query
    - Maintain GQL queries in separate files so that it is simple to copy-paste them across across code files and a GraphiQL web interface for quick testing.
    - Support passing parameters 
    - Support fragments

2) Translation
    - Translation from server model definition to app models.

2) Validation
    - Grunt Tasks to download schema.json from the GQL Server and validate queries using ESLint.js

3) Testing using Mocks
    - Provides a simple way to mock GQL queries with JSON responses stored in the project folder.
