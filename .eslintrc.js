module.exports = {
    env: {
        node: true
    },
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        quotes: [
            'error',
            'single'
        ],
        'quote-props': [
          'error',
            'as-needed'
        ],
        semi: [
            'error',
            'never'
        ],
      'no-console': 'off'
    }
}