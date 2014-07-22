require.config({
  baseUrl: "js/",

  paths: {
    "react": "react-with-addons-0.10.0",
    "JSXTransformer": "JSXTransformer-0.10.0"
  },

  jsx: {
    fileExtension: '.jsx'
  }
});

require(['react', 'MyControllers'], function(React, MyControllers) {
  var start = new Date();

  // Mount the JSX component in the app container
  React.renderComponent(
      MyControllers.Timer({start: start}),
      document.getElementById('js-app-container'));
});
