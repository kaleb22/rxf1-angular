module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  //globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/app/**/*.ts"],
  coveragePathIgnorePatterns: [
    "setup-jest.ts",
    "app.config.ts",
    "app.routes.ts",
    ".interface.ts",
    ".utils.ts",
  ],
};
