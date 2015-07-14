define(['knockout', 'jquery', 'idols', 'synergies', 'algorithms', 'sifter', 'domReady!'],
  function(ko, $, idols, synergies, algorithms, Sifter) {
  function ViewModel() {
    var self = this;
    this.sifter = ko.observable(new Sifter(idols));
    this.searchTerm = ko.observable('');
    this.visibleIdols = ko.computed(function() {
      return self.sifter().search(self.searchTerm(), {fields: ['name'], sort: [
        {field: 'score', direction: 'desc'},
        {field: 'name'},
        {field: 'group'},
        {field: 'ineligible'}
      ]}).items.map(function(item) { return idols[item.id]; });
    });
    this.highlightedIdol = ko.observable();
    this.updateHighlight = function() {
      if(self.searchTerm().length && self.visibleIdols().length) {
        self.highlightedIdol(self.visibleIdols()[0]);
      } else {
        self.highlightedIdol(null);
      }
    };
    this.selectHighlighted = function() {
      if(self.visibleIdols()[0].putInCombination()) {
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
      idol.inUse = ko.observable(false);
      idol.putInCombination = function() {
        if(!self.combinationIsFull() && !idol.inUse()) {
          self.combinationIdols.push(idol);
          idol.inUse(true);
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
          idol.inUse(false);
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

