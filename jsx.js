define(['JSXTransformer', 'text'], function (JSXTransformer, text) {

  'use strict';

  var buildMap = {};

  var jsx = {
    version: '0.1.0',

    load: function (name, req, onLoadNative, config) {
      var onLoad = function(content) {
        try {
          if (-1 === content.indexOf('React.DOM')) {
            content = "/** @jsx React.DOM */\n" + content;
          }
          content = JSXTransformer.transform(content).code;
        } catch (err) {
          err.message += ' File: ' + name + '.js: ';
          onLoadNative.error(err);
          throw err;
        }

        if (config.isBuild) {
          buildMap[name] = content;
        }

        onLoadNative.fromText(content);
      };

      onLoad.error = function(err) {
        onLoadNative.error(err);
      };

      text.load(name + '.js', req, onLoad, config);
    },

    write: function (pluginName, moduleName, write) {
      if (buildMap.hasOwnProperty(moduleName)) {
        var text = buildMap[moduleName];
        write.asModule(moduleName, text);
      }
    }
  };

  return jsx;
});
