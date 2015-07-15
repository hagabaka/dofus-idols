define(['knockout', 'jquery', 'idols', 'synergies', 'algorithms', 'domReady!'],
  function(ko, $, idols, synergies, algorithms, _) {
  function ViewModel() {
    var self = this;
    this.searchTerm = ko.observable('');

    this.visibleIdols = ko.computed(function() {
      return idols.filter(function(idol) {
        return idol.name.toLowerCase().indexOf(self.searchTerm().toLowerCase()) >= 0;
      }).sort(function(idol1, idol2) {
        return idol2.score - idol1.score;
      });
    });
    this.highlightedIdol = ko.observable();
    this.handleKey = function(data, event) {
      if(event.which === 13) { // Enter
        self.selectHighlighted();
      } else if(event.which === 9) { // Tab
        var highlightedIdol = self.highlightedIdol();
        var visibleIdols = self.visibleIdols();
        if(highlightedIdol) {
          var newHighlightedIndex =
            (visibleIdols.indexOf(highlightedIdol) + 1) % visibleIdols.length;
          self.highlightedIdol(visibleIdols[newHighlightedIndex]);
        }
      } else if(event.which === 8) { // Backspace
        if(self.searchTerm().length > 0) {
          return true;
        } else {
          if(self.combinationIdols().length > 0) {
            self.combinationIdols.pop();
          }
        }
      } else {
        self.updateHighlight();
        return true;
      }
    };
    this.updateHighlight = function() {
      if(self.searchTerm().length && self.visibleIdols().length) {
        self.highlightedIdol(self.visibleIdols()[0]);
      } else {
        self.highlightedIdol(null);
      }
    };
    this.selectHighlighted = function() {
      if(self.highlightedIdol().putInCombination()) {
        self.searchTerm('');
        self.updateHighlight();
      }
    };
    this.combinationEntry = ko.observable('');
    this.combinationIdols = ko.observableArray([]);
    this.combinationIsFull = ko.computed(function () {
      return self.combinationIdols().length >= 6;
    });
    this.synergies = ko.observableArray([]);
    this.score = ko.computed(function() {
      self.synergies([]);
      return algorithms.totalScore(self.combinationIdols(), function(synergy) {
        self.synergies.push(synergy);
      });
    });
    this.guessed = ko.computed(function() {
      return self.synergies().some(function(synergy) {
        return synergy.guessed;
      });
    });
    this.examinedIdol = ko.observable();
    this.examinedIdol.extend({rateLimit: 1000, method: 'notifyWhenChangesStop'});
    function readyForEntry() {
      $('#combination-entry').focus();
    }
    idols.forEach(function(idol) {
      idol.synergyWithExaminedIdol = ko.computed(function() {
        var examinedIdol = self.examinedIdol();
        return examinedIdol && synergies.between(idol, examinedIdol);
      });
      idol.positiveSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol() && !idol.synergyWithExaminedIdol().negative || false;
      });
      idol.negativeSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol() && idol.synergyWithExaminedIdol().negative || false;
      });
      idol.inUse = ko.computed(function() {
        return self.combinationIdols.indexOf(idol) >= 0;
      });
      idol.putInCombination = function() {
        if(!self.combinationIsFull() && !idol.inUse()) {
          self.combinationIdols.push(idol);
          readyForEntry();
          return true;
        } else {
          return false;
        }
      };
      idol.removeFromCombination = function() {
        var index = self.combinationIdols().indexOf(idol);
        if(index >= 0) {
          self.combinationIdols.splice(index, 1);
          if(self.examinedIdol() === idol) {
            self.examinedIdol(null);
          }
        }
        readyForEntry();
      };
      idol.examine = function() {
        self.examinedIdol(idol);
      };
      idol.examined = ko.computed(function() {
        if(self.examinedIdol() === idol) {
          console.log(idol);
        }
        return idol === self.examinedIdol();
      });
      idol.highlighted = ko.computed(function() {
        return idol === self.highlightedIdol();
      });
    });
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

