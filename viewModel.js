var ViewModel = function() {
  var self = this;
  this.visibleIdols = ko.observableArray(allIdols);
  this.combinationEntry = ko.observable('');
  this.combinationIdols = ko.computed(function() {
    var entry = self.combinationEntry();
    if(entry === '') {
      return [];
    } else {
      return entry.split(',').map(function(name) {
        return idolNamed[name];
      });
    }
  });
  this.synergies = ko.observableArray([]);
  this.score = ko.computed(function() {
    self.synergies([]);
    return totalScore(self.combinationIdols(), function(synergy) {
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

