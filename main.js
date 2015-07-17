requirejs.config({
  baseUrl: location.href,
  paths: {
    jquery: 'https://code.jquery.com/jquery-1.11.3.min',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.0/underscore-min'
  }
});

requirejs(['knockout', 'viewModel', 'domReady!'],
function(ko, viewModel) {
  ko.components.register('idol', {
    template: {require: 'text!./idolComponent.html'}
  });
  ko.components.register('searchWindow', {
    template: {require: 'text!./searchWindow.html'}
  });

  viewModel.activateKO();
});

