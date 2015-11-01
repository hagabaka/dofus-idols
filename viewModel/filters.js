define(['model/idolGrades', 'lazy'],
function(idolGrades, Lazy) {
  return function(model, viewModel, ko) {
    var filters = this;

    // Numbers
    this.minimumScore = ko.observable(0);
    this.minimumScoreSet = ko.pureComputed(function() {
      return Number(filters.minimumScore()) !== 0;
    });
    this.maximumLevel = ko.observable(200);
    this.maximumLevelSet = ko.pureComputed(function() {
      return Number(filters.maximumLevel()) !== 200;
    });
    this.minimumGrade = ko.observable(idolGrades.Minor);
    this.idolGradeList = [];
    var lowestGrade;
    for(var name in idolGrades) {
      var grade = {name: name, value: idolGrades[name], isLowest: false};
      this.idolGradeList.push(grade);
      if(!lowestGrade || grade.value < lowestGrade.value) {
        lowestGrade = grade;
      }
    }
    lowestGrade.isLowest = true;
    this.minimumGradeSet = ko.pureComputed(function() {
      return Number(filters.minimumGrade()) !== lowestGrade.value;
    });

    // Eligibility
    this.dungeonList = model.idols.dungeons;
    this.neededDungeons = ko.observableArray([]);
    this.neededDungeonsSet = ko.pureComputed(function() {
      return filters.neededDungeons().length > 0;
    });
    this.selectedAll = ko.observable(false);
    this.needAllDungeons = ko.pureComputed({
      read: function() {
        if(filters.selectedAll()) {
          return filters.neededDungeons().length > 0;
        } else {
          return filters.neededDungeons().length === filters.dungeonList.length;
        }
      },
      write: function(value) {
        filters.selectedAll(value);
        filters.neededDungeons(
          value ? filters.dungeonList.slice() : []
        );
      },
      owner: filters
    });
    this.smallGroup = ko.observable(false);
    this.smallGroupSet = ko.pureComputed(function() {
      return filters.smallGroup();
    });

    // Idols
    this.additionalIdols = ko.observableArray([]);
    this.excludedIdols = ko.observableArray([]);

    this.visibleIdols = ko.pureComputed(function() {
      return Lazy(model.idols).filter(function(idol) {
        return idol.score >= filters.minimumScore() &&
          idol.level <= filters.maximumLevel() &&
          idol.grade >= filters.minimumGrade() &&
          Lazy(filters.neededDungeons()).intersection(idol.ineligible).isEmpty() &&
          !(idol.group && filters.smallGroup());
      }).union(filters.additionalIdols()).difference(filters.excludedIdols()).toArray();
    });

    this.updateValues = function (data, event) {
      event.preventDefault();
      $(event.target).find('option').each(function () {
        var element = $(this)[0];
        if (element.defaultSelected != element.selected) {
          element.selected = element.defaultSelected;
          $(this).trigger('change');
        }
      });
      $(event.target).find('input, textarea').each(function () {
        if ($(this).is('input[type="radio"], input[type="checkbox"]')) {
          if ($(this).is(':checked') !== $(this)[0].defaultChecked) {
            $(this).val($(this)[0].defaultChecked);
            $(this).trigger('click');
            $(this).trigger('change');
          }
        } else {
          if ($(this).val() !== $(this)[0].defaultValue) {
            $(this).val($(this)[0].defaultValue);
            $(this).change();
          }
        }
      });
    };
  };
});

