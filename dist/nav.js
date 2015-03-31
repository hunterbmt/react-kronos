// Generated by CoffeeScript 1.9.1
var NavStyle, React, useSheet;

React = require('react');

useSheet = require('react-jss');

NavStyle = require('./styles').NavStyle;

module.exports = React.createClass({
  displayName: 'Navigation',
  render: function() {
    return React.createElement("div", {
      "className": this.sheet.classes.nav
    }, React.createElement("div", {
      "className": 'arrow',
      "onClick": this.props.onPrev
    }, "\u00ab"), React.createElement("div", {
      "className": 'title',
      "onClick": this.props.onTitle
    }, this.props.title), React.createElement("div", {
      "className": 'arrow',
      "onClick": this.props.onNext
    }, "\u00bb"));
  },
  mixins: [useSheet(NavStyle)],
  propTypes: {
    onPrev: React.PropTypes.func,
    onNext: React.PropTypes.func,
    onTitle: React.PropTypes.func,
    title: React.PropTypes.string
  }
});
