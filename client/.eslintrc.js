// ESLint configuration
module.exports = {
    // Parser
    parser: "@typescript-eslint/parser",

    // Parser options
    parserOptions: {
        // tsconfig file path
        project: "./tsconfig.json",

        // Parse ES2018 features
        ecmaVersion: 2018,

        // Allow use of imports
        sourceType: "module",

        // ECMAScript features
        ecmaFeatures: {
            // JSX
            jsx: true,
        },
    },

    // Environments
    env: {
        node: true,
        es6: true,
        browser: true,
        jest: true,
    },

    // Rule extensions
    extends: [
        // typescript-eslint rules
        "plugin:@typescript-eslint/recommended",

        // Import plugin rules
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",

        // React rules
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",

        // Prettier rules
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react",
    ],

    // Plugins
    plugins: ["react-hooks"],

    // Rules
    rules: {
        // Modify explicit function return type rule
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],

        // Enable import order rule
        "import/order": ["error"],

        // Disable conflicting ESLint base rules
        "no-unused-vars": ["off"],
        "no-undef": ["off"],
        "import/default": ["off"],
        "import/named": ["off"],

        // Disable prop-types, TypeScript typings will do the job
        "react/prop-types": ["off"],

        // Enable React hook rules
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },

    // Rule overrides
    overrides: [
        {
            // JavaScript files
            files: ["*.js"],
            rules: {
                // Disable rules that shouldn't apply to ES5 JS files
                "@typescript-eslint/no-var-requires": ["off"],
            },
        },
        {
            // Test Files
            files: [
                "**/__tests__/**/*.[jt]s?(x)",
                "**/?(*.)+(spec|test).[tj]s?(x)",
            ],
            rules: {
                // Disable no-extraneous-dependencies for tests
                "import/no-extraneous-dependencies": ["off"],
            },
        },
    ],

    // Settings
    settings: {
        // Use Webpack import resolver
        "import/resolver": "webpack",

        // React setup
        react: {
            // Detect react version
            version: "detect",
        },
    },
};
