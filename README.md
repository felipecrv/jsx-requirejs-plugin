# jsx-requirejs-plugin

A [RequireJS][requirejs] plugin for JavaScript files containing [JSX][jsx]. It's
[r.js][rjs] friendly (i.e. all files containing JSX will be pre-compiled during
the r.js build).

This is helpful when using [React][react] with [RequireJS][requirejs].

## Install <a name="install"></a>

Download the plugin
[jsx](https://raw.github.com/philix/jsx-requirejs-plugin/master/js/jsx.js)
and the modified [JSXTransformer][modifiedjsx].

Place this in the directory that is your
[baseUrl](http://requirejs.org/docs/api.html#config-baseUrl) for your project,
or set up a [paths config](http://requirejs.org/docs/api.html#config-paths)
for it for the module ID `jsx`. This plugin depends on the RequireJS
[text plugin](http://requirejs.org/docs/download.html#text) to avoid
reimplementation of loading logic, so it should be installed as well.

## Usage <a name="usage"></a>

First, you need to configure RequireJS to use Facebook's
[JSXTransformer][modifiedjsx] and
[React](http://facebook.github.io/react/index.html):

```js
    require.config({
      // ...

      paths: {
        "react": "react-with-addons",
        "JSXTransformer": "JSXTransformer"
      }

      // ...
    });
```

Then, you can reference JSX files via the `jsx!` plugin syntax. For example, to load
the `Timer.jsx` file that is in a `components` directory:

```js
    require(['jsx!components/Timer'], function (Timer) {

    });
```

The Plugin is then going to load the JavaScript source file
`components/Timer.jsx`, parse it with Facebook's JSXTransformer and execute the
resulting JavaScript source.

## Configuration options <a name="options"></a>

To load files containing JSX code with a specific extension
(`components/Timer.jsx`) add the following parameter to the RequireJS config
object:

```js
    require.config({
      // ...

      jsx: {
        fileExtension: '.jsx'
      }

      // ...
    });
```

The `.jsx` extension is used by default. `r.js` will get confused and fail to
compile your JSX code if you use `.js`.

You can use the ES6 features supported by JSXTransformer by using the `harmony`
option:

```js
    jsx: {
      harmony: true
    }
```

You can pass the `stripTypes` flag along for [Flow](http://flowtype.org) type
annotations:

```js
    jsx: {
      stripTypes: true
    }
```

## Build <a name="build"></a>

If you are using `r.js` to optimize your application for production, add `text`,
`jsx` and `JSXTransformer` to the `stubModules` array field of the `build.js`.

```js
    stubModules: ['jsx', 'text', 'JSXTransformer'],

    modules: [
      {
        name: "main"
      }
    ]
```
After successful optimization, all the `jsx!` files will be precompiled
(converted from JSX to JS) and will be added/optimized into the build file.

### HACK to fix an issue with the preprocessing of JSXTransformer

`r.js` strips out all occurrences of the `'use strict'` string literal causing
script errors in resulting files. A simple solution to this is replacing
occurrences of `'use strict'` by an expression like `'use ' + 'strict'`.

You don't have to do it if you use the [JSXTransformer.js][modifiedjsx]
provided here.

[requirejs]: http://requirejs.org "RequireJS"
[react]: http://facebook.github.io/react/index.html "React"
[rjs]: http://requirejs.org/docs/download.html#rjs "r.js"
[jsx]: http://facebook.github.io/react/docs/jsx-in-depth.html "JSX in Depth"
[modifiedjsx]: https://raw.github.com/philix/jsx-requirejs-plugin/master/js/JSXTransformer.js "Modified JSXTransformer"
