define(['knockout'], function(ko) {
  function Translator(translations, language) {
    var self = this;
    self.language = ko.observable(language);
    self.translations = ko.observable(translations);
    self.translation = ko.pureComputed(function() {
      return self.translations()[self.language()] || {};
    });
    self.untranslated = {};
    var untranslatedForLanguage = ko.computed(function() {
      var language = self.language();
      if(!(language in self.untranslated)) {
        self.untranslated[language] = {};
      }
      return self.untranslated[language];
    });
    self.untranslatedForLanguage = untranslatedForLanguage;
    self.translate = function(string) {
      return ko.pureComputed(function() {
        var translation = self.translation();
        if(translation[string]) {
          delete untranslatedForLanguage()[string];
          return translation[string];
        } else {
          untranslatedForLanguage()[string] = '';
          return string;
        }
      });
    };
  }

  Translator.prototype.setupBindings = function() {
    var translate = this.translate.bind(this);

    var textBinding = ko.bindingHandlers.text;
    var htmlBinding = ko.bindingHandlers.html;
    var attrBinding = ko.bindingHandlers.attr;

    ko.bindingHandlers.tr = {
      init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var names = valueAccessor();
        if(typeof names === 'string') {
          names = names.split(/\s+/).map(function(word) {
            return word.trim();
          });
        } else if(!names) {
          names = ['text'];
        }
        var attrs = {};
        var untranslated = {attrs: attrs};
        names.forEach(function(name) {
          attrs[name] = null;
        });
        if('text' in attrs) {
          untranslated.text = element.textContent.trim();
          textBinding.init();
          delete attrs.text;
        }
        if('html' in attrs) {
          untranslated.html = element.innerHTML.trim();
          htmlBinding.init();
          delete attrs.html;
        }
        names.forEach(function(name) {
          attrs[name] = element.getAttribute(name);
        });
        element.ko_tr_untranslated = untranslated;
      },
      update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var untranslated = element.ko_tr_untranslated;
        if('text' in untranslated) {
          textBinding.update(element, translate(untranslated.text));
        }
        if('html' in untranslated) {
          htmlBinding.update(element, translate(untranslated.html));
        }
        var names = Object.keys(untranslated.attrs);
        if(names.length > 0) {
          attrBinding.update(element, function() {
            var translatedAttrs = {};
            names.forEach(function(name) {
              translatedAttrs[name] = translate(untranslated.attrs[name]);
            });
            return translatedAttrs;
          });
        }
      }
    };

    ko.bindingHandlers.textTr = {
      init: textBinding.init,
      update: function(element, valueAccessor) {
        textBinding.update(element, translate(valueAccessor()));
      }
    };

    ko.bindingHandlers.htmlTr = {
      init: htmlBinding.init,
      update: function(element, valueAccessor) {
        htmlBinding.update(element, translate(valueAccessor()));
      }
    };

    ko.bindingHandlers.attrTr = {
      init: attrBinding.init,
      update: function(element, valueAccessor) {
        var values = valueAccessor();
        attrBinding.update(element, ko.pureComputed(function() {
          var valuesTr = {};
          Object.keys(values).forEach(function(name) {
            valuesTr[name] = translate(ko.unwrap(values[name]));
          });
          return valuesTr;
        }));
      }
    };
  };

  return Translator;
});
