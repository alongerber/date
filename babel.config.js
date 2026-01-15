module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@data': './src/data',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@store': './src/store',
            '@navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};
