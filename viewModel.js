define(['knockout', 'jquery', 'idols', 'synergies', 'algorithms', 'sifter', 'domReady!'],
  function(ko, $, idols, synergies, algorithms, Sifter) {
  function ViewModel() {
    var self = this;
    this.visibleIdols = ko.observableArray(idols);
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
    function readyForEntry() {
      $('#combination-entry').focus();
    }
    idols.forEach(function(idol) {
      idol.synergyWithExaminedIdol = ko.computed(function() {
        var examinedIdol = self.examinedIdol();
        return examinedIdol && synergies.between(idol, self.examinedIdol());
      });
      idol.positiveSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol && idol.synergyWithExaminedIdol.positive || false;
      });
      idol.negativeSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol && idol.synergyWithExaminedIdol.negative || false;
      });
      idol.inUse = ko.observable(false);
      idol.putInCombination = function() {
        if(!self.combinationIsFull() && !idol.inUse()) {
          self.combinationIdols.push(idol);
          idol.inUse(true);
        }
        readyForEntry();
      };
      idol.removeFromCombination = function() {
        var index = self.combinationIdols().indexOf(idol);
        if(index >= 0) {
          self.combinationIdols.splice(index, 1);
          idol.inUse(false);
        }
        readyForEntry();
      };
    });
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

