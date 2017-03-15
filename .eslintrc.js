module.exports = {
  parser: "babel-eslint",
  rules: {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values: 
      // 'apollo', 'relay', 'lokka', 'literal' 
      env: 'literal',
      validators: 'all',
      // Import your schema JSON here 
      schemaJson: require('./app/assets/graphResponses/schema.json'),

      // OR provide absolute path to your schema JSON 
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'), 

      // tagName is set automatically 
    }]
  },
  plugins: [
    'graphql'
  ]
};