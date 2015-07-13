requirejs.config({
  baseUrl: '',
  paths: {
    jquery: 'https://code.jquery.com/jquery-1.11.3.min',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min',
    selectize: 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.1/js/standalone/selectize.min'
  }
});

requirejs(['viewModel', 'jquery', 'selectize', 'idols', 'selectizePlugins', 'domReady!'],
  function(viewModel, $, Selectize, idols) {
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
  viewModel.activateKO();
});

