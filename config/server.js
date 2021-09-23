module.exports = ({ env }) => {
  return {
    host: '0.0.0.0',
    port: 1337,
    proxy: true,
    admin: {
      auth: {
        secret: 'b3abe4f045fa7cf81e190e0075f0f7b8'
      },
      autoOpen: false,
      serveAdminPanel: true
    }
  };
};
