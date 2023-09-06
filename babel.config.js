module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@dataBase': './src/dataBase', // Substitua pelo caminho correto para o seu módulo de base de dados
          // Outros aliases aqui, se necessário
        },
      },
    ],
  ],
};
