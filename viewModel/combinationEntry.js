define([], function() {
  return function CombinationEntry(model, selectedIdols, viewModel, ko) {
    var combinationEntry = this;
    this.searchTerm = ko.observable('');
    this.chosenCompletion = ko.observable();
    this.selectChosenCompletion = function() {
      if(this.chosenCompletion() &&
         this.chosenCompletion().putInCombination()) {
        this.updateCompletions();
      }
    };
    this.handleKey = function(data, event) {
      if(event.which === 13) { // Enter
        combinationEntry.selectChosenCompletion();
      } else if(event.which === 9) { // Tab
        var chosenIdol = combinationEntry.chosenCompletion();
        var visibleIdols = viewModel.visibleIdols();
        if(chosenIdol) {
          var newChosenIndex =
            (visibleIdols.indexOf(chosenIdol) + 1) % visibleIdols.length;
          console.log(newChosenIndex);
          combinationEntry.chosenCompletion(visibleIdols[newChosenIndex]);
        }
      } else if(event.which === 8) { // Backspace
        if(combinationEntry.searchTerm().length > 0) {
          combinationEntry.updateCompletions();
          return true;
        } else {
          if(viewModel.selectedCombination.idols().length > 0) {
            viewModel.selectedCombination.idols.pop();
          }
        }
      } else {
        combinationEntry.updateCompletions();
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
      combinationEntry.searchTerm('');
      $('#combination-entry input').focus();
    };
    this.combinationEntry = ko.observable('');
    this.combinationEntryWidth = ko.pureComputed(function() {
      var combinationLength = viewModel.selectedCombination.idols().length;
      if(combinationLength > 0) {
        return (96 - combinationLength * 16).toString() + '%';
      } else {
        return '100%';
      }
    });
    this.searchTerm = ko.observable('');
  };
});
