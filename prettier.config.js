module.exports = {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: ['^[./]'],
    importOrderSeparation: false,
    importOrderSortSpecifiers: true,

    plugins: [
        'prettier-plugin-tailwindcss',
        '@trivago/prettier-plugin-sort-imports',
    ],
};
