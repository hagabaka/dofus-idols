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
    this.incompatiblities = ko.pureComputed(function() {
      var result = {};
      selectedCombination.idols().forEach(function(idol) {
        idol.ineligible.forEach(function(dungeon) {
          if(dungeon in result) {
            result[dungeon].push(idol);
          } else {
            result[dungeon] = [idol];
          }
        });
      });
      var resultArray = [];
      for(var dungeon in result) {
        resultArray.push({
          dungeon: dungeon,
          idols: result[dungeon]
        });
      }
      return resultArray;
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

