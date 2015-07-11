var ViewModel = function() {
  var self = this;
  this.visibleIdols = ko.observableArray(allIdols);
  this.combinationEntry = ko.observableArray(new Array(6));
  this.synergies = ko.observableArray([]);
  this.score = ko.computed(function() {
    self.synergies([]);
    var idols = self.combinationEntry().map(function(name) {
      return idolNamed[name];
    });
    return totalScore(idols, function(synergy) {
      self.synergies.push(synergy);
    });
  });
  this.guessed = ko.computed(function() {
    return self.synergies().some(function(synergy) {
      return synergy.guessed;
    });
  });
};

ko.applyBindings(new ViewModel());

