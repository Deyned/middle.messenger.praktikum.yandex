module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:node/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: ['warn', 'tab'],
		quotes: ['warn', 'single'],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-console': 'off',
		'no-tabs': 'off',
		'no-restricted-syntax': 'off',
		'func-names': 'off',
		'node/no-missing-import': 'off',
		'node/no-unsupported-features/es-syntax': 'off',
	}
};
