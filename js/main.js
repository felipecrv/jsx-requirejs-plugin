require.config({
  baseUrl: "js/",

  paths: {
    "react": "react-with-addons-0.11.1",
    "JSXTransformer": "JSXTransformer-0.11.1"
  },

  jsx: {
    fileExtension: '.jsx'
  }
});

require(['react', 'jsx!components/Timer'], function(React, Timer) {
  var start = new Date();

  // Mount the JSX component in the app container
  React.renderComponent(
      Timer({start: start}),
      document.getElementById('js-app-container'));
});
