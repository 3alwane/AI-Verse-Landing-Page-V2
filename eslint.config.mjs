import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  {
    // 1. Ignores must be first
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "dist/**",
      "templates/**",
    ],
  },
  {
    // 2. Main Config
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect", // This works in v9 without the v10 crash
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...tsPlugin.configs.recommended.rules,
      // Add your custom project rules here
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn", // Change error to warning
      "@typescript-eslint/no-explicit-any": "off", // Allow 'any' for now
      "@next/next/no-img-element": "off", // Allow <img> tags
      "@typescript-eslint/no-require-imports": "off", // Allow require() in tailwind.config
      "react/display-name": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
