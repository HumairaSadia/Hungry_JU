/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  /* ========================================================
     👇 ADD THIS PROJECTS ARRAY TO SPLIT THE ENVIRONMENTS 👇
     ======================================================== */
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/backend/**/*.test.js'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/frontend/**/*.test.js'],
    },
  ],

  // Comment out or remove the root level testEnvironment and testMatch lines
  // so they do not conflict with your project sub-settings below:
  // testEnvironment: "jest-environment-node",
  // testMatch: [ ... ],
};

module.exports = config;
