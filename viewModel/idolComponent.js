define([], function() {
  return function(idol, model, selectedIdols, viewModel, ko) {
    idol.inUse = ko.pureComputed(function() {
      return selectedIdols().indexOf(idol) >= 0;
    });
    idol.scoreDelta = ko.pureComputed(function() {
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
    idol.synergyWithExaminedIdol = ko.pureComputed(function() {
      var examinedIdol = viewModel.examinedIdol();
      return examinedIdol && model.synergies.between(idol, examinedIdol);
    });
    idol.positiveSynergy = ko.pureComputed(function() {
      return idol.synergyWithExaminedIdol() && !idol.synergyWithExaminedIdol().negative || false;
    });
    idol.negativeSynergy = ko.pureComputed(function() {
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
      viewModel.combinationEntry.readyForEntry();
    };
    idol.examine = function() {
      viewModel.examinedIdol(idol);
    };
    idol.examined = ko.pureComputed(function() {
      if(viewModel.examinedIdol() === idol) {
        console.log(idol);
      }
      return idol === viewModel.examinedIdol();
    });
    idol.highlighted = ko.pureComputed(function() {
      return idol === viewModel.combinationEntry.chosenCompletion();
    });
  };
});

