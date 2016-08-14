"use strict";

function Report(rawResults, url) {
  this.rawResults = rawResults;
  this.url = url;
}

Report.prototype.process = function () {
  var results = [];
  var url = this.url;

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

module.exports = Report;
