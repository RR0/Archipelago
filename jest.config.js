/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  modulePaths: ["node_modules", "src", "test", "."],
  testMatch: ["**/?(*.)test.+(ts)"],
  reporters: ["default", "jest-junit"],
  transform: {"^.+\\.(ts)$": "ts-jest"},
  /* roots: [
     "./src"
   ],*/
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/../../node_modules/jest-css-modules",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMocks.js"
  }
}
