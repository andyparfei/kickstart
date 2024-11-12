// eslint.config.js
import js from "@eslint/js"
import tsEslintPlugin from "@typescript-eslint/eslint-plugin"
import sveltePlugin from "eslint-plugin-svelte"
import tsEslintParser from "@typescript-eslint/parser"
import svelteParser from "svelte-eslint-parser"
import prettierConfig from "eslint-config-prettier"

// 1. Global Ignore Patterns (act as global ignores)
const globalIgnore = {
  ignores: [
    "**/.DS_Store",
    "**/node_modules/**",
    "**/build/**",
    "**/.svelte-kit/**",
    "**/package/**",
    "**/.env",
    "**/.env.*",
    "**/pnpm-lock.yaml",
    "**/package-lock.json",
    "**/yarn.lock",
  ],
}

// 2. ESLint Recommended Rules
const eslintRecommended = js.configs.recommended

// 3. TypeScript ESLint Recommended Rules
const tsRecommended = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsEslintParser, // Assign the parser object
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
    },
    globals: {
      process: "readonly",
      module: "readonly",
      require: "readonly",
      // Add other globals as needed
    },
  },
  plugins: {
    "@typescript-eslint": tsEslintPlugin,
  },
  rules: {
    ...tsEslintPlugin.configs.recommended.rules,
  },
}

// 4. Svelte ESLint Recommended Rules
const svelteRecommended = {
  files: ["**/*.svelte"],
  languageOptions: {
    parser: svelteParser, // Assign the parser object
    parserOptions: {
      parser: {
        ts: tsEslintParser, // Use TypeScript parser within Svelte files
        js: "espree", // Use Espree parser for JavaScript within Svelte files
        typescript: tsEslintParser,
      },
    },
    globals: {
      window: "readonly",
      document: "readonly",
      // Add other globals as needed
    },
  },
  plugins: {
    svelte: sveltePlugin,
  },
  rules: {
    ...sveltePlugin.configs.recommended.rules,
    "no-undef": "off",
    "no-console": "off",
  },
}

// 5. Prettier Integration to Disable Conflicting ESLint Rules
const prettierIntegration = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.svelte"],
  rules: {
    ...prettierConfig.rules,
  },
}

// 6. Main ESLint Configuration
const mainConfig = {
  files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsEslintParser, // Assign the parser object
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
      extraFileExtensions: [".svelte"],
    },
    globals: {
      window: "readonly",
      document: "readonly",
      process: "readonly",
      module: "readonly",
      require: "readonly",
      // Add other globals as needed
    },
  },
  plugins: {
    "@typescript-eslint": tsEslintPlugin,
    svelte: sveltePlugin,
  },
  rules: {
    "no-undef": "off", // Disable the no-undef rule as per your original config
    // Add or override any additional rules here
  },
}

// 7. Override Configuration for Test Files
const testFilesOverride = {
  files: ["**/*.test.ts", "**/*.spec.ts"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Disable the rule for test files
  },
}

// 8. Exception: Include .env.example Despite General Ignore Patterns
const envExampleConfig = {
  files: [".env.example"],
  languageOptions: {
    parser: tsEslintParser, // Assign the parser object
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
    },
    globals: {
      window: "readonly",
      document: "readonly",
      process: "readonly",
      module: "readonly",
      require: "readonly",
      // Add other globals as needed
    },
  },
  plugins: {
    "@typescript-eslint": tsEslintPlugin,
  },
  rules: {
    "no-undef": "off", // Disable the no-undef rule
    // Add any specific rules for .env.example if needed
  },
}

// Export the configuration array
export default [
  globalIgnore,
  eslintRecommended,
  tsRecommended,
  svelteRecommended,
  prettierIntegration,
  mainConfig,
  testFilesOverride,
  envExampleConfig,
]
