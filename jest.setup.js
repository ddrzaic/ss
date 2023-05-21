import "@testing-library/jest-dom/extend-expect";
import { TextEncoder } from "util";
import next from "next";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

next({ dev: true });

global.TextEncoder = TextEncoder;

// jest.config.ts
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/path/to/text-encoder.mock.ts"],
};

module.exports = createJestConfig(customJestConfig);
