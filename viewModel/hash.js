define(['viewModel', 'model/idols', 'knockout'], function(viewModel, idols, ko) {
  function despace(name) {
    return name.replace(' ', '');
  }
  function respace(string) {
    return string.replace(/([a-z])([A-Z])/, '$1 $2');
  }

  var hash = ko.pureComputed(function() {
    var viewState = {page: viewModel.currentPage()};
    switch(viewModel.currentPage()) {
      case 'displayCombination':
        viewState.idolNames = viewModel.selectedCombination.idols().map(function(idol) {
          return despace(idol.name);
        }).join('+');
        break;
      case 'displayIdol':
        if(viewModel.selectedIdol()) {
          viewState.idolName = despace(viewModel.selectedIdol().name);
        }
        break;
    }
    return Object.keys(viewState).filter(function(key) {
      return viewState[key].length > 0;
    }).map(function(key) {
      return key + '=' + viewState[key];
    }).join('&');
  });
  hash.subscribe(function(value) {
    location.hash = value;
  });

  function updateViewModelFromHash() {
    if(location.hash) {
      var viewState = {};
      location.hash.replace(/^#/, '').split('&').forEach(function(assignment) {
        var pair = assignment.split('=');
        if(pair.length != 2) {
          console.log('Invalid hash segment: ' + assignment);
        } else {
          viewState[pair[0]] = pair[1];
        }
      });
      console.log(viewState);
      if('page' in viewState) {
        viewModel.currentPage(viewState.page);
      }
      if(viewState.page === 'displayCombination' && 'idolNames' in viewState) {
        var namedIdols = viewState.idolNames.split('+').map(function(name) {
          return idols.idolNamed[respace(name)];
        });
        // Filter out undefined idols and truncate to 6
        namedIdols = namedIdols.filter(function(idol) {
          return idol;
        }).slice(0, 6);
        viewModel.selectedCombination.idols(namedIdols);
      }
      if(viewState.page === 'displayIdol' && 'idolName' in viewState) {
        viewModel.selectedIdol(idols.idolNamed[respace(viewState.idolName)]);
      }
    }
  }

  return updateViewModelFromHash;
});

