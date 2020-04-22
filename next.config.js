const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

require('dotenv').config()

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_REDIRECT: process.env.AUTH0_REDIRECT,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    GRAPHQL_API: process.env.GRAPHQL_API
  }

  // next.config.js object
  return {
    env,
  }
}
