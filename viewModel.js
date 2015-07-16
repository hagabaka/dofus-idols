define(['knockout', 'jquery', 'idols', 'synergies', 'algorithms', 'thenBy', 'domReady!'],
  function(ko, $, idols, synergies, algorithms, firstBy) {
  function ViewModel() {
    var viewModel = this;

    this.combinationEntry = ko.observable('');
    this.combinationIdols = ko.observableArray([]);
    this.combinationIsFull = ko.computed(function () {
      return viewModel.combinationIdols().length >= 6;
    });
    this.synergies = ko.observableArray([]);
    this.score = ko.computed(function() {
      viewModel.synergies([]);
      return algorithms.totalScore(viewModel.combinationIdols(), function(synergy) {
        viewModel.synergies.push(synergy);
      });
    });
    this.examinedIdol = ko.observable();
    this.examinedIdol.extend({rateLimit: 1000, method: 'notifyWhenChangesStop'});
    this.highlightedIdol = ko.observable();

    idols.forEach(function(idol) {
      idol.scoreDelta = ko.computed(function() {
        var currentCombination = viewModel.combinationIdols();
        var currentScore = algorithms.totalScore(currentCombination);
        return algorithms.totalScore(currentCombination.concat([idol])) - currentScore;
      });
      idol.synergyWithExaminedIdol = ko.computed(function() {
        var examinedIdol = viewModel.examinedIdol();
        return examinedIdol && synergies.between(idol, examinedIdol);
      });
      idol.positiveSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol() && !idol.synergyWithExaminedIdol().negative || false;
      });
      idol.negativeSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol() && idol.synergyWithExaminedIdol().negative || false;
      });
      idol.inUse = ko.computed(function() {
        return viewModel.combinationIdols().indexOf(idol) >= 0;
      });
      idol.putInCombination = function() {
        if(!viewModel.combinationIsFull() && !idol.inUse()) {
          viewModel.combinationIdols.push(idol);
          readyForEntry();
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
        readyForEntry();
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
    });
    this.searchTerm = ko.observable('');

    this.visibleIdols = ko.computed(function() {
      return idols.filter(function(idol) {
        return idol.name.toLowerCase().indexOf(viewModel.searchTerm().toLowerCase()) >= 0;
      }).sort(firstBy(function(idol1, idol2) {
        return idol1.inUse() - idol2.inUse();
      }).thenBy(function(idol1, idol2) {
        return idol1.scoreDelta() - idol2.scoreDelta();
      }, -1).thenBy('score', -1));
    });
    this.handleKey = function(data, event) {
      if(event.which === 13) { // Enter
        viewModel.selectHighlighted();
      } else if(event.which === 9) { // Tab
        var highlightedIdol = viewModel.highlightedIdol();
        var visibleIdols = viewModel.visibleIdols();
        if(highlightedIdol) {
          var newHighlightedIndex =
            (visibleIdols.indexOf(highlightedIdol) + 1) % visibleIdols.length;
          viewModel.highlightedIdol(visibleIdols[newHighlightedIndex]);
        }
      } else if(event.which === 8) { // Backspace
        if(viewModel.searchTerm().length > 0) {
          return true;
        } else {
          if(viewModel.combinationIdols().length > 0) {
            viewModel.combinationIdols.pop();
          }
        }
      } else {
        viewModel.updateHighlight();
        return true;
      }
    };
    this.updateHighlight = function() {
      if(viewModel.searchTerm().length && viewModel.visibleIdols().length) {
        viewModel.highlightedIdol(viewModel.visibleIdols()[0]);
      } else {
        viewModel.highlightedIdol(null);
      }
    };
    this.selectHighlighted = function() {
      if(viewModel.highlightedIdol().putInCombination()) {
        viewModel.searchTerm('');
        viewModel.updateHighlight();
      }
    };
    this.guessed = ko.computed(function() {
      return viewModel.synergies().some(function(synergy) {
        return synergy.guessed;
      });
    });
    function readyForEntry() {
      $('#combination-entry').focus();
    }
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

