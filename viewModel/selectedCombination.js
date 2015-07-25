define([], function() {
  return function SelectedCombination(model, viewModel, ko) {
    var selectedCombination = this;
    this.idols = ko.observableArray([]);
    this.synergies = ko.observableArray([]);
    this.score = ko.pureComputed(function() {
      selectedCombination.synergies([]);
      return model.algorithms.totalScore(selectedCombination.idols(), function(synergy) {
        selectedCombination.synergies.push(synergy);
      });
    });
    this.isFull = ko.pureComputed(function () {
      return selectedCombination.idols().length >= 6;
    });
    this.text = ko.pureComputed(function() {
      return selectedCombination.idols().map(function(idol) {
        return idol.name;
      }).join(', ');
    });
  };
});

