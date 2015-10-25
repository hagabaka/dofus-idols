define([
  'json!model/translations.json',
  'json!model/translation-de.json',
  'json!model/translation-es.json',
  'json!model/translation-fr.json',
  'json!model/translation-it.json',
  'json!model/translation-pt.json',
], function(translations, de, es, fr, it, pt) {
  var string;
  for(string in de) {
    translations.de[string] = de[string];
  }
  for(string in es) {
    translations.es[string] = es[string];
  }
  for(string in fr) {
    translations.fr[string] = fr[string];
  }
  for(string in it) {
    translations.it[string] = it[string];
  }
  for(string in pt) {
    translations.pt[string] = pt[string];
  }
  translations.en = {};
  return translations;
});
