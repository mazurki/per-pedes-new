# Per Pedes - strona drużyny

## Środowisko developerskie

### Wymagane programy:

1. [nodejs + npm](https://nodejs.org/en/)
2. Konsola (np. gitBash, PowerConsole)

### Instalacja zależości

Aby zaistalować pakiety używane przy pracy należy w konsoli uruchomić polecenie

```
npm i
```

### Używane pakiety

* [webpack](https://webpack.github.io/) - narzedzie do łączenia plików źródłowych w gotową stronę
  * [sass-loader](https://github.com/webpack-contrib/sass-loader)
  * [css-loader](https://github.com/webpack-contrib/css-loader)
  * [file-loader](https://github.com/webpack-contrib/file-loader)
  * [handlebars-loader](https://github.com/pcardune/handlebars-loader)
  * [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
  * [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)
  * [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
* [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) - serwer developerski
* [sass](http://sass-lang.com/) - prekompilator stylów (używamy składni scss)
* [handlebars](http://handlebarsjs.com/) - system szablonów

### Pliki i katalogi

* `/src` - główny katalog z plikami strony
  * `/fonts` - katalog na pliki fontów
  * `/img` - katalog na grafiki
  * `/scss` - katalog na pliki stylów SCSS
  * `/scripts` - katalog na pliki JavaScript
* `/dist` - katalog z plikami strony gotowymi do publikacji



