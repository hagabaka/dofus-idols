define(['knockout', 'jquery', 'model', 'thenBy', 
  'viewModel/idolComponent', 'viewModel/searchWindow'],
  function(ko, $, model, firstBy, extendIdolViewModel, SearchWindow) {
  function ViewModel() {
    var viewModel = this;

    this.combinationEntry = ko.observable('');
    this.combinationIdols = ko.observableArray([]);
    this.combinationEntryWidth = ko.computed(function() {
      return (96 - viewModel.combinationIdols().length * 16).toString() + '%';
    });
    this.combinationIsFull = ko.computed(function () {
      return viewModel.combinationIdols().length >= 6;
    });
    this.synergies = ko.observableArray([]);
    this.score = ko.computed(function() {
      viewModel.synergies([]);
      return model.algorithms.totalScore(viewModel.combinationIdols(), function(synergy) {
        viewModel.synergies.push(synergy);
      });
    });
    this.examinedIdol = ko.observable();
    this.examinedIdol.extend({rateLimit: 1000, method: 'notifyWhenChangesStop'});
    this.highlightedIdol = ko.observable();

    model.idols.forEach(function(idol) {
      extendIdolViewModel(idol, model, viewModel, ko);
    });
    this.searchTerm = ko.observable('');

    this.visibleIdols = ko.computed(function() {
      return model.idols.filter(function(idol) {
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
      if(viewModel.highlightedIdol() && viewModel.highlightedIdol().putInCombination()) {
        viewModel.searchTerm('');
        viewModel.updateHighlight();
      }
    };
    this.readyForEntry = function() {
      $('#combination-entry').focus();
    };
    this.searching = ko.observable(false);
    this.showSearchWindow = ko.observable(false);
    this.searchWindow = new SearchWindow(model, viewModel, ko);
    this.findBestCombination = function() {
      this.searchWindow.startSearching();
    };
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

