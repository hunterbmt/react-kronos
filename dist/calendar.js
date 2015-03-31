// Generated by CoffeeScript 1.9.1
var CalendarStyle, Cell, Levels, Navigation, React, Units, cn, moment, ref, useSheet;

React = require('react');

moment = require('moment-range');

cn = require('classnames');

ref = require('./constants'), Levels = ref.Levels, Units = ref.Units;

Cell = require('./cell');

Navigation = require('./nav');

useSheet = require('react-jss');

CalendarStyle = require('./styles').CalendarStyle;

module.exports = React.createClass({
  displayName: 'Calendar',
  render: function() {
    var dates;
    dates = this.props.level !== 'hours';
    return React.createElement("div", {
      "className": this.sheet.classes.calendar,
      "onMouseDown": ((function(_this) {
        return function(e) {
          _this.props.above(true);
          return e;
        };
      })(this)),
      "onMouseUp": ((function(_this) {
        return function(e) {
          _this.props.above(false);
          return e;
        };
      })(this))
    }, dates && React.createElement(Navigation, {
      "onPrev": this.onNavigateLeft,
      "onNext": this.onNavigateRight,
      "onTitle": this.onNavigateUp,
      "title": this.getTitle[this.props.level](this.props.datetime)
    }), React.createElement("div", {
      "ref": 'grid',
      "className": cn(this.sheet.classes.grid, this.props.level)
    }, this.getCells[this.props.level](this.props.datetime).map((function(_this) {
      return function(cell, i) {
        var type;
        type = (function() {
          switch (false) {
            case !cell.header:
              return 'header';
            case !cell.past:
              return 'past';
            case !cell.future:
              return 'future';
            default:
              return 'base';
          }
        })();
        return React.createElement(Cell, {
          "key": i,
          "ref": (cell.selected ? 'selected' : null),
          "label": cell.label,
          "level": _this.props.level,
          "type": type,
          "selected": cell.selected,
          "today": cell.today,
          "moment": cell.moment,
          "onClick": _this.onNavigateCell,
          "classes": _this.props.classes
        });
      };
    })(this)), dates && React.createElement("div", {
      "className": this.sheet.classes.today,
      "onClick": this.onToday
    }, "Today")));
  },
  onNavigateCell: function(datetime) {
    var lvl;
    lvl = Levels[this.props.level];
    if (lvl.down) {
      this.props.setLevel(lvl.down);
    }
    return this.props.onSelect(datetime, !lvl.down);
  },
  onNavigateUp: function() {
    var lvl;
    lvl = Levels[this.props.level];
    return this.props.setLevel(lvl.up);
  },
  onNavigateLeft: function() {
    var lvl;
    lvl = Levels[this.props.level].nav;
    return this.props.onSelect(this.props.datetime.subtract(lvl.span, lvl.unit));
  },
  onNavigateRight: function() {
    var lvl;
    lvl = Levels[this.props.level].nav;
    return this.props.onSelect(this.props.datetime.add(lvl.span, lvl.unit));
  },
  onToday: function() {
    return this.props.onSelect(moment());
  },
  getTitle: {
    years: function(datetime) {
      var end, start, years;
      datetime || (datetime = moment());
      start = datetime.clone().subtract(4, 'years');
      end = datetime.clone().add(7, 'years');
      years = [];
      moment().range(start, end).by(Units.YEAR, function(year) {
        return years.push({
          label: year.format('YYYY'),
          selected: year.isSame(datetime, 'year')
        });
      });
      return [years[0].label, years[years.length - 1].label].join('-');
    },
    months: function(datetime) {
      datetime || (datetime = moment());
      return datetime.format('YYYY');
    },
    days: function(datetime) {
      datetime || (datetime = moment());
      return datetime.format('MMMM');
    },
    hours: function(datetime) {
      return null;
    }
  },
  getCells: {
    years: function(datetime) {
      var end, start, years;
      datetime || (datetime = moment());
      start = datetime.clone().subtract(4, 'years');
      end = datetime.clone().add(7, 'years');
      years = [];
      moment().range(start, end).by(Units.YEAR, function(year) {
        return years.push({
          moment: year,
          label: year.format('YYYY'),
          selected: year.isSame(datetime, 'year')
        });
      });
      return years;
    },
    months: function(datetime) {
      var end, months, start;
      datetime || (datetime = moment());
      start = datetime.clone().startOf('year');
      end = datetime.clone().endOf('year');
      months = [];
      moment().range(start, end).by(Units.MONTH, function(month) {
        return months.push({
          moment: month,
          label: month.format('MMM'),
          selected: month.isSame(datetime, 'month')
        });
      });
      return months;
    },
    days: function(datetime) {
      var days, end, start;
      datetime || (datetime = moment());
      start = datetime.clone().startOf('month').weekday(0);
      end = datetime.clone().endOf('month').weekday(6);
      days = [];
      moment.weekdaysMin().forEach(function(day) {
        return days.push({
          label: day,
          header: true
        });
      });
      moment().range(start, end).by(Units.DAY, function(day) {
        return days.push({
          moment: day,
          label: day.format('D'),
          past: day.isBefore(datetime, 'month'),
          future: day.isAfter(datetime, 'month'),
          selected: day.isSame(datetime, 'day'),
          today: day.isSame(moment(), 'day')
        });
      });
      return days;
    },
    hours: function(datetime) {
      var end, hours, start;
      datetime || (datetime = moment());
      start = datetime.clone().startOf('day');
      end = datetime.clone().endOf('day');
      hours = [];
      moment().range(start, end).by(Units.HOUR, function(hour) {
        var halfHour;
        hours.push({
          moment: hour,
          label: hour.format('h:mm a'),
          selected: hour.isSame(datetime, 'minute'),
          fromNow: ''
        });
        halfHour = hour.clone().add(30, 'minutes');
        return hours.push({
          moment: halfHour,
          label: halfHour.format('h:mm a'),
          selected: halfHour.isSame(datetime, 'minute'),
          fromNow: ''
        });
      });
      return hours;
    }
  },
  mixins: [useSheet(CalendarStyle)],
  propTypes: {
    datetime: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    level: React.PropTypes.string.isRequired,
    setLevel: React.PropTypes.func.isRequired,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func
  }
});
