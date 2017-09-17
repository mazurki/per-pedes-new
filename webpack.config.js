// Narzędzia do manipulowania ścieżkami do plików
const path = require('path');
// Narzędzia dostępu do plików na dysku
const fs = require('fs');

// Plugin budujący pliki HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Plugin zapisujący dane jako oddzielne pliki
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// Plugin czyszczący katalog `dist` przed budową paczki
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Instancja ExtractTextPlugin odpowiedzialna za stworzenie
// pliku CSS
const extractSCSS = new ExtractTextPlugin("styles.css");

// Katalog z plikami źródłowymi
const SOURCE_DIR = path.join(__dirname, '/src');
// Katalog z gotową stroną
const DIST_DIR = path.join(__dirname, '/dist');
// Główny plik JavaScript (w nim MUSI być import pliku SCSS)!
const MAIN_JS_FILE = path.join(SOURCE_DIR, 'scripts/app.js');

// list pluginów
let plugins = [];

let pages = findPagesFiles();

pages.forEach((pageName) => {
    plugins.push(new HtmlWebpackPlugin({
        filename: `${pageName}.html`,
        template: path.join(SOURCE_DIR, `${pageName}.hbs`)
    }));
});


// Zapisanie pliku CSS
plugins.push(extractSCSS);
// Wyczyść katalog 'dist' przed budową paczki
plugins.push(new CleanWebpackPlugin(DIST_DIR));

module.exports = {
    // Główny plik JS jest punktem wejścia dla WebPacka
    entry: MAIN_JS_FILE,

    // Katalog z gotową paczką
    output: {
        path: DIST_DIR,
        filename: 'scripts/main.js'
    },

    module: {
        rules: [
            // Obsługa plików szablonów HandlebarsJS
            {
                test: /\.hbs/,
                use: {
                    loader: "handlebars-loader",
                    query: {
                        inlineRequires: '/img/'
                    }
                }
            },

            // Obsługa plików SCSS i CSS
            {
                test: /\.s?css$/,
                use: extractSCSS.extract([
                    {
                        loader: "css-loader"
                    },{
                        loader: 'sass-loader'
                    }
                ])
            },

            // Obsługa fontów
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                // Ponieważ pliki SVG mogą być fontami i obrazkami
                // ignorujemy pliki w katalogi `img`
                exclude: [/img/],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'fonts/',
                    }
                }
            },

            // Obsługa obrazków
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: [/fonts/],
                // Ponieważ pliki SVG mogą być fontami i obrazkami
                // ignorujemy pliki w katalogi `fonts`
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        outputPath: 'img/',
                    }
                }
            }
        ]

    },

    plugins
}

function findPagesFiles(dir = SOURCE_DIR) {
    let result = [];

    let list = fs.readdirSync(dir);

    list.forEach(f => {
        file = path.join(dir, f);
        let stat = fs.statSync(file);

        if (stat && !stat.isDirectory() && /\.hbs$/.test(f)) {
            console.log(f)
            result.push(/(.*)\.hbs$/.exec(f)[1]);
        }
    });

    console.log(result);

    return result;
}
