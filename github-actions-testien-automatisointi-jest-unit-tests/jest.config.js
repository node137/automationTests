/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports', outputName: 'jest-junit.xml' }]
  ],
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules/', '/bin/', '/build/', '/.git/'],
};
