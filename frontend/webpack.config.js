/*Usar sempre o PATH para não dar erro no endereço em diferentes SOs pois no windows a barra
dos endereços é contrária a barra do mac e linux*/
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, //Qualquer um que termine com .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]

    /*A regra acima diz:
      1) "test:" =<Para quelquer arquivo que termine com .js>
		  2) "exclude:" =<Se esse arquivo não está na pasta node_modules>
		  3) "use:" =<Usar nele o babel-loader>*/

  },
}