module.exports = {
    env: {
        es2020: true,
        node: true,
    },
    root: true,
    extends: [
        'eslint:recommended'
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
        'no-console': 'off',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        indent: ['error', 4]
    }
}