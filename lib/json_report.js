"use strict";

function JsonReport(rawResults) {
  this.rawResults = rawResults;
}

JsonReport.prototype.process = function () {
  var results = [];

  results.push(JSON.stringify(this.rawResults));

  return results;
};

module.exports = JsonReport;
