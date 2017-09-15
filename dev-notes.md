
https://medium.com/@paooolino/a-modern-javascript-project-setup-b7842955d1d3

    npm install --save-dev webpack
    
    ./node_modules/.bin/webpack --config webpack.config.js
    
    npm run build
    
    npm i --save-dev uglifyjs-webpack-plugin
    
https://www.npmjs.com/package/uglifyjs-webpack-plugin
    
Important! The plugin has a peer dependency to uglify-js, so in order to use the plugin, also uglify-js has to be 
installed. The currently (2017/1/25) available uglify-js npm packages; however, __do not support minification of ES6 code__. 
In order to support ES6, an ES6-capable, a.k.a. harmony, version of UglifyJS has to be provided.

https://github.com/webpack-contrib/babel-minify-webpack-plugin

    npm install babili-webpack-plugin --save-dev
    
https://webcache.googleusercontent.com/search?q=cache:nhDPJXUMekkJ:https://kevin-chappell.com/web-development/smaller-webpack-bundles-with-babili/+&cd=9&hl=en&ct=clnk&gl=ch


https://github.com/kevlened/copy-webpack-plugin

    npm install --save-dev copy-webpack-plugin
    
clean dist    
    
    npm install clean-webpack-plugin --save-dev    