requirejs(['requirejs/config'], function() {requirejs(['knockout', 'viewModel'],
  function(ko, viewModel) {
    ko.components.register('idol', {
      template: {require: 'text!./view/idolComponent.html'}
    });
    ko.components.register('searchWindow', {
      template: {require: 'text!./view/searchWindow.html'}
    });
    ko.components.register('filters', {
      template: {require: 'text!./view/filters.html'}
    });
    ko.components.register('displayCombination', {
      template: {require: 'text!./view/displayCombination.html'}
    });
    ko.components.register('displayIdol', {
      template: {require: 'text!./view/displayIdol.html'}
    });
  
    require(['domReady!'], function() {
      window.viewModel = viewModel;
      viewModel.activateKO();
    });
  });
});

