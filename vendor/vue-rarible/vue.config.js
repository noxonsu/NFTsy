module.exports = {
  //  parallel: 8,
    runtimeCompiler: true,
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/wp-content/themes/Divi-child/assets/vue/'
        : 'http://localhost:8080/',
    outputDir: '../dist',
    configureWebpack: {
        devServer: {
            contentBase: '/wp-content/themes/Divi-child/assets/vue/',
            allowedHosts: ['2go24.loc'],
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        },
        externals: {
            jquery: 'jQuery'
        },
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js',
        },
    },
    css: {
       extract: {
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }
    },
};