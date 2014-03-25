require.config({
  baseUrl: "js/",

  paths: {
    react: "react-0.10.0",
    JSXTransformer: "JSXTransformer-0.10.0",
    text: "text",
    jsx: "jsx"
  }
});

define(['react', 'jsx!components/Timer'], function(React, Timer) {
  var start = new Date();

  // Mount the JSX component in the app container
  React.renderComponent(
      Timer({start: start}),
      document.getElementById('js-app-container'));
});
