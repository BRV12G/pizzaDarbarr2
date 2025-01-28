// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [...compat.extends("next/core-web-vitals")];

// export default eslintConfig;


import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Ensure the correct base directory
});

export default [
  // Extend Next.js recommended config
  ...compat.extends("next/core-web-vitals"),
  
  // Add additional custom rules or parser options
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: "@babel/eslint-parser", // Use a compatible parser
      parserOptions: {
        requireConfigFile: false, // Avoid issues with @babel/eslint-parser
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    rules: {
      // Example of custom rules
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
