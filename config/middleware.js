module.exports = {
  load: {
    before: ['responseTime', 'logger', 'cors', 'responses', 'gzip'],
    order: [],
    after: ['parser', 'router'],
  },
  settings: {}
};
