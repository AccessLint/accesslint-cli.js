"use strict";

function RawReport(rawResults) {
  this.rawResults = rawResults;
}

RawReport.prototype.process = function () {
  var results = [];

  results.push(this.rawResults);

  return results;
};

module.exports = RawReport;
