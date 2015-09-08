requirejs.config({
  baseUrl: location.href.replace(/[^\/]*$/, ''),
  paths: {
    jquery: 'https://code.jquery.com/jquery-1.11.3.min',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.0/underscore-min',
    text: 'requirejs/text',
    domReady: 'requirejs/domReady',
    thenBy: 'thenBy',
  },
  shim: {
    lazy: {exports: 'Lazy'},
    thenBy: {exports: 'firstBy'},
  }
});

