define(['model/idolGrades', 'lazy'],
function(idolGrades, Lazy) {
  return function(model, viewModel, ko) {
    var filters = this;

    // Numbers
    this.minimumScore = ko.observable(0);
    this.maximumLevel = ko.observable(200);
    this.minimumGrade = ko.observable(idolGrades.Minor);

    // Eligibility
    this.neededDungeons = ko.observable([]);
    this.smallGroup = ko.observable(false);

    // Idols
    this.additionalIdols = ko.observableArray([]);
    this.excludedIdols = ko.observableArray([]);

    this.visibleIdols = ko.computed(function() {
      return Lazy(model.idols).filter(function(idol) {
        return idol.score >= filters.minimumScore() &&
          idol.level <= filters.maximumLevel() &&
          idol.grade >= filters.minimumGrade() &&
          Lazy(filters.neededDungeons()).intersection(idol.ineligible).isEmpty() &&
          !(idol.group && filters.smallGroup());
      }).union(filters.additionalIdols()).difference(filters.excludedIdols()).toArray();
    });
  };
});

