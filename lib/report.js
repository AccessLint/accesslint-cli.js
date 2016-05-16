"use strict";

function Report(rawResults) {
  this.rawResults = rawResults;
}

Report.prototype.process = function () {
  var results = [];
  var url = this.rawResults.url;

  for(var i = 0; i < this.rawResults.violations.length; i++) {
    results.push(this._transformResult( this.rawResults.violations[i]));
  }

  return { url: url, warnings: results };
};

Report.prototype._transformResult = function(violation) {
  var targets = violation.nodes.map(function(n) {
    return n.target;
  });

  return {
    description: violation.help,
    impact: violation.impact,
    targets: targets
  };
};

module.exports = Report;
