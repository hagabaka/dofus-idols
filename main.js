var hostname = 'dofusidols.info';
if(location.hostname !== hostname) {
    location.url = location.protocol + '//' + hostname + '/' + location.hash;
}

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
  
    require(['viewModel/hash', 'domReady!',], function(updateViewModelFromHash) {
      window.viewModel = viewModel;
      updateViewModelFromHash();
      viewModel.activateKO();
    });
  });
});

