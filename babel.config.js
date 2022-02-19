module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@redux': './src/redux',
            '@utils': './src/utils',
            '@helpers': './src/helpers',
            '@services': './src/services',
            '@assets': './assets',
            '@constants': './src/constants',
            '@navigation': './src/navigation'
          }
        },
      ],
    ],
  };
};
