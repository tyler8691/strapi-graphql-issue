module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        database: 'content',
        schema: 'strapi_graphql_issue',
        username: 'postgres',
        password: 'password',
        ssl: false
      },
      options: {
        pool: {
          min: 2,
          max: 10
        }
      }
    },
  },
});
