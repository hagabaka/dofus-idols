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

    require(['viewModel/hash', 'model/translations', 'viewModel/translate', 'domReady!'],
    function(updateViewModelFromHash, translations, Translator) {
      window.viewModel = viewModel;
      updateViewModelFromHash();

      var preferredLanguage = viewModel.language;
      if(!preferredLanguage && 'languages' in navigator) {
        navigator.languages.some(function(language) {
          if(language in translations) {
            preferredLanguage = language;
            return true;
          }
        });
      }
      var translator = new Translator(translations, preferredLanguage);
      window.translator = translator;
      viewModel.language = translator.language;
      translator.setupBindings();

      viewModel.activateKO();
    });
  });
});

