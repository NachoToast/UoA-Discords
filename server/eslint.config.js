// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        ignores: ['eslint.config.js', 'build/**', 'node_modules/**'],
        rules: {
            // Possible Problems (https://eslint.org/docs/latest/rules/#possible-problems)

            'no-await-in-loop': 'error',                 // In almost all cases, Promise.all() should be used instead.
            'no-template-curly-in-string': 'error',      // Easy to forget to use backticks.
            'no-unreachable-loop': 'error',              // Why have a loop if it only executes once?
            'no-useless-assignment': 'error',            // Surprised TypeScript doesn't have an option for this one.
            'require-atomic-updates': 'error',           // Surprised ESLint has an option for this one.
            
            // Suggestions (https://eslint.org/docs/latest/rules/#suggestions)

            "camelcase": "off",                          // Better type-aware naming rules are below.
            "class-methods-use-this": "off",             // Better type-aware class rules are below.
            "consistent-return": "error",                // No combining of "return x" and "return".
            "default-case-last": "error",                // Default cases should always be last.
            "eqeqeq": "error",                           // Strict equal (===) is much more predictable.
            "no-var": "error",                           // Use let or const instead, var is never needed.

            // TypeScript Specific (https://typescript-eslint.io/rules/?=xstrict-xstylistic-xdeprecated)

            "@typescript-eslint/class-methods-use-this": "error",           // If a class method can be static, it should be.
            "@typescript-eslint/explicit-function-return-type": "error",    // Explicit returns are more readable.
            "@typescript-eslint/explicit-member-accessibility": "error",    // Public methods should be explicit.
            "@typescript-eslint/member-ordering": "error",                  // Consistenty of class members is nice.
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "default",
                    "format": ["strictCamelCase", 'UPPER_CASE']
                },
                {
                    // Parameters for functions must be strict camel case.
                    "selector": "parameter",
                    "format": ["strictCamelCase"],
                    "leadingUnderscore": "allow" // But can have an underscore (e.g. for unused parameters).
                },
                {
                    // Private class properties must start with an _ to differentiate them from public ones.
                    "selector": "classProperty",
                    "modifiers": ["private"],
                    "format": ["strictCamelCase"],
                    "leadingUnderscore": "require"
                },
                {
                    // No formatting for private methods.
                    "selector": "classMethod",
                    "modifiers": ["private"],
                    "format": null
                },
                {
                    // Types should all be in pascal case.
                    "selector": "typeLike",
                    "format": ["PascalCase"]
                },
                {
                    // Same with enums.
                    "selector": "enumMember",
                    "format": ["PascalCase"]
                }
            ],
            "@typescript-eslint/prefer-readonly": "error",                  // Immutability is always preferred.
            "@typescript-eslint/switch-exhaustiveness-check": "error",      // Exhaustiveness checks are always good.
        }
    }
);
