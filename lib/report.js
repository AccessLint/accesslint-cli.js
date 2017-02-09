"use strict";

var util = require("util");

function Report(rawResults) {
  this.rawResults = rawResults;
}

Report.prototype.process = function () {
  var results = [];
  var url = this.rawResults.url;

  for(var i = 0; i < this.rawResults.violations.length; i++) {
    results.push(this._transformResult(this.rawResults.violations[i], url));
  }

  return results;
};

Report.prototype._transformResult = function(violation, url) {
  var targets = violation.nodes.map(function(n) {
    return n.target;
  });

  return [url, violation.impact, violation.help].join(" | ") +
    " | [\"" + targets.join("\", \"") + "\"]";
};

Report.prototype.log = function(results) {
  for(var i = 0; i < results.length; i++) {
    console.log(util.inspect(results[i], false, null));
  }
};

module.exports = Report;
