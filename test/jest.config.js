const config = {
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [['github-actions', { silent: false }], 'summary'],
}

module.exports = config
