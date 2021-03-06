var http = require('http');
var express = require('express');
var redirect = require("express-redirect");
var app = express();

redirect(app.use(require('morgan')('short')));

(function initWebpack() {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/ui/__webpack_hmr', heartbeat: 10 * 1000
    }));

    app.use(express.static(__dirname + '/'));
})();

app.redirect('/:path', '/ui/:path');

// respond to everything with the index.html contents
// to make domain.fi/settings style URLs work without hashes
app.get('*', function root(req, res) {
    res.sendFile(__dirname + '/ui/index.html');
});

if (require.main === module) {
    var server = http.createServer(app);
    server.listen(process.env.PORT || 3000, function onListen() {
      var address = server.address();
      console.log('Listening on: %j', address);
      console.log(' -> that probably means: http://localhost:' + address.port + '/ui/');
      console.log('You should use http://localhost:5120/ui/');
    });
}
