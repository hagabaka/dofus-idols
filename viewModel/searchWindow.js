define([], function() {
  return function SearchWindow(model, viewModel, ko) {
    var searchWindow = this;
    this.searching = viewModel.searching;
    this.progressValue = ko.observable();
    this.progressMax = ko.observable();
    this.progressPercentage = ko.pureComputed(function() {
      return (searchWindow.progressValue() * 100 / searchWindow.progressMax()).toFixed(2) + '%'
    });
    this.bestCombination = ko.observable([]);
    this.bestScore = ko.observable();
    this.milisecondsElapsed = ko.observable(0);
    this.estimatedMilisecondsRemaining = ko.observable(0);

    function padToTwoDigits(number) {
      var string = number.toFixed();
      if(string.length < 2) {
        return '0' + string;
      } else {
        return string;
      }
    }
    function formatTime(miliseconds) {
      var seconds = miliseconds / 1000;
      var ss = seconds % 60;
      var minutes = (seconds - ss) / 60;
      var mm = minutes % 60;
      var hours = (minutes - mm) / 60;

      return padToTwoDigits(hours) + ':' + padToTwoDigits(mm) + ':' + padToTwoDigits(ss);
    }
    this.estimatedTimeRemaining = ko.pureComputed(function() {
      return formatTime(searchWindow.estimatedMilisecondsRemaining());
    });
    this.timeElapsed = ko.pureComputed(function() {
      return formatTime(searchWindow.milisecondsElapsed());
    });
    ['progressValue', 'progressMax', 'bestCombination', 'bestScore',
      'milisecondsElapsed', 'estimatedMilisecondsRemaining'].forEach(function(name) {
      searchWindow[name].extend({rateLimit: 500});
    });
    var worker;
    function setupWorker() {
      worker = new Worker('worker.js');
      worker.onmessage = function(e) {
        ['progressValue', 'progressMax', 'bestScore',
         'milisecondsElapsed', 'estimatedMilisecondsRemaining'].forEach(function(variable) {
          if(variable in e.data) {
            searchWindow[variable](e.data[variable]);
          }
        });
        if('bestCombination' in e.data) {
          searchWindow.bestCombination(e.data.bestCombination.map(function(name) {
            return model.idols.idolNamed[name];
          }));
        }
        if('searching' in e.data) {
          searchWindow.searching(e.data.searching);
        }
      };
    }
    this.stopSearching = function() {
      if(worker) {
        worker.terminate();
      }
      this.searching(false);
    };
    this.startSearching = function() {
      viewModel.showSearchWindow(true);
      if(!this.searching()) {
        setupWorker();
        worker.postMessage({method: 'findBestCombination',
          idolNames: viewModel.visibleIdols().map(function(idol) {
            return idol.name;
          }),
        });
      }
      this.searching(true);
    };
  };
});

