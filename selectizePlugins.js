define(['selectize'], function(Selectize) {
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
});
