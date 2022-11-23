const mix = require("laravel-mix");
require("mix-env-file");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    stats: {
        children: true,
    },
});

/**
 *process.env.変数名で.envの環境変数を読み出せるように設定
 */
mix.js("resources/js/app.js", "public/js")
    .react()
    .sourceMaps(true, "inline-source-map")
    .sass("resources/sass/app.scss", "public/css")
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")])
    .env(process.env.ENV_FILE);
