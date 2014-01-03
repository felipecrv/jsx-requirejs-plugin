({
  appDir: "./js",
  baseUrl: "./",
  dir: "./build_js",

  // call with `node r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  mainConfigFile: "./js/main.js",

  onBuildWrite: function (moduleName, path, singleContents) {
    return singleContents.replace(/jsx!/g, '');
  },

  modules: [
    {
      name: "main",
      exclude: ["react", "jsx"]
    }
  ]
})
