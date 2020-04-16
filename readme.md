## Pre-requisites

You will need to sign up for a free MongoDB instance over at: https://mlab.com/.

Create a new database and store the MongoDb URI in a `.env` file e.g `DB_URL=mongodb://<dbuser>:<dbpassword>@ds255309.mlab.com:55309/genecodeshare`.

You should add a collection called snippets.

Remember to edit the URI to include your database user and password.

## Getting Started

First, run the GraphQL server:

```bash
yarn serve
```

Then run the front end (open a separate terminal):

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

You can run the Apollo client by opening [http://localhost:4000](http://localhost:4000).

## Apollo Client

All queries, mutations are defined in the `./graphql` folder. These can then be imported into components.

## Apollo Server

The code which fetches the data from MongoDB

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## Deploy on ZEIT Now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
