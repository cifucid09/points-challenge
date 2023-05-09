module.exports = {
  modulePaths: ["<rootDir>", "app"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "app"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
  },
  collectCoverage: true,
  collectCoverageFrom: ["app/**/*.{js,jsx}", "app/**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["entry.client.tsx", "entry.server.tsx"],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transformIgnorePatterns: [
    "/node_modules/(?!(@remix-run/node|@remix-run/web-fetch|@remix-run/web-blob|@remix-run/web-stream|@remix-run/web-form-data|@remix-run/web-file|@web3-storage/multipart-parser)/)",
  ],
  transform: {
    "^.+\\.(js|ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
