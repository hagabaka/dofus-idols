define(['knockout', 'idols', 'algorithms', 'domReady!'], function(ko, idols, algorithms) {
  function ViewModel() {
    var self = this;
    this.visibleIdols = ko.observableArray(idols.allIdols);
    this.combinationEntry = ko.observable('');
    this.combinationIdols = ko.computed(function() {
      var entry = self.combinationEntry();
      if(entry === '') {
        return [];
      } else {
        return entry.split(/\s*,\s*/).map(function(name) {
          return idols.idolNamed[name];
        });
      }
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
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

