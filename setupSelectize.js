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
        plugins: ['only_close_when_full', 'remove_button'],
      });
      $combinationEntry.on('dropdown_close', function() {
        $combinationEntry.trigger('dropdown_open');
      });
