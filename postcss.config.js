module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // Use browserslist from package.json for modern browser targeting
      flexbox: 'no-2009',
    },
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          // Optimize CSS for modern browsers
          normalizeWhitespace: true,
          colorMin: true,
          minifyFontValues: true,
          minifySelectors: true,
        }],
      },
    }),
  },
};
