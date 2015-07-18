define(['knockout', 'jquery', 'idols', 'synergies', 'algorithms', 'thenBy', 'domReady!'],
  function(ko, $, idols, synergies, algorithms, firstBy) {
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
      return algorithms.totalScore(viewModel.combinationIdols(), function(synergy) {
        viewModel.synergies.push(synergy);
      });
    });
    this.examinedIdol = ko.observable();
    this.examinedIdol.extend({rateLimit: 1000, method: 'notifyWhenChangesStop'});
    this.highlightedIdol = ko.observable();

    idols.forEach(function(idol) {
      idol.inUse = ko.computed(function() {
        return viewModel.combinationIdols().indexOf(idol) >= 0;
      });
      idol.scoreDelta = ko.computed(function() {
        var currentCombination = viewModel.combinationIdols();
        var currentScore = algorithms.totalScore(currentCombination);
        if(idol.inUse()) {
          var minusIdol = currentCombination.filter(function(used) {
            return used !== idol;
          });
          return algorithms.totalScore(minusIdol) - currentScore;
        } else {
          return algorithms.totalScore(currentCombination.concat([idol])) - currentScore;
        }
      });
      idol.synergyWithExaminedIdol = ko.computed(function() {
        var examinedIdol = viewModel.examinedIdol();
        return examinedIdol && synergies.between(idol, examinedIdol);
      });
      idol.positiveSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol() && !idol.synergyWithExaminedIdol().negative || false;
      });
      idol.negativeSynergy = ko.computed(function() {
        return idol.synergyWithExaminedIdol() && idol.synergyWithExaminedIdol().negative || false;
      });
      idol.putInCombination = function() {
        if(!viewModel.combinationIsFull() && !idol.inUse()) {
          viewModel.combinationIdols.push(idol);
          readyForEntry();
          return true;
        } else {
          return false;
        }
      };
      idol.removeFromCombination = function() {
        var index = viewModel.combinationIdols().indexOf(idol);
        if(index >= 0) {
          viewModel.combinationIdols.splice(index, 1);
          if(viewModel.examinedIdol() === idol) {
            viewModel.examinedIdol(null);
          }
        }
        readyForEntry();
      };
      idol.examine = function() {
        viewModel.examinedIdol(idol);
      };
      idol.examined = ko.computed(function() {
        if(viewModel.examinedIdol() === idol) {
          console.log(idol);
        }
        return idol === viewModel.examinedIdol();
      });
      idol.highlighted = ko.computed(function() {
        return idol === viewModel.highlightedIdol();
      });
    });
    this.searchTerm = ko.observable('');

    this.visibleIdols = ko.computed(function() {
      return idols.filter(function(idol) {
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
    this.guessed = ko.computed(function() {
      return viewModel.synergies().some(function(synergy) {
        return synergy.guessed;
      });
    });
    function readyForEntry() {
      $('#combination-entry').focus();
    }
    this.progressValue = ko.observable();
    this.progressMax = ko.observable();
    this.progressPercentage = ko.computed(function() {
      return (viewModel.progressValue() * 100 / viewModel.progressMax()).toFixed(2) + '%'
    });
    this.bestCombination = ko.observable([]);
    this.bestScore = ko.observable();
    this.searching = ko.observable(false);
    this.milisecondsElapsed = ko.observable(0);
    this.estimatedMilisecondsRemaining = ko.observable(0);

    function padToTwoDigits(number) {
      var string = number.toFixed();
      if(number < 10) {
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
    this.estimatedTimeRemaining = ko.computed(function() {
      return formatTime(viewModel.estimatedMilisecondsRemaining());
    });
    this.timeElapsed = ko.computed(function() {
      return formatTime(viewModel.milisecondsElapsed());
    });
    ['progressValue', 'progressMax', 'bestCombination', 'bestScore',
      'milisecondsElapsed', 'estimatedMilisecondsRemaining'].forEach(function(name) {
      viewModel[name].extend({rateLimit: 500});
    });
    this.showSearchWindow = ko.observable(false);
    var worker;
    function setupWorker() {
      worker = new Worker('worker.js');
      worker.onmessage = function(e) {
        ['progressValue', 'progressMax', 'bestScore', 'searching',
         'milisecondsElapsed', 'estimatedMilisecondsRemaining'].forEach(function(variable) {
          if(variable in e.data) {
            viewModel[variable](e.data[variable]);
          }
        });
        if('bestCombination' in e.data) {
          viewModel.bestCombination(e.data.bestCombination.map(function(name) {
            return idols.idolNamed[name];
          }));
        }
      };
    }
    this.findBestCombination = function() {
      viewModel.showSearchWindow(true);
      if(!viewModel.searching()) {
        setupWorker();
        worker.postMessage({method: 'findBestCombination',
          idolNames: viewModel.visibleIdols().map(function(idol) {
            return idol.name;
          }),
        });
      }
      viewModel.searching(true);
    };
    this.stopSearching = function() {
      if(worker) {
        worker.terminate();
      }
      viewModel.searching(false);
    };
  }
  var viewModel = new ViewModel();

  viewModel.activateKO = function() {
    ko.applyBindings(viewModel);
  };
  return viewModel;
});

