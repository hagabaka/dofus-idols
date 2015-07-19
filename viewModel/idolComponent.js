define([], function() {
  return function(idol, model, viewModel, ko) {
    idol.inUse = ko.computed(function() {
      return viewModel.combinationIdols().indexOf(idol) >= 0;
    });
    idol.scoreDelta = ko.computed(function() {
      var currentCombination = viewModel.combinationIdols();
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
      if(!viewModel.combinationIsFull() && !idol.inUse()) {
        viewModel.combinationIdols.push(idol);
        viewModel.readyForEntry();
        return true;
      } else {
        return false;
      }
    };
    idol.removeFromCombination = function() {
      var index = viewModel.combinationIdols().indexOf(idol);
      if(index >= 0) {
        viewModel.combinationIdols.splice(index, 1);
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
      return idol === viewModel.highlightedIdol();
    });
  };
});

