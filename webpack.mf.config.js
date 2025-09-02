const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'microfrontend.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist-mf'),
        filename: 'microfrontend.mjs',
        library: {
            type: 'module',
            name: 'ElClubDeLaFuerza'
        }
    },
    experiments: {
        outputModule: true
    },

	// Externals as ESM imports — host should provide/resolve these imports
	externalsType: 'module',
	externals: {
		react: 'react',
		'react-dom': 'react-dom'
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		alias: {
			'react-native$': 'react-native-web'
		}
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/, 
				exclude: /node_modules/,
				use: 'ts-loader'
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'microfrontend build',
		})
	]
};
