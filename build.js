({
  appDir: "./js",
  baseUrl: "./",
  dir: "./build_js",

  // call with `node r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  mainConfigFile: "./js/main.js",

  stubModules: ['jsx'],

  modules: [
    {
      name: "main",
      exclude: ["react", "JSXTransformer", "text"]
    }
  ]
})
