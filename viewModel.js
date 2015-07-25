define(['knockout', 'jquery', 'model', 'thenBy', 
  'viewModel/selectedCombination', 'viewModel/combinationEntry', 'viewModel/idolComponent',
  'viewModel/searchWindow', 'viewModel/filters'],
  function(ko, $, model, firstBy, SelectedCombination, CombinationEntry, extendIdolViewModel,
    SearchWindow, Filters) {
  function ViewModel() {
    var viewModel = this;

    this.selectedCombination = new SelectedCombination(model, viewModel, ko);
    this.combinationEntry = new CombinationEntry(model, this.selectedCombination.idols,
      viewModel, ko);

    this.examinedIdol = ko.observable();
    this.examinedIdol.extend({rateLimit: 1000, method: 'notifyWhenChangesStop'});

    model.idols.forEach(function(idol) {
      extendIdolViewModel(idol, model, viewModel.selectedCombination.idols, viewModel, ko);
    });

    this.filters = new Filters(model, viewModel, ko);
    this.visibleIdols = ko.pureComputed(function() {
      return viewModel.filters.visibleIdols().filter(function(idol) {
        return idol.name.toLowerCase().indexOf(
               viewModel.combinationEntry.searchTerm().toLowerCase()) >= 0;
      }).sort(firstBy(function(idol1, idol2) {
        return idol1.inUse() - idol2.inUse();
      }).thenBy(function(idol1, idol2) {
        return idol1.scoreDelta() - idol2.scoreDelta();
      }, -1).thenBy('score', -1));
    });
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

