/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(test).ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
