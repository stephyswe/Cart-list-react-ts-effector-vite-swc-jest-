const config = {
  testEnvironment: "jsdom",
  rootDir: "src",
  transform: {
    "^.+\\.[jt]sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "esnext",
          parser: { syntax: "typescript", tsx: true },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).(j|t)s?(x)"],
};

module.exports = config;
