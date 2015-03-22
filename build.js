({
  appDir: "./js",
  baseUrl: "./",
  dir: "./build_js",

  // call with `node r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  mainConfigFile: "./js/main.js",

  //stub jsx, text, jsxtransformer to ensure these plugins are not included in optimized file
  stubModules: ['jsx', 'text', 'JSXTransformer'],

  modules: [
    {
      name: "main"
    }
  ]
})
