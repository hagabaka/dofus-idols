requirejs.config({
  baseUrl: location.href,
  paths: {
    jquery: 'https://code.jquery.com/jquery-1.11.3.min',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.0/underscore-min',
    text: 'requirejs/text',
    domReady: 'requirejs/domReady',
  },
  shim: {
    lazy: {exports: 'Lazy'}
  }
});

requirejs(['knockout', 'viewModel'],
function(ko, viewModel) {
  ko.components.register('idol', {
    template: {require: 'text!./view/idolComponent.html'}
  });
  ko.components.register('searchWindow', {
    template: {require: 'text!./view/searchWindow.html'}
  });

  require(['domReady!'], function() {
    window.viewModel = viewModel;
    viewModel.activateKO();
  });
});

