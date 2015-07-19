define([], function() {
  return function(idol, model, selectedIdols, viewModel, ko) {
    idol.inUse = ko.computed(function() {
      return selectedIdols().indexOf(idol) >= 0;
    });
    idol.scoreDelta = ko.computed(function() {
      var currentCombination = selectedIdols();
      var currentScore = model.algorithms.totalScore(currentCombination);
      if(idol.inUse()) {
        var minusIdol = currentCombination.filter(function(used) {
          return used !== idol;
        });
        return model.algorithms.totalScore(minusIdol) - currentScore;
      } else {
        return model.algorithms.totalScore(currentCombination.concat([idol])) - currentScore;
      }
    });
    idol.synergyWithExaminedIdol = ko.computed(function() {
      var examinedIdol = viewModel.examinedIdol();
      return examinedIdol && model.synergies.between(idol, examinedIdol);
    });
    idol.positiveSynergy = ko.computed(function() {
      return idol.synergyWithExaminedIdol() && !idol.synergyWithExaminedIdol().negative || false;
    });
    idol.negativeSynergy = ko.computed(function() {
      return idol.synergyWithExaminedIdol() && idol.synergyWithExaminedIdol().negative || false;
    });
    idol.putInCombination = function() {
      if(!viewModel.selectedCombination.isFull() && !idol.inUse()) {
        selectedIdols.push(idol);
        viewModel.combinationEntry.readyForEntry();
        return true;
      } else {
        return false;
      }
    };
    idol.removeFromCombination = function() {
      var index = selectedIdols().indexOf(idol);
      if(index >= 0) {
        selectedIdols.splice(index, 1);
        if(viewModel.examinedIdol() === idol) {
          viewModel.examinedIdol(null);
        }
      }
      viewModel.readyForEntry();
    };
    idol.examine = function() {
      viewModel.examinedIdol(idol);
    };
    idol.examined = ko.computed(function() {
      if(viewModel.examinedIdol() === idol) {
        console.log(idol);
      }
      return idol === viewModel.examinedIdol();
    });
    idol.highlighted = ko.computed(function() {
      return idol === viewModel.combinationEntry.chosenCompletion();
    });
  };
});
