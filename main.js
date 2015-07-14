requirejs.config({
  baseUrl: '',
  paths: {
    jquery: 'https://code.jquery.com/jquery-1.11.3.min',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min',
    sifter: 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.1/js/standalone/selectize'
  }
});

requirejs(['knockout', 'viewModel', 'domReady!'],
function(ko, viewModel) {
  ko.components.register('idol', {
    template: {require: 'text!/idolComponent.html'}
  });

  viewModel.activateKO();
});

