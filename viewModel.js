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
};

ko.bindingHandlers.chosen = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    var allBindings = allBindingsAccessor();

    var options = {default: 'Select one...'};
    $.extend(options, allBindings.chosen);

      $(element).attr('data-placeholder', options.default).addClass('chzn-select');
  },
  update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    $('.chzn-select').chosen();
  }
};

ko.applyBindings(new ViewModel());

