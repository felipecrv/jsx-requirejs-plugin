# jsx-requirejs-plugin

A [RequireJS](http://requirejs.org) plugin for JavaScript files containing
[JSX](http://facebook.github.io/react/docs/jsx-in-depth.html). It's
[r.js](http://requirejs.org/docs/download.html#rjs) friendly (i.e. all
files containing JSX will be pre-compiled during the r.js build).

This is helpful when using [React](http://facebook.github.io/react/index.html)
with [RequireJS](http://requirejs.org).

## Install <a name="install"></a>

Download the plugin
[jsx](https://raw.github.com/philix/jsx-requirejs-plugin/master/js/jsx.js)
and the modified
[JSXTransformer](https://raw.github.com/alirussell/jsx-requirejs-plugin/master/js/JSXTransformer-0.10.0.js).

Place this in the directory that is your
[baseUrl](http://requirejs.org/docs/api.html#config-baseUrl) for your project,
or set up a [paths config](http://requirejs.org/docs/api.html#config-paths)
for it for the module ID `jsx`. This plugin depends on the RequireJS
[text plugin](http://requirejs.org/docs/download.html#text) to avoid
reimplementation of loading logic, so it should be installed as well.

## Usage <a name="usage"></a>

First, you need to configure RequireJS to use Facebook's
[JSXTransformer](https://raw.github.com/philix/jsx-requirejs-plugin/master/js/JSXTransformer-0.10.0.js)
and [React](http://facebook.github.io/react/index.html):

    require.config({
      // ...

      paths: {
        "react": "react-0.10.0",
        "JSXTransformer": "JSXTransformer-0.10.0"
      }

      // ...
    });

Then, you can reference JSX files via the `jsx!` plugin syntax. For example, to load
the `Timer.jsx` file that is in a `components` directory:

    require(['jsx!components/Timer'], function (Timer) {
    
    });

The Plugin is then going to load the JavaScript source file
`components/Timer.jsx`, parse it with Facebook's JSXTransformer and execute the
resulting JavaScript source.

To make it load a file with a `.jsx` extension (`components/Timer.jsx`) add the following parameter to the RequireJS config object:

    require.config({
      // ...

      jsx: {
        fileExtension: '.jsx'
      }

      // ...
    });

## Build <a name="build"></a>

Some specific configuration is necessary to make optimization by `r.js`
possible.

In your `build.js` you should have this to remove `jsx!` from module names in
the optimized JavaScript.

    onBuildWrite: function (moduleName, path, singleContents) {
      return singleContents.replace(/jsx!/g, '');
    },

To exclude `jsx.js` and, more importantly `JSXTransformer.js`, you should add
`"jsx"` to the `exclude` list in the `modules` field of the `build.js`.
`JSXTransformer.js` (dependency of `jsx`) gets excluded by excluding `jsx`.

Add `"react"` if you want it to be in it's own build file.

    modules: [
      {
        name: "main",
        exclude: ["react", "jsx"]
      }
    ]

### HACK to fix an issue with the preprocessing of JSXTransformer

`r.js` strips out all occurrences of the `'use strict'` string literal causing
script errors in resulting files. A simple solution to this is replacing
occurrences of `'use strict'` by an expression like `'use ' + 'strict'`.

You don't have to do it if you use the
[JSXTransformer-0.10.0.js](https://raw.github.com/philix/jsx-requirejs-plugin/master/js/JSXTransformer-0.10.0.js)
provided here.
