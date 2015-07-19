define([], function() {
  return function CombinationEntry(model, selectedIdols, viewModel, ko) {
    var combinationEntry = this;
    this.searchTerm = ko.observable('');
    this.chosenCompletion = ko.observable();
    this.selectChosenCompletion = function() {
      if(this.chosenCompletion() &&
         this.chosenCompletion().putInCombination()) {
        this.searchTerm('');
        this.updateCompletions();
      }
    };
    this.handleKey = function(data, event) {
      if(event.which === 13) { // Enter
        combinationEntry.selectCompletionChoice();
      } else if(event.which === 9) { // Tab
        var chosenIdol = combinationEntry.chosenCompletion();
        var visibleIdols = viewModel.visibleIdols();
        if(chosenIdol) {
          var newChosenIndex =
            (viewModel.visibleIdols.indexOf(chosenIdol) + 1) % viewModel.visibleIdols.length;
          combinationEntry.chosenCompletion(viewModel.visibleIdols[newHighlightedIndex]);
        }
      } else if(event.which === 8) { // Backspace
        if(combinationEntry.searchTerm().length > 0) {
          viewModel.updateCompletions();
          return true;
        } else {
          if(viewModel.selectedCombination.idols().length > 0) {
            viewModel.selectedCombination.idols.pop();
          }
        }
      } else {
        viewModel.updateCompletions();
        return true;
      }
    };
    this.updateCompletions = function() {
      if(combinationEntry.searchTerm().length && viewModel.visibleIdols().length) {
        combinationEntry.chosenCompletion(viewModel.visibleIdols()[0]);
      } else {
        combinationEntry.chosenCompletion(null);
      }
    };
    this.readyForEntry = function() {
      $('#combination-entry').focus();
    };
    this.combinationEntry = ko.observable('');
    this.combinationEntryWidth = ko.computed(function() {
      return (96 - viewModel.selectedCombination.idols().length * 16).toString() + '%';
    });
    this.searchTerm = ko.observable('');
  };
});