define(['knockout', 'jquery', 'model', 'thenBy', 
  'viewModel/selectedCombination', 'viewModel/combinationEntry', 'viewModel/idolComponent',
  'viewModel/searchWindow', 'viewModel/filters', 'viewModel/pages', 'viewModel/animation'],
  function(ko, $, model, firstBy, SelectedCombination, CombinationEntry, extendIdolViewModel,
    SearchWindow, Filters, pages, Animation) {
  function ViewModel() {
    var viewModel = this;

    this.selectedCombination = new SelectedCombination(model, viewModel, ko);
    this.combinationEntry = new CombinationEntry(model, this.selectedCombination.idols,
      viewModel, ko);

    this.examinedIdol = ko.observable();
    this.examinedIdol.extend({rateLimit: 1000, method: 'notifyWhenChangesStop'});
    this.selectedIdol = ko.observable();

    model.idols.forEach(function(idol) {
      extendIdolViewModel(idol, model, viewModel.selectedCombination.idols, viewModel, ko);
    });

    this.filters = new Filters(model, viewModel, ko);
    this.visibleIdols = ko.pureComputed(function() {
      return viewModel.filters.visibleIdols().filter(function(idol) {
        return idol.name.toLowerCase().indexOf(
               viewModel.combinationEntry.searchTerm().toLowerCase()) >= 0;
      }).filter(function(idol) {
        return !idol.inUse();
      }).sort(firstBy(function(idol) {
        return idol.name.toLowerCase().indexOf(viewModel.combinationEntry.searchTerm().toLowerCase());
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

    this.pages = pages;
    this.currentPage = ko.observable(pages[0].name);

    this.animation = new Animation(model, ko, $);
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

