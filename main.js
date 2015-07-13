requirejs.config({
  baseUrl: '',
  paths: {
    jquery: 'https://code.jquery.com/jquery-1.11.3.min',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min',
    selectize: 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.1/js/standalone/selectize.min'
  }
});

requirejs(['knockout', 'viewModel', 'jquery', 'selectize', 'idols', 'domReady!'],
  function(ko, ViewModel, $, Selectize, idols) {
  ko.applyBindings(new ViewModel());
  Selectize.define('only_close_when_full', function() {
    var self = this;

    this.on('initialize', function() {
      self.open();
    });

    this.close = (function() {
      var originalClose = self.close;
      return function() {
        if(self.isFull()) {
          return originalClose.apply(this, arguments);
        } else {
          return self;
        }
      };
    })();
  });

  var $combinationEntry = $('#combination-entry');
  $combinationEntry.selectize({
    maxItems: 6,
    delimiter: ', ',
    splitOn: /\s*,\s*/,
    options: idols,
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    sortField: [{field: 'score', direction: 'desc'},
                {field: 'name'},
                {field: 'group'},
                {field: 'ineligible'},
                {field: 'level'}],
    plugins: ['only_close_when_full', 'remove_button'],
    selectOnTab: true,
  });
});

