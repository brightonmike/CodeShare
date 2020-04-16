## Pre-requisites

You will need to sign up for a free MongoDB instance over at: https://mlab.com/.

Create a new database and store the MongoDb URI in a `.env` file e.g `DB_URL=mongodb://<dbuser>:<dbpassword>@ds255309.mlab.com:55309/genecodeshare`.

Remember to edit the URI to include your database user and password set within the Mlab control panel.

Whilst you can just dive in and start coding - for this project - I highly recommend you do some background reading first particularly on GraphQL. This application *could* work without GraphlQl - but where's the fun in that?

Apollo, the dependancy which provides GraphQl server and client within the project has some exellent documentation: https://www.apollographql.com/docs/tutorial/introduction/

You can experiment with querying the GraphQl server by just running the server:

```bash
cd Server && yarn serve
```

Then navigate to [http://localhost:4000](http://localhost:4000). This opens the Apollo GraphQl playground which lets you write queries. You can find the queries you have available within `Client/graphql`.

For example, you can try retrieving a specific snippet, replacing `snippetId` with the ID of the snippet:

```graphql
{
  getSnippet(id: "snippetId") {
    title,
    author,
    code,
    _id
  }
}
```

The playground is a helpful way of learning and experimenting with GraphQl outside of the app itself. It's also how you can test new schema's which have been added to the server.

## Getting Started

First, run the GraphQL server:

```bash
cd Server && yarn serve
```

Then run the front end (open a separate terminal):

```bash
cd Client && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can run the Apollo client by opening [http://localhost:4000](http://localhost:4000).

## Apollo Client

All queries, mutations are defined in the `./graphql` folder. These can then be imported into components. For example:

```javascript
import SNIPPETS_QUERY from '../../graphql/queries/snippets.query';

const Snippets = () => {
  const { data, loading, error } = useQuery(SNIPPETS_QUERY);

  // iterate data.getSnippets
  return (
    <div>
      {data && data.getSnippets.map(snippet => {
          ...
      })
    </div>);
```

## Server

The server effectively does two jobs.

1. It handles CRUD operations against the MongoDB.
2. It resolves CRUD operations into GraphQl schema.

What do we mean by point 2?

In a tradional app, we might only need the first step. We might use Fetch API, XHR, Ajax, to fetch some data from an external source and inject into our app.

Here we're also implementing a GraphQl server. The job of the resolvers is to tie CRUD to the schema.

This also means we can resolve other third-party services into our GraphQl schema. For example, we could add data to the snippets from another source. Yet, the front end only needs to make one, singular query. This is one of the many benefits of GraphQl.

### Adding schema

Currently, all the schema is located within `schema/snippets.js`. 

### Adding a method

Mongo methods all reside in `model`. There is full documentation on the operations available over at: http://mongodb.github.io/node-mongodb-native/3.5//api/

### Add a resolver

Within `resolvers/snippets.js` we have a file where we resolve the schema with the methods. For example, we want `addSnippet` mutation to be resolved by the `addSnippet` method.

So the code would be:

```javascript
const addSnippet = require('../model/add-snippet');

const snippetResolver = {
  Mutation: {
    addSnippet: async (_, { snippet }) => addSnippet(snippet)
  },
};

module.exports = snippetResolver;
```

Keeping the naming conventions consistent is crucial, it makes it much easier to work with and figure out what's going on. Try to keep to the conventions that currently exist.

## Authentication

Manually writing authentication is hard, so we're using Auth0 authentication-as-a-service.

- Google API keys are under my Gene Google account (michael@gene.co.uk).
- These are added to the Auth0 integration.
- Auth0 provides client ID/secret and a unique domain.
- Auth0 handles the session authentication.
- Authentication is limited to accounts within Gene Google organisation.

Further, we also need to ensure GraphQl server is authenticated. This is done using JSON web tokens passed through the headers of the reqeusts. Authentication is checked with each resolver, ensuring that session expiry functions correctly.