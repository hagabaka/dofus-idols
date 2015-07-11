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
  options: allIdols,
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
