const path = require('path'), glob = require('glob');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        app: './src/lib/app.js',
        bs2: './src/lib/bs2.js',
        envelope: './src/lib/envelope.js',
        knob: './src/lib/knob.js',
        print: './src/lib/print.js',
        utils: './src/lib/utils.js'
        // main: glob.sync('./src/**/*.js'),
        // main: [
        //     './src/app.js',
        //     './src/lib/bs2.js'
        // ]
    },
    output: {
        filename: './lib/[name].js',
        path: path.resolve(__dirname, 'dist') //,
        // library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new UglifyJSPlugin()
        new BabiliPlugin({
            removeDebugger: true,
            removeConsole: false
        }, {
            comments: false
        }),
        new CopyWebpackPlugin([
            { from: './src/index.html' },
            { from: './src/midi.html' },
            { from: './src/print.html' },
            { from: './src/templates/patch-sheet-template.html' },
            { from: './src/css/main.css', to: 'css'},
            { from: './src/css/midi.css', to: 'css' },
            { from: './src/css/patch.css', to: 'css' },
            { from: './src/css/print.css', to: 'css' },
            { from: './src/lib/base64js.min.js', to: 'lib' },
            { from: './src/lib/js.cookie.js', to: 'lib'  },
            { from: './src/lib/webmidi.min.js', to: 'lib'  },
            { from: './src/lib/msgpack.min.js', to: 'lib'  },
            { from: './src/lib/moment.min.js', to: 'lib'  },
            { from: './src/lib/tonal.min.js', to: 'lib'  },
            { from: './src/lib/lity.min.js', to: 'lib'  }
        ])
    ]
};